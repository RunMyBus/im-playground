# Font Audit: Dashboard Module

**Project:** Ignitingminds-webportal  
**Module:** Dashboard  
**Files Covered:** Dashboard/page.js, Dashboard/Orders/page.js, Dashboard/ImpactTracker/page.js  
**Audit Date:** October 29, 2025

---

## 1. Overview

The Dashboard module serves as the user's personal area for viewing orders, tracking impact, and managing their profile. Typography in this module emphasizes clarity and data presentation.

---

## 2. Main Dashboard (Dashboard/page.js)

### User Statistics Display

#### Notification Badge

- **Font Size:** 12px
- **Context:** Small notification indicator
- **Location:** page.js (line 399)

```javascript
fontSize: "12px";
```

#### Bold Stats Text

- **Font Weight:** bold
- **Font Size:** 1.1rem (17.6px)
- **Context:** Emphasized statistics
- **Location:** page.js (lines 416, 420)

```javascript
fontWeight: "bold",
fontSize: "1.1rem"
```

#### Standard Icon Sizes

- **Font Size:** 16px (consistent across multiple icons)
- **Context:** Action icons (edit, view, delete)
- **Locations:** page.js (lines 458, 469, 484)

```javascript
fontSize: "16px";
```

#### Large Icon Sizes

- **Font Size:** 17px
- **Context:** Slightly larger action icons
- **Locations:** page.js (lines 631, 666)

```javascript
fontSize: "17px";
```

---

## 3. Impact Tracker (Dashboard/ImpactTracker/page.js)

### Impact Statistics

#### Impact Value Display

- **Font Weight:** 600 (Semi-bold)
- **Color:** #009933 (Brand green)
- **Context:** Main impact metrics (tree count, CO2, etc.)
- **Location:** page.js (lines 78, 95, 112, 125)

```javascript
style={{ textAlign: "center", fontWeight: 600, color: "#009933" }}
```

#### Impact Description Text

- **Font Size:** 14px
- **Context:** Description text below impact values
- **Locations:** page.js (lines 82, 99, 116, 129)

```javascript
style={{ fontSize: "14px" }}
```

### Layout Notes

- Uses h3 elements for main values (inherits global h3 styles)
- Span elements for unit descriptions
- Consistent green color (#009933) for all impact numbers
- Clean, data-focused typography

---

## 4. Orders Page (Dashboard/Orders/page.js)

### Order Details Display

#### Bold Labels

- **Font Weight:** bold
- **Color:** #333 (Dark gray)
- **Context:** Order identification labels
- **Location:** page.js (line 100)

```javascript
style={{ fontWeight: "bold", color: "#333" }}
```

#### Bold Field Names

- **Font Weight:** bold
- **Context:** Field labels within order cards
- **Locations:** page.js (lines 113, 119)

```javascript
style={{ fontWeight: "bold" }}
```

#### Button Text

- **Font Weight:** bold
- **Color:** #fff (White on colored background)
- **Context:** "Know More" action button
- **Location:** page.js (line 147)

```javascript
fontWeight: "bold",
color: "#fff"
```

### Typography Structure

- No custom font sizes defined (inherits from global styles)
- Emphasis through weight rather than size
- Consistent use of bold for labels and important information
- Clean separation between labels and values

---

## 5. Typography Patterns

### Weight Usage Hierarchy

1. **600 (Semi-bold)** - Impact statistics, primary metrics
2. **bold** - Labels, field names, emphasized text
3. **400 (Regular)** - Default body text, descriptions

### Size Hierarchy

1. **17px** - Large icons
2. **16px** - Standard icons
3. **14px** - Descriptive text
4. **12px** - Small badges and indicators
5. **1.1rem (17.6px)** - Emphasized statistics

---

## 6. Color-Typography Combinations

### Green Typography

- **Color:** #009933 (Brand green)
- **Weight:** 600
- **Usage:** Impact statistics, positive metrics
- **Psychological Effect:** Growth, sustainability, achievement

### Dark Typography

- **Color:** #333 (Dark gray)
- **Weight:** bold
- **Usage:** Labels, important identifiers
- **Psychological Effect:** Authority, clarity, professionalism

### White Typography

- **Color:** #fff (White)
- **Weight:** bold
- **Usage:** Button text on colored backgrounds
- **Psychological Effect:** Action, contrast, clickability

---

## 7. Component-Specific Typography

### Cards

- Uses inherited heading styles
- Bold for labels within cards
- Regular weight for values
- No custom font families (uses global Montserrat)

### Buttons

- Bold font weight for emphasis
- Inherits base font size (16px from global)
- White text on colored backgrounds

### Icons

- Consistent sizing (16px, 17px)
- Used alongside text for actions
- Material-UI icons (fontSize prop)

---

## 8. Responsive Behavior

### Mobile Considerations

- No explicit mobile font size overrides in JavaScript
- Relies on global responsive CSS
- Icon sizes remain consistent across breakpoints
- Text wrapping handled by Bootstrap grid

### Tablet & Desktop

- Maintains consistent typography
- No breakpoint-specific font adjustments in this module

---

## 9. Accessibility Notes

### Contrast

- Good contrast ratios:
  - #009933 on white background: ~AA compliant
  - #333 on white background: ~AAA compliant
  - White on colored buttons: Context-dependent

### Readability

- Minimum font size: 12px (may be challenging for some users)
- Most content: 14px and above (good readability)
- Bold weights aid in visual hierarchy

---

## 10. Data Visualization Typography

### Metric Display Pattern

```
[Large Number with h3 + fontWeight: 600]
     ↓
[Small Description with fontSize: 14px]
```

### Example Structure

```html
<h3 style={{ fontWeight: 600, color: "#009933" }}>
  1,234
</h3>
<span style={{ fontSize: "14px" }}>
  Trees Planted
</span>
```

---

## 11. Comparison with Global Styles

| Element    | Dashboard    | Global CSS    | Match    |
| ---------- | ------------ | ------------- | -------- |
| Body Text  | Inherited    | 17px, 400     | ✓        |
| Bold Text  | bold keyword | 600-700       | ~Partial |
| Icon Size  | 16-17px      | Not defined   | Custom   |
| Small Text | 12-14px      | 13-15px range | ~Similar |
| Emphasis   | 600 weight   | 500-600 range | ✓        |

---

## 12. Notable Patterns

### Consistent Use Cases

1. **Bold Labels:** Always used for field names and identifiers
2. **Icon Sizing:** Standardized at 16-17px
3. **Impact Stats:** Always green (#009933) with 600 weight
4. **Descriptions:** Always 14px for secondary information

### Inconsistencies

1. **Bold vs 600:** Mix of `bold` keyword and numeric `600`
2. **Icon Sizes:** Both 16px and 17px used without clear pattern
3. **Color Definitions:** Inline colors vs CSS classes

---

## 13. Font Family

### Primary Font

- **Family:** Montserrat (inherited from global)
- **Source:** Google Fonts
- **Weights Available:** 100-900
- **Weights Used in Module:** 400, 600, bold

### No Custom Fonts

- Dashboard uses only the global font stack
- No module-specific font imports
- Consistent with overall project typography

---

## 14. Inline Style Analysis

### Frequency

- **High:** Most typography defined inline
- **Medium:** Some CSS class usage
- **Low:** Few CSS module styles

### Pros

- Component-specific control
- Easy to locate and modify
- No CSS cascade issues

### Cons

- Harder to maintain consistency
- No centralized typography system
- Repeated declarations

---

## 15. Best Practices Observed

✅ **Good Practices:**

- Consistent color usage for impact stats
- Clear weight hierarchy (400 → bold/600)
- Appropriate sizing for context
- Good use of semantic HTML (h3 for stats)

⚠️ **Areas for Improvement:**

- Consolidate bold declarations (use 600 consistently)
- Create typography utility classes
- Standardize icon sizes
- Move inline styles to CSS modules or styled components

---

## 16. Module-Specific Recommendations

### Short Term

1. **Standardize Bold:** Use `fontWeight: 600` instead of `bold` keyword
2. **Icon Sizing:** Choose 16px or 17px consistently
3. **Create Stat Component:** Reusable component for impact statistics

### Long Term

1. **Typography System:** Create design tokens for dashboard
2. **Utility Classes:** `.dashboard-stat`, `.dashboard-label`, `.dashboard-description`
3. **Color Tokens:** Replace inline colors with CSS variables
4. **Responsive Typography:** Add mobile-specific adjustments if needed

---

## 17. Testing Checklist

- [ ] Verify 12px text is readable on target devices
- [ ] Check color contrast ratios meet WCAG AA
- [ ] Test typography at different zoom levels (100%, 125%, 150%)
- [ ] Verify bold text renders correctly across browsers
- [ ] Check impact stat alignment across different number lengths

---

## 18. Dependencies

### External

- Material-UI icons (for icon sizing)
- Bootstrap (for layout, indirect typography effects)
- Google Fonts (Montserrat)

### Internal

- Global CSS (globals.css, custom.css)
- Layout typography inheritance

---

## 19. Summary Statistics

| Metric                 | Value                              |
| ---------------------- | ---------------------------------- |
| Unique Font Sizes      | 5 (12px, 14px, 16px, 17px, 1.1rem) |
| Font Weights Used      | 3 (400, 600, bold)                 |
| Color Values           | 3 (#009933, #333, #fff)            |
| Font Families          | 1 (Montserrat, inherited)          |
| Inline Style Instances | ~15                                |
| Responsive Breakpoints | 0 (module-level)                   |

---

## 20. Related Files

- `Dashboard/page.js` - Main dashboard with stats
- `Dashboard/Orders/page.js` - Order listing and details
- `Dashboard/ImpactTracker/page.js` - Environmental impact metrics
- `components/Dashboardmenu.js` - Dashboard navigation (separate audit)

---

_This audit is specific to the Dashboard module. For global typography guidelines, see FONT_AUDIT_GLOBAL_STYLES.md_
