#!/usr/bin/env node
/*
  Image audit and optimization script
  - Reports images exceeding size thresholds
  - Optionally compresses originals and writes WebP/AVIF variants
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const args = process.argv.slice(2);
const shouldFix = args.includes('--fix');
const root = process.cwd();

// Directories to scan (relative to project root)
const scanDirs = [
    'public/images',
    'public',
];

// File extensions considered images
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
// We report GIF/SVG but skip optimize by default
const reportOnlyExtensions = new Set(['.gif', '.svg']);

// Thresholds in bytes
const KB = 1024;
const thresholds = {
    iconLogo: 50 * KB,        // <50KB
    regular: 100 * KB,        // <100KB
    bannerHero: 300 * KB,     // <300KB
};

// Heuristics to classify images by filename
function classify(filename) {
    const lower = filename.toLowerCase();
    if (/(icon|logo)\b/.test(lower)) return 'iconLogo';
    if (/(banner|hero|header)\b/.test(lower)) return 'bannerHero';
    return 'regular';
}

function walk(dir, out) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Skip node_modules and .next
            if (entry.name === 'node_modules' || entry.name === '.next') continue;
            walk(full, out);
        } else {
            out.push(full);
        }
    }
}

function collectFiles() {
    const files = [];
    for (const dir of scanDirs) {
        walk(path.join(root, dir), files);
    }
    return files.filter(p => imageExtensions.has(path.extname(p).toLowerCase()) || reportOnlyExtensions.has(path.extname(p).toLowerCase()));
}

function formatKB(bytes) {
    return `${Math.round(bytes / KB)}KB`;
}

async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (reportOnlyExtensions.has(ext)) {
        return { optimized: false, reason: 'skip-format' };
    }

    const base = filePath.slice(0, -ext.length);
    const input = sharp(filePath, { failOnError: false });
    const metadata = await input.metadata();

    // Choose quality based on classification
    const type = classify(path.basename(filePath));
    const isBanner = type === 'bannerHero';
    const isIcon = type === 'iconLogo';
    const webpQuality = isIcon ? 80 : isBanner ? 65 : 72;
    const avifQuality = isIcon ? 55 : isBanner ? 45 : 50;

    // Recompress original format in-place (non-destructive attempt)
    try {
        if (ext === '.png') {
            await sharp(filePath).png({ compressionLevel: 9, palette: true }).toFile(`${base}.tmp.png`);
            fs.renameSync(`${base}.tmp.png`, filePath);
        } else if (ext === '.jpg' || ext === '.jpeg') {
            await sharp(filePath).jpeg({ quality: isBanner ? 72 : 78, mozjpeg: true }).toFile(`${base}.tmp.jpg`);
            fs.renameSync(`${base}.tmp.jpg`, filePath);
        } else if (ext === '.webp') {
            await sharp(filePath).webp({ quality: webpQuality }).toFile(`${base}.tmp.webp`);
            fs.renameSync(`${base}.tmp.webp`, filePath);
        } else if (ext === '.avif') {
            await sharp(filePath).avif({ quality: avifQuality }).toFile(`${base}.tmp.avif`);
            fs.renameSync(`${base}.tmp.avif`, filePath);
        }
    } catch (e) {
        // Ignore recompress failures; continue to variants
    }

    // Write WebP/AVIF variants alongside
    const outputs = [];
    try {
        const webpOut = `${base}.webp`;
        if (!fs.existsSync(`${base}.webp`)) {
             await sharp(filePath).webp({ quality: webpQuality }).toFile(`${base}.webp`);
         }
        //await sharp(filePath).webp({ quality: webpQuality }).toFile(webpOut);
        outputs.push(webpOut);
    } catch (e) { /* noop */ }
    try {
        const avifOut = `${base}.avif`;
        if (!fs.existsSync(`${base}.avif`)) {
        await sharp(filePath).avif({ quality: avifQuality }).toFile(avifOut);
        }
        outputs.push(avifOut);
    } catch (e) { /* noop */ }

    return { optimized: true, outputs, width: metadata.width, height: metadata.height };
}

async function main() {
    const files = collectFiles();
    const rows = [];
    let overCount = 0;
    let totalBytes = 0;

    for (const filePath of files) {
        const stat = fs.statSync(filePath);
        const size = stat.size;
        totalBytes += size;
        const type = classify(path.basename(filePath));
        const limit = thresholds[type];
        const ext = path.extname(filePath).toLowerCase();
        const isOver = size > limit;
        if (isOver) overCount++;

        rows.push({
            path: path.relative(root, filePath),
            ext,
            class: type,
            size,
            limit,
            over: isOver,
        });
    }

    // Report
    const overs = rows.filter(r => r.over).sort((a, b) => b.size - a.size);
    if (overs.length) {
        console.log(`Found ${overs.length} oversized images (of ${rows.length}).`);
        console.log('path,sizeKB,limitKB,type,ext');
        for (const r of overs) {
            console.log(`${r.path},${Math.round(r.size/KB)},${Math.round(r.limit/KB)},${r.class},${r.ext}`);
        }
    } else {
        console.log(`No oversized images found in ${rows.length} files.`);
    }
    console.log(`Total scanned: ${rows.length}, total size: ${formatKB(totalBytes)}`);

    if (!shouldFix) {
        console.log('Dry run only. Pass --fix to optimize images in place and add WebP/AVIF variants.');
        return;
    }

    // Optimize oversized first, then remaining large files for best ROI
    const optimizeList = overs.concat(rows.filter(r => !r.over && imageExtensions.has(r.ext)).slice(0, 50));

    let optimized = 0;
    for (const item of optimizeList) {
        try {
            const res = await optimizeImage(path.join(root, item.path));
            if (res.optimized) optimized++;
            console.log(`Optimized: ${item.path}`);
        } catch (e) {
            console.warn(`Failed: ${item.path} -> ${e.message}`);
        }
    }
    console.log(`Optimization complete. Files optimized: ${optimized}/${optimizeList.length}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

















































