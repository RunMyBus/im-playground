# Font Audit: Global Styles & Layout

**Project:** Ignitingminds-webportal  
**File Coverage:** globals.css, layout.js, custom.css, responsive.css  
**Audit Date:** October 29, 2025

---

## 1. Primary Font Family

### Main Font (Google Fonts)

- **Font Name:** Montserrat
- **Source:** Google Fonts CDN
- **Weights Loaded:** 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Location:** layout.js (line 38-40)

```javascript
href =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap";
```

### Fallback Fonts (Commented Out)

The following custom fonts are **currently disabled** but available in the project:

1. **HelveticaLTW04-Roman**

   - File: `fonts/HelveticaLTW04-Roman.woff2`
   - Status: Commented out in custom.css (lines 164-168)

2. **helvetica-lite**

   - File: `fonts/helvetica-lite.ttf`
   - Status: Commented out in custom.css (lines 170-173)

3. **second**
   - File: `fonts/second.woff`
   - Status: Commented out in custom.css (lines 175-179)

### Monospace Font Stack

- **Font Family:** ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace
- **CSS Variable:** `--font-mono`
- **Location:** globals.css (lines 4-6)

---

## 2. Body & Base Typography

### Body Element

- **Font Family:** "Montserrat", sans-serif
- **Font Size:** 17px
- **Font Weight:** 400 (Regular)
- **Line Height:** Not explicitly set (default: 1.5)
- **Color:** #000 (Black)
- **Location:** custom.css (lines 188-193)

### Paragraph Elements

- **Line Height:** 1.5
- **Location:** custom.css (line 195)

---

## 3. Heading Typography

### H1 Elements

- **Font Size:** 2rem (32px equivalent)
- **Font Weight:** bold
- **Color:** black
- **Margin Bottom:** 0.5em
- **Location:** custom.css (lines 123-127)

### H2 Elements

- **Font Size:** 1.8rem (28.8px equivalent)
- **Font Weight:** bold
- **Color:** black
- **Margin Bottom:** 0.5em
- **Location:** custom.css (lines 117-121)

### H3 Elements

- **Font Size:** 1.6rem (25.6px equivalent)
- **Font Weight:** bold
- **Color:** black
- **Margin Bottom:** 0.5em
- **Location:** custom.css (lines 111-115)

### Section Heading (.sec-head)

- **Font Size:** 40px (Desktop)
- **Font Weight:** bold
- **Responsive:** 35px (Mobile - max-width: 500px)
- **Location:** custom.css (lines 264-266)

---

## 4. Content Container Typography

### Paragraph Text

- **Font Size:** 1.5rem (24px equivalent)
- **Line Height:** 1.8
- **Margin Bottom:** 1em
- **Location:** custom.css (lines 130-133)

### List Items (ul li / ol li)

- **Font Size:** 1.5rem (24px equivalent)
- **Line Height:** 1.8
- **Margin Bottom:** 0.5em
- **List Style Type:** disc (unordered) / decimal (ordered)
- **Margin Left:** 1.5em
- **Location:** custom.css (lines 135-159)

### Links (a)

- **Color:** #eb3d00 (Orange-red)
- **Text Decoration:** underline
- **Font Weight:** 500
- **Location:** custom.css (lines 159-162)

---

## 5. Button & Interactive Elements

### Primary Button (.new-btn)

- **Font Size:** 16px
- **Font Weight:** 400
- **Font Family:** "Montserrat", sans-serif
- **Responsive (Mobile):** padding: 10px 15px
- **Location:** custom.css (lines 322-325)

### Button Variations

1. **Standard Button**

   - Font Size: 16px
   - Font Weight: 400
   - Font Family: "Montserrat", sans-serif
   - Location: custom.css (lines 348-351)

2. **Text Button**

   - Font Size: 16px
   - Font Weight: 400
   - Font Family: "Montserrat", sans-serif
   - Location: custom.css (lines 391-396)

3. **Circle Button (.btn-circle)**
   - Font Size: 16px
   - Font Weight: 400
   - Font Family: "Montserrat", sans-serif
   - Location: custom.css (lines 404-409)

### Loading Button (.im-loading-button)

- **Font Size:** 16px
- **Font Weight:** 600
- **Color:** #fff
- **Background:** #3E7C17 (Primary brand green)
- **Padding:** 12px 30px
- **Location:** globals.css (lines 191-212)

---

## 6. Navigation & Menu

### Header Menu (.menu-btn-box)

- **Font Size:** 14px (Mobile - max-width: 500px)
- **Padding:** 12px 9px
- **Location:** responsive.css (line 30)

### Main Links (.main-links-box > ul > li > a)

- **Font Size:** 20px (Mobile)
- **Location:** responsive.css (line 34)

### Main Links Span (.main-links-box ul li span)

- **Font Size:** 20px (Mobile)
- **Location:** responsive.css (line 35)

---

## 7. Specific Component Typography

### Clock/Timer Text

- **Font Size:** 37px
- **Font Weight:** 600
- **Location:** Used in header components

### Card Headers

- **Font Size:**
  - 25px (Standard)
  - 30px (Variation 1)
  - 32px (iPad Heavy)
- **Font Weight:**
  - 500 (Standard)
  - 600 (Bold variant)
  - bold (Extra emphasis)
- **Font Family:** "Montserrat", sans-serif
- **Locations:** custom.css (lines 659-661, 841-842, 863, 877)

### Small Text Elements

- **Font Size Options:**
  - 11px (Extra small)
  - 13px (Small)
  - 14px (Small-medium)
  - 15px (Medium-small)
- **Locations:** custom.css (lines 473, 485, 1011, 1485)

### Large Display Text

- **Font Size Options:**
  - 46px (Large emphasis)
  - 50px (Extra large)
  - 70px (Hero/Display)
- **Font Weight:** bolder / bold
- **Locations:** custom.css (lines 584-585, 973, 1002, 1395, 1403)

---

## 8. Form Elements

### Labels

- **Font Size:** 16px (Standard)
- **Font Weight:** normal / 400
- **Location:** custom.css (line 1350)

### Input Placeholders

- **Font Weight:** 400
- **Font Size:** 16px
- **Location:** custom.css (line 421-422)

---

## 9. Footer Typography

### Footer Sections

1. **Pre-footer Title**

   - Font Size: 25px
   - Font Weight: bold
   - Font Family: "Montserrat", sans-serif
   - Location: custom.css (lines 659-661)

2. **Pre-footer Paragraph**

   - Font Size: 17px
   - Font Weight: 300
   - Font Family: "Montserrat", sans-serif
   - Location: custom.css (lines 665-670)

3. **Volunteer Text H2**
   - Font Size: 30px (Mobile: 500px and below)
   - Location: responsive.css (line 71)

### Footer Subscribe Box

- **H3 Font Size:** 16px (iPad Heavy: 851-1150px)
- **H3 Span Font Size:** 22px (iPad Heavy)
- **Location:** responsive.css (lines 158-159)

---

## 10. Slider Components

### Slider Navigation Buttons

- **Font Size:** 30px
- **Color:** white
- **Background:** rgba(0, 0, 0, 0.5)
- **Location:** custom.css (line 99)

### Footer Slider Text

- **Font Size:** 16px (iPad Heavy: 851-1150px)
- **Location:** responsive.css (line 156)

---

## 11. Special Text Styles

### Bold Text

- **Font Weight Values Used:**
  - 300 (Light)
  - 400 (Regular/Normal)
  - 500 (Medium)
  - 600 (Semi-bold)
  - 700 (Bold - from Google Fonts)
  - bold (CSS keyword)
  - bolder (CSS keyword)

### Text Emphasis

- **Strong Elements:** Inherit font-weight or use `font-weight: 600`
- **Span Elements:** Context-dependent, often 500-600 for emphasis

---

## 12. Responsive Typography

### Mobile (max-width: 500px)

- Section Head: 35px (reduced from 40px)
- New Section 1 Head: 35px
- New Middle Image Head: 35px
- New Section 2 Txt Para: 14px
- Pre-footer Left P: 20px
- Volunteer Text H2: 30px (reduced from default)

### iPad Light (501px - 850px)

- Main Footer Logo: 100px height (image)
- Maintains most desktop typography

### iPad Heavy (851px - 1150px)

- Volunteer Text H2: 32px
- Volunteer Text P: 16px
- Footer Slider Text Content: 16px
- Subscribe Box H3: 16px
- Subscribe Box H3 Span: 22px

### Desktop (1151px+)

- All base typography at full size
- Section Head: 40px
- Body: 17px

---

## 13. Font Weight Scale Summary

| Weight Value | CSS Name       | Usage Context                    |
| ------------ | -------------- | -------------------------------- |
| 100          | Thin           | Available but rarely used        |
| 200          | Extra Light    | Available but rarely used        |
| 300          | Light          | Footer text, subtle emphasis     |
| 400          | Regular/Normal | Body text, default weight        |
| 500          | Medium         | Links, moderate emphasis         |
| 600          | Semi-bold      | Buttons, section emphasis        |
| 700          | Bold           | Available but use 'bold' keyword |
| 800          | Extra Bold     | Available but rarely used        |
| 900          | Black          | Available but rarely used        |
| bold         | Bold           | Headings, strong emphasis        |
| bolder       | Bolder         | Large display text               |
| normal       | Normal         | Default, explicit normal weight  |

---

## 14. Font Size Scale Summary

### Pixel-based Sizes

11px, 13px, 14px, 15px, 16px, 17px, 18px, 19px, 20px, 22px, 25px, 30px, 32px, 35px, 37px, 40px, 45px, 46px, 50px, 70px

### Rem-based Sizes

1rem, 1.5rem, 1.6rem, 1.8rem, 2rem

**Conversion Reference:** 1rem = 16px (browser default)

- 1rem = 16px
- 1.5rem = 24px
- 1.6rem = 25.6px
- 1.8rem = 28.8px
- 2rem = 32px

---

## 15. Color Palette (Text Colors)

- **Primary Text:** #000 (Black)
- **Links:** #eb3d00 (Orange-red)
- **White Text:** #fff (on dark backgrounds)
- **Secondary Text:** Contextual (various grays in inline styles)

---

## 16. Loading & Animation Typography

### Spinner Text (Screen Reader Only)

- **Font Size:** Not visible (position: absolute, 1px dimensions)
- **Class:** .im-sr-only
- **Location:** globals.css (lines 218-227)

---

## 17. Notable Findings

1. **Inconsistent Units:** Mix of px, rem, and responsive units (clamp, vw)
2. **Inline Styles:** Many font sizes defined inline in components (not in global CSS)
3. **Redundant Declarations:** Same font-family declared multiple times
4. **Unused Font Files:** Three custom fonts loaded but commented out
5. **Font Weight Range:** Full spectrum (100-900) loaded but primarily use 400, 500, 600, bold
6. **Responsive Strategy:** Breakpoint-based with mobile-first considerations
7. **Typography Hierarchy:** Clear but could be consolidated with CSS custom properties

---

## 18. Recommendations

1. **Create Typography System:** Use CSS custom properties for consistent font sizes
2. **Reduce Font Weight Loading:** Only load weights 300, 400, 500, 600, 700
3. **Consolidate Font Declarations:** Single source of truth for font-family
4. **Remove Unused Fonts:** Delete or properly implement commented font files
5. **Standardize Units:** Choose between px and rem consistently
6. **Document Inline Styles:** Move common inline font styles to utility classes
7. **Establish Scale:** Create systematic type scale (e.g., 12, 14, 16, 18, 24, 32, 40, 48, 64)

---

_This audit covers the global typography system. See module-specific audits for component-level font usage._
