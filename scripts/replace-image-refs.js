#!/usr/bin/env node
/*
  Replace CSS background-image references with image-set using AVIF/WebP fallbacks.
  - Only modifies .css files
  - Leaves JS/JSX inline styles unchanged to avoid breaking older browsers
*/
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const imagesDir = path.join(root, 'public', 'images');
const targetDirs = [path.join(root, 'src')];

function exists(p) { try { fs.accessSync(p); return true; } catch { return false; } }

function listFiles(dir, exts, out) {
  if (!exists(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.next') continue;
      listFiles(p, exts, out);
    } else if (exts.has(path.extname(p).toLowerCase())) {
      out.push(p);
    }
  }
}

function buildVariantMap() {
  const map = new Map();
  if (!exists(imagesDir)) return map;
  for (const ent of fs.readdirSync(imagesDir, { withFileTypes: true })) {
    if (!ent.isFile()) continue;
    const ext = path.extname(ent.name).toLowerCase();
    const base = ent.name.slice(0, -ext.length);
    const key = base.toLowerCase();
    const entry = map.get(key) || { base, exts: new Set() };
    entry.exts.add(ext);
    map.set(key, entry);
  }
  return map;
}

function makeImageSet(urlBase, hasAvif, hasWebp, origExt) {
  const parts = [];
  if (hasAvif) parts.push(`url(${urlBase}.avif) type('image/avif')`);
  if (hasWebp) parts.push(`url(${urlBase}.webp) type('image/webp')`);
  parts.push(`url(${urlBase}${origExt}) type('image/${origExt === '.png' ? 'png' : 'jpeg'}')`);
  return `image-set(${parts.join(', ')})`;
}

function processCssFile(filePath, variants) {
  const css = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  const result = css.replace(/background-image:\s*url\(([^)]+\.(png|jpg|jpeg))\)\s*;?/gi, (match, url, ext) => {
    // Normalize URL
    const rel = url.replace(/['"]/g, '');
    if (!rel.startsWith('/images/')) return match;
    const baseName = path.basename(rel, path.extname(rel));
    const key = baseName.toLowerCase();
    const v = variants.get(key);
    if (!v) return match;
    const hasAvif = v.exts.has('.avif');
    const hasWebp = v.exts.has('.webp');
    if (!hasAvif && !hasWebp) return match;
    const urlBase = rel.slice(0, -path.extname(rel).length);
    const imageSet = makeImageSet(urlBase, hasAvif, hasWebp, '.' + ext.toLowerCase());
    changed = true;
    // Keep original fallback first, then image-set for capable browsers
    return `background-image: url(${rel});\n  background-image: ${imageSet};`;
  });
  if (changed) {
    fs.writeFileSync(filePath, result, 'utf8');
    console.log(`Updated: ${path.relative(root, filePath)}`);
  }
}

function main() {
  const variants = buildVariantMap();
  const files = [];
  targetDirs.forEach((d) => listFiles(d, new Set(['.css']), files));
  files.forEach((f) => processCssFile(f, variants));
  console.log('Done updating CSS references.');
}

main();

















































