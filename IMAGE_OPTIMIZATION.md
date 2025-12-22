Image optimization guide

Thresholds
- Icons/logos: <50KB
- Regular images: <100KB
- Banners/hero: <300KB

Projects covered
- Ignitingminds-webportal
- walkforgreen

Commands
- Ignitingminds-webportal
  - Report: npm run images:report --workspace Ignitingminds-webportal
  - Fix: npm run images:fix --workspace Ignitingminds-webportal
- walkforgreen
  - Report: npm run images:report --workspace walkforgreen
  - Fix: npm run images:fix --workspace walkforgreen

Notes
- The report prints CSV: path,sizeKB,limitKB,type,ext. Prioritize Home/Projects/Blog assets.
- The fix command recompresses originals and writes WebP/AVIF variants alongside existing files.
- GIF/SVG are reported but not modified.

Rollback
- Each original is recompressed in place; to fully rollback, restore from git (preferred).
- WebP/AVIF variants can be deleted safely; originals remain usable.

Serving modern formats
- Prefer Next.js Image where possible.
- For plain <img>, use <picture> with AVIF/WEBP fallbacks:

<picture>
  <source srcset="/images/example.avif" type="image/avif">
  <source srcset="/images/example.webp" type="image/webp">
  <img src="/images/example.jpg" alt="...">
</picture>









