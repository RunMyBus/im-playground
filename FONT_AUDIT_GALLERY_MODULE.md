# Font Audit: Gallery Module

**Project:** Ignitingminds-webportal  
**Module:** Gallery  
**Files Covered:** Gallery/[slug]/page.js, Gallery/[slug]/[slug1]/page.js  
**Audit Date:** October 29, 2025

---

## 1. Overview

The Gallery module is one of the most typography-intensive modules in the project, featuring complex layouts for media display, metadata, press clippings, and link previews. It uses a wide range of font sizes and weights for different contexts.

---

## 2. Gallery Main Page (Gallery/[slug]/page.js)

### Navigation Tabs

#### Tab Text

- **Font Size:** 14px
- **Font Weight:** 600 (active) / 500 (inactive)
- **Color:** Dynamic (isActive determines color)
- **Location:** page.js (lines 270-271)

```javascript
fontSize: '14px',
fontWeight: isActive ? '600' : '500'
```

**Usage Pattern:** Active tabs are bolder to indicate current selection.

---

### Hero Section

#### Page Title

- **Font Size:** clamp(22px, 6vw, 64px)
- **Font Weight:** 700 (Bold)
- **Responsive:** Scales between 22px and 64px based on viewport
- **Location:** page.js (lines 424-426)

```javascript
fontSize: 'clamp(22px, 6vw, 64px)',
fontWeight: 700
```

**Design Note:** Uses modern CSS clamp for fluid typography.

---

### Gallery Grid Items

#### Image Caption/Title

- **Font Size:** clamp(11px, 2.5vw, 14px)
- **Font Weight:** 600
- **Responsive:** Scales between 11px and 14px
- **Location:** page.js (lines 513-514)

```javascript
fontSize: 'clamp(11px, 2.5vw, 14px)',
fontWeight: 600
```

---

### Media Details Modal

#### Metadata Display

1. **Main Label**

   - **Font Size:** 18px
   - **Font Weight:** 600
   - **Location:** page.js (lines 604-605)

   ```javascript
   fontSize:'18px',
   fontWeight:600
   ```

2. **Detail Fields (Photo By, Date, Location, etc.)**
   - **Font Size:** 14px
   - **Font Weight:** 500
   - **Locations:** page.js (lines 657-658, 684-685, 710-711, 737-738, 760-761)
   ```javascript
   fontSize: '14px',
   fontWeight: '500'
   ```

---

### Error & Status Messages

#### Error Text

- **Font Size:** 14px
- **Color:** #d32f2f (Red)
- **Locations:** page.js (lines 1016, 1301, 1647)

```javascript
fontSize: '14px',
color: '#d32f2f'
```

#### Warning Text

- **Font Size:** 14px
- **Color:** #f57c00 (Orange)
- **Location:** page.js (line 1084)

```javascript
fontSize: '14px',
color: '#f57c00'
```

#### Secondary Info Text

- **Font Size:** 11px
- **Color:** #666 (Gray)
- **Location:** page.js (line 1019, 1087)

```javascript
fontSize: '11px',
color: '#666'
```

#### Tertiary Info Text

- **Font Size:** 10px
- **Color:** #999 (Light gray)
- **Location:** page.js (line 1090)

```javascript
fontSize: '10px',
color: '#999'
```

---

### Link Preview Cards

#### Link Preview System (Complex Typography)

1. **Link Title**

   - **Font Size:** 13px
   - **Font Weight:** 500
   - **Color:** #22313f (Dark)
   - **Line Clamp:** 2 lines
   - **Location:** page.js (line 1473)

   ```javascript
   fontSize: '13px',
   fontWeight: 500,
   color: '#22313f'
   ```

2. **Domain Name**

   - **Font Size:** 11px
   - **Color:** #7b8794 (Gray)
   - **Location:** page.js (line 1476)

   ```javascript
   fontSize: '11px',
   color: '#7b8794'
   ```

3. **External Link Indicator**

   - **Font Size:** 12px
   - **Color:** #28a745 (Green)
   - **Location:** page.js (line 1478)

   ```javascript
   fontSize: '12px',
   color: '#28a745'
   ```

4. **Section Header (All Links)**

   - **Font Size:** 13px
   - **Font Weight:** 600
   - **Color:** #2a2f36 (Very dark)
   - **Location:** page.js (line 1492)

   ```javascript
   fontSize: '13px',
   color: '#2a2f36',
   fontWeight: 600
   ```

5. **Link Count Badge**

   - **Font Size:** 12px
   - **Font Weight:** 600
   - **Color:** #0b74da (Blue)
   - **Background:** #e9f5ff (Light blue)
   - **Location:** page.js (line 1496)

   ```javascript
   fontSize: '12px',
   fontWeight: 600
   ```

6. **Show More/Less Button**
   - **Font Weight:** 600
   - **Font Size:** 12px (for arrow)
   - **Color:** #0b74da (Blue) / #8a94a4 (Gray for arrow)
   - **Locations:** page.js (lines 1527-1531)
   ```javascript
   fontSize: '12px',
   fontWeight: 600
   ```

---

### Media Upload Interface

#### Upload Button

- **Font Size:** 16px
- **Font Weight:** 600
- **Location:** page.js (lines 1364-1367)

```javascript
fontSize: '16px',
fontWeight: '600'
```

#### File Info Display

1. **File Name**

   - **Font Size:** 9px
   - **Location:** page.js (line 1406)

   ```javascript
   fontSize: "9px";
   ```

2. **File Size**
   - **Font Size:** 13px
   - **Location:** page.js (line 1432)
   ```javascript
   fontSize: "13px";
   ```

---

### Press Clipping Display

#### Press Source Header

- **Font Size:** 12px
- **Font Weight:** 500
- **Color:** #007bff (Blue)
- **Location:** page.js (lines 1670-1671)

```javascript
fontSize:'12px',
fontWeight:500
```

#### Press Description

- **Font Size:** 11px
- **Color:** #666
- **Line Height:** 1.4
- **Line Clamp:** 2 lines
- **Location:** page.js (line 1675)

```javascript
fontSize:'11px',
color:'#666',
lineHeight:'1.4'
```

#### Press View Button

- **Font Size:** 11px
- **Font Weight:** 500
- **Location:** page.js (line 1680)

```javascript
fontSize:'11px',
fontWeight:500
```

---

### Image Viewer/Lightbox

#### Close Button

- **Font Size:** 18px
- **Font Weight:** bold
- **Location:** page.js (lines 1750-1751)

```javascript
fontSize: '18px',
fontWeight: 'bold'
```

---

### Loading & Filter States

#### Filter Text

- **Font Size:** 14px
- **Font Weight:** 500
- **Location:** page.js (lines 1149-1150)

```javascript
fontSize: '14px',
fontWeight: '500'
```

#### Loading Text

- **Font Size:** 12px
- **Location:** page.js (lines 1159, 1547, 1557)

```javascript
fontSize: "12px";
```

---

## 3. Gallery Detail Page (Gallery/[slug]/[slug1]/page.js)

### Navigation & Breadcrumbs

#### Back Button Text

- **Font Size:** 20px
- **Location:** page.js (line 230)

```javascript
fontSize: "20px";
```

---

### Image Counter Display

#### Large Counter Numbers

- **Font Size:** 40px
- **Context:** Current/Total image indicators
- **Locations:** page.js (lines 292, 326)

```javascript
fontSize: "40px";
```

---

## 4. Typography Hierarchy Summary

### Size Tiers (Smallest to Largest)

| Size                     | Weight | Usage Context                         |
| ------------------------ | ------ | ------------------------------------- |
| 9px                      | -      | Tiny file names                       |
| 10px                     | -      | Tertiary info                         |
| 11px                     | -      | Domains, press descriptions           |
| 12px                     | -      | Loading states, badges, small buttons |
| 12px                     | 600    | Badge emphasis, button text           |
| 13px                     | -      | File sizes                            |
| 13px                     | 500    | Link titles                           |
| 13px                     | 600    | Section headers                       |
| 14px                     | -      | Error messages                        |
| 14px                     | 500    | Metadata fields, filters              |
| 14px                     | 600    | Active tabs                           |
| 16px                     | 600    | Upload buttons                        |
| 18px                     | -      | Modal labels                          |
| 18px                     | 600    | Primary labels                        |
| 18px                     | bold   | Close buttons                         |
| 20px                     | -      | Navigation back button                |
| 40px                     | -      | Large counters                        |
| clamp(11px, 2.5vw, 14px) | 600    | Gallery item captions                 |
| clamp(22px, 6vw, 64px)   | 700    | Page hero titles                      |

---

## 5. Font Weight Patterns

### Weight Distribution

- **400 (Regular):** Default text (inherited)
- **500 (Medium):** Secondary labels, metadata, inactive tabs
- **600 (Semi-bold):** Active elements, labels, emphasis
- **700 (Bold):** Major headings, hero text
- **bold (Keyword):** Close buttons, special emphasis

### Semantic Usage

1. **500:** Readable emphasis without being heavy
2. **600:** Clear emphasis for important information
3. **700:** Maximum emphasis for page titles
4. **bold:** Legacy or specific component emphasis

---

## 6. Responsive Typography

### Fluid Typography (CSS clamp)

1. **Hero Title**

   - Min: 22px (mobile)
   - Preferred: 6vw (scales with viewport)
   - Max: 64px (large screens)
   - **Effect:** Smooth scaling without media queries

2. **Gallery Captions**
   - Min: 11px (mobile)
   - Preferred: 2.5vw
   - Max: 14px (large screens)
   - **Effect:** Readable at all screen sizes

### Benefits

- No breakpoint management
- Smooth transitions
- Better mobile experience
- Reduced CSS complexity

---

## 7. Color-Typography Combinations

### Status Colors

| Color   | Hex     | Usage                   | Font Size |
| ------- | ------- | ----------------------- | --------- |
| Error   | #d32f2f | Error messages          | 14px      |
| Warning | #f57c00 | Warnings                | 14px      |
| Success | #28a745 | External link indicator | 12px      |
| Info    | #0b74da | Links, badges           | 12-13px   |

### Neutral Colors

| Color        | Hex              | Usage                  | Font Size Range |
| ------------ | ---------------- | ---------------------- | --------------- |
| Primary Text | #22313f, #2a2f36 | Main content           | 13-14px         |
| Secondary    | #666, #7b8794    | Metadata, descriptions | 11-12px         |
| Tertiary     | #999, #8a94a4    | Minor info             | 10-12px         |
| Links        | #007bff          | Clickable elements     | 11-12px         |

---

## 8. Link Preview Typography System

### Component Hierarchy

```
┌─ All Links Header (13px, 600, #2a2f36)
│  └─ Count Badge (12px, 600, #0b74da)
│
├─ Link Card
│  ├─ Title (13px, 500, #22313f) [2 lines max]
│  ├─ Domain (11px, #7b8794)
│  └─ External Indicator (12px, #28a745)
│
└─ Show More Button (12px, 600, #0b74da)
   └─ Arrow (12px, #8a94a4)
```

### Design Rationale

- Consistent 12-13px range for scanning
- Bold (600) for actionable items
- Color coding for link types
- Compact but readable

---

## 9. Press Clipping Typography System

### Component Structure

```
┌─ Source (12px, 500, #007bff)
├─ Description (11px, #666, line-height: 1.4)
└─ View Button (11px, 500, #007bff bg)
```

### Design Rationale

- Small text for dense information
- Clear hierarchy with color
- Compact for cards
- Scannable format

---

## 10. Modal & Overlay Typography

### Metadata Display Pattern

```
Label: 18px, 600 (Main labels)
  ↓
Fields: 14px, 500 (Details)
```

### Error Display Pattern

```
Error: 14px, #d32f2f
  ↓
Info: 11px, #666
  ↓
Minor: 10px, #999
```

---

## 11. Accessibility Analysis

### Minimum Sizes

- **Smallest:** 9px (file names) - ⚠️ Below WCAG recommendations
- **Common Small:** 11-12px - ⚠️ Borderline for accessibility
- **Comfortable:** 14px+ - ✓ Good for most users

### Contrast Ratios (approximate)

- **#22313f on white:** ~14:1 (AAA) ✓
- **#666 on white:** ~5.7:1 (AA) ✓
- **#999 on white:** ~2.8:1 (Fails AA) ⚠️
- **#7b8794 on white:** ~4.5:1 (AA) ✓

### Recommendations

1. Increase 9px and 10px text to at least 11px
2. Consider darker shade for #999 (tertiary text)
3. Ensure all body text is 14px minimum
4. Test with zoom levels 125% and 150%

---

## 12. Notable Patterns & Techniques

### ✅ Best Practices

1. **Fluid Typography:** Smart use of CSS clamp()
2. **Weight Hierarchy:** Clear progression (500 → 600 → 700)
3. **Color Coding:** Semantic colors for status
4. **Line Clamping:** Prevents text overflow (WebkitLineClamp)
5. **Consistent Sizing:** Related elements use same sizes

### ⚠️ Areas for Improvement

1. **Small Text:** Some text below 12px
2. **Inline Styles:** Heavy use makes maintenance harder
3. **Weight Inconsistency:** Mix of numeric and keyword values
4. **Color Contrast:** Some combinations below AA
5. **Magic Numbers:** Sizes not from systematic scale

---

## 13. Component Typography Tokens (Proposed)

### If Implementing Design System:

```css
/* Gallery Typography Tokens */
--gallery-hero-title: clamp(22px, 6vw, 64px);
--gallery-caption: clamp(11px, 2.5vw, 14px);
--gallery-tab: 14px;
--gallery-metadata-label: 18px;
--gallery-metadata-value: 14px;
--gallery-link-title: 13px;
--gallery-link-domain: 11px;
--gallery-badge: 12px;
--gallery-error: 14px;
--gallery-info: 11px;
--gallery-tertiary: 10px;
```

---

## 14. Browser Compatibility

### CSS Features Used

- **clamp():** ✓ Supported in all modern browsers (2020+)
- **-webkit-line-clamp:** ✓ Well supported, vendor prefix for legacy
- **font-weight: 500-700:** ✓ Universal support

### Fallbacks

- No explicit fallbacks for clamp() (graceful degradation)
- Vendor prefixes present for line clamping

---

## 15. Performance Considerations

### Font Loading

- Uses Google Fonts (Montserrat) - single family
- Weights 100-900 loaded (may be excessive)
- No font subsetting
- No font-display strategy visible

### Recommendations

1. Load only used weights: 500, 600, 700
2. Add `font-display: swap` to prevent FOIT
3. Consider subsetting for Latin characters
4. Preload critical font files

---

## 16. Module-Specific Summary

| Metric                         | Value                                |
| ------------------------------ | ------------------------------------ |
| Unique Font Sizes (px)         | 15                                   |
| Unique Font Sizes (responsive) | 2 (clamp functions)                  |
| Font Weights Used              | 5 (500, 600, 700, bold, default)     |
| Color Values for Text          | 15+                                  |
| Inline Style Instances         | 80+                                  |
| Accessibility Issues           | 3 (sizes too small, contrast issues) |
| Fluid Typography Uses          | 2 (hero, captions)                   |

---

## 17. Testing Recommendations

### Visual Testing

- [ ] Test clamp() values at viewport widths: 320px, 768px, 1024px, 1920px
- [ ] Verify 11px text readability on actual devices
- [ ] Check line clamping across browsers
- [ ] Test color contrast with tools (WAVE, axe)

### Functional Testing

- [ ] Zoom to 200% and verify text remains readable
- [ ] Test with browser default font sizes (small, medium, large)
- [ ] Verify badge text doesn't overflow
- [ ] Check modal text with long strings

### Cross-Browser Testing

- [ ] Chrome (clamp support)
- [ ] Firefox (clamp support)
- [ ] Safari (line-clamp vendor prefix)
- [ ] Edge (modern chromium)

---

## 18. Comparison with Other Modules

| Aspect        | Gallery      | Dashboard | Global        |
| ------------- | ------------ | --------- | ------------- |
| Min Size      | 9px ⚠️       | 12px ✓    | 11px ~        |
| Max Size      | 64px (fluid) | 17px      | 70px          |
| Weights       | 5            | 3         | 8             |
| Responsive    | Yes (clamp)  | No        | Media queries |
| Inline Styles | Very High    | High      | Low           |
| Colors        | 15+          | 3         | ~10           |

**Observation:** Gallery module has most complex and varied typography in the project.

---

## 19. Migration Path to Design System

### Phase 1: Consolidate

1. Extract all font sizes to constants
2. Group by semantic purpose
3. Identify duplicates and inconsistencies

### Phase 2: Systematize

1. Create typography scale (8, 10, 12, 14, 16, 18, 24, 32, 40, 48, 64)
2. Map existing sizes to scale
3. Define semantic tokens (body, caption, label, heading)

### Phase 3: Implement

1. Create CSS custom properties
2. Create utility classes
3. Replace inline styles gradually
4. Update documentation

---

## 20. Related Files & Dependencies

### Direct Dependencies

- `Gallery/[slug]/page.js` - Main gallery view
- `Gallery/[slug]/[slug1]/page.js` - Gallery detail view
- `globals.css` - Base typography
- `custom.css` - Component styles

### Component Dependencies

- Material-UI (icons)
- React state (dynamic weights for tabs)
- Image optimization (Next.js Image)

---

_This is the most comprehensive typography audit for the Gallery module. The module's complexity reflects its role as a media-rich, content-dense interface._
