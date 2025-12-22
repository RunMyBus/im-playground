# Igniting Minds Web Portal — End-to-End Redesign Specification

Version: 1.0
Owner: Frontend Platform (Next.js 14 / React 18)
Last updated: 2025-11-12

## Executive Summary
This document defines a full-stack UI/UX redesign for the Igniting Minds web portal with:
- Modern visual language and design system.
- Smooth micro-interactions and page transitions.
- Lightweight 3D and advanced animations with safe fallbacks.
- Robust, standardized API integration and caching strategy.
- Accessibility, SEO, security, and performance guardrails.
- A phased implementation plan that preserves all existing routes and data flows.

This spec is tailored to your current codebase structure and behavior, referencing these key files and routes:
- Header and mobile nav: `src/app/components/header_new.js`, `src/app/components/sidebar.js`
- Gallery (tabs, deep links, pagination): `src/app/Gallery/[slug]/page.js`, `src/app/Gallery/[slug]/[slug1]/page.js`
- About/Story: `src/app/Our-story/component.js`
- Blogs: `src/app/Blogs/BlogsClient.js`
- Global styles: `src/app/css/custom.css`, `src/app/globals.css`

All existing menu items, submenus, and routing remain intact. Enhancements are additive and progressive.

---

## 1. Information Architecture and Routing (Invariant)
Keep the current IA and URLs to avoid breaking any links.

- ABOUT US
  - Our Story → `/Our-story`
  - Our Team
    - Patrons → `/Patrons`
    - Governance → `/Governance`
  - Partners → `/Partners`
  - Our Projects
    - ISR Projects → `/ISRProjects`
    - CSR Projects → `/CSRProjects`
  - Blogs → `/Blogs`

- INITIATIVES
  - Walk for Water → `/walk-for-water`
  - Green India Challenge → `/green-india-challenge`
  - Walk for Nature → `/walk-for-nature`

- GALLERY (dynamically from API)
  - Initiative → `/Gallery/[slug]`
    - Tabs: `#albums`, `#images`, `#videos`, `#news`, `#press`
    - Album detail → `/Gallery/[slug]/[slug1]`

- CONTACT
  - Volunteer → `/Volunteer`
  - Corporate → `/Corporate`
  - Careers → `/Career`
  - Get in Touch → `/contact-us`

Notes:
- Preserve tab deep-linking hashes for Gallery (`#albums` etc.) as implemented in `src/app/Gallery/[slug]/page.js`.
- Preserve gallery pagination behavior (page size 15 Images/Albums) and album pagination (12 items per page) per current code.

---

## 2. Design System
Introduce a token-based design language (CSS variables + optional Tailwind in the future). Store tokens in `globals.css` or a new `src/app/css/tokens.css` imported globally.

### 2.1 Color Tokens
- Primary: `--color-primary: #009933;`
- Primary-600 (darken): `--color-primary-600: #007a29;`
- Accent (CTA): `--color-accent: #f05915;`
- Text: `--color-text: #0b0b0b;`
- Muted Text: `--color-text-muted: #6b7280;`
- Surface: `--color-surface: #ffffff;`
- Subtle Surface: `--color-surface-2: #f5f7f9;`
- Border: `--color-border: #e5e7eb;`
- Focus Ring: `--color-focus: #22c55e;`

### 2.2 Typography
- Family: System stack + “Montserrat” (as used) or switch to a variable font like Inter for better performance.
- Sizes (responsive clamps):
  - Display: `clamp(40px, 6vw, 64px)`
  - H1: `clamp(28px, 5vw, 48px)`
  - H2: `clamp(22px, 3.5vw, 32px)`
  - Body: `clamp(14px, 2vw, 18px)`
- Weights: 400, 500, 600, 700
- Line-height: 1.4–1.6

### 2.3 Spacing & Radius
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40
- Radius: 6px, 10px, 16px
- Shadows: low/med/high elevation tokens

### 2.4 Components (visual patterns)
- Buttons: Primary (accent background), Secondary (outline), Tertiary (text)
- Cards: soft shadow, 12–16px radius
- Tabs: pill group, active with primary solid fill
- Chips/Badges: for filter states
- Inputs: 10px radius, 44px min-height, clear focus ring

---

## 3. Navigation Redesign (Desktop & Mobile)

### 3.1 Desktop Header (Mega Menu)
- Maintain categories in `src/app/components/header_new.js`.
- Replace hover-only menus with accessible triggers:
  - Trigger on click for keyboard/assistive tech, hover as enhancement.
  - Add ARIA: `aria-haspopup`, `aria-expanded`, `role="menu"`.
- Visuals:
  - Active heading highlight (already implemented) with token colors.
  - Submenu panels with 12–16px radius, shadow, and a subtle divider.
  - Optional preview image on the right (already present), lazy-loaded.
- Performance:
  - Preload critical routes via `next/link` prefetch where useful.

### 3.2 Mobile Sidebar (`src/app/components/sidebar.js`)
- Keep structure, improve a11y and motion:
  - Trap focus inside open sidebar.
  - ESC to close.
  - Add overlay that closes on click.
  - Use CSS `prefers-reduced-motion` to disable heavy transitions.
- Animations:
  - Slide-in using Framer Motion (spring, low stiffness) or CSS with `transition` + transform.

---

## 4. Motion, 3D, and Smooth Scrolling

### 4.1 Animation Framework
- Prefer Framer Motion for:
  - Page transitions (route groups) with `AnimatePresence`.
  - Staggered reveals and parallax offsets.
  - Replace AOS usage with Motion + IntersectionObserver.
- Global timing:
  - Durations: 150–400ms micro, 500–800ms section reveals.
  - Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` (standard), springs for micro-interactions.

### 4.2 3D Guidelines
- Use React Three Fiber (R3F) + drei for lightweight background scenes:
  - Hero backgrounds (e.g., Initiatives pages) with subtle rotating low-poly elements/particles.
  - Limit draw calls, cap device pixel ratio on mobile to 1.5 max.
- Fallbacks:
  - For low-end devices or `prefers-reduced-motion`: show Lottie animation or static SVG.
- Performance budget for 3D:
  - ≤30–60 FPS target, ≤2MB total assets on a given page.
  - Disable canvas when tab inactive.

### 4.3 Smooth Scrolling
- Implement `Lenis` for smooth, interruptible scrolling on client components.
- Progressive enhancement:
  - Fallback to `scroll-behavior: smooth;` when JS disabled.
  - Avoid conflicting with browser-native overscroll and Next.js routing.

---

## 5. Gallery UX: Tabs, Deep Links, Pagination, Media

Current implementation (retain deep link behavior):
- File: `src/app/Gallery/[slug]/page.js`
  - Tabs: `#albums`, `#images`, `#videos`, `#news`, `#press`
  - Active tab persists via URL hash + `localStorage`.
  - API endpoints per tab, lazy-loaded on demand.
  - Pagination: 15 items/page for albums/images/videos/news/press.
- File: `src/app/Gallery/[slug]/[slug1]/page.js`
  - Displays album images with pagination (12 items/page) and a modal/lightbox.

Redesign enhancements:
- Tabs
  - Keep pill style; convert to a tablist with roles: `role="tablist"`, `role="tab"`, `aria-selected`.
  - Maintain hash links for direct deep linking (do not change).
- List/Grid
  - Uniform cards with aspect-ratio boxes, skeleton placeholders.
  - On hover/tap show action affordance (View details, Open lightbox) as appropriate.
- Paginators
  - Use a shared paginator component (First, Prev, numbered window, Next), accessible buttons.
  - Persist current page per tab in `sessionStorage` for better back/forward behavior.
- Media Handling
  - Use `next/image` for images; use `loading="lazy"` and low-quality placeholders (LQIP) or blurred placeholders.
  - For videos: embed via a lightweight player with thumbnail preview and click-to-load to reduce initial JS.
- Lightbox
  - Use existing `yet-another-react-lightbox` dependency or custom modal with keyboard arrows and swipe gestures.

---

## 6. API Integration and Environment Standardization

Observed usage:
- Header/Sidebar: `process.env.API_ROUTE2`
- Gallery pages: `NEXT_PUBLIC_API_ROUTE2`, `NEXT_PUBLIC_USER_ID`
- About/Story: `process.env.API_ROUTE` → `metaDetail`
- Blogs: `listallwebblog` on `process.env.API_ROUTE`

Standardize on public env names for client components:
- `NEXT_PUBLIC_API_ROUTE2` (base URL)
- `NEXT_PUBLIC_USER_ID` (default: `IGM_USER`)

Server-only env where needed:
- Keep secrets server-side; if any tokenization is added, access via Server Components or API routes.

Recommended service layer:
- Create `src/app/services/http.ts` (or `.js`) with Axios instance:
  - Base URL from `NEXT_PUBLIC_API_ROUTE2`.
  - Interceptors for logging, error normalization, retries (limited), timeout (e.g., 10s).
- Wrap endpoints:
  - `listinitiative` → GET/POST `…/listinitiative` { userId }
  - `listalbumcat` → POST { userId, initiativeId }
  - `listwebimage` → POST { userId, initiativeId }
  - `listwebvideo` → POST { userId, initiativeId }
  - `listwebnews` → POST { userId, initiativeId }
  - `listwebpress` → POST { userId, initiativeId }
  - `listalbum` → POST { userId, catId }
  - `metaDetail` → POST { type }
  - `listallwebblog` → POST { userId, catId? }

Caching and fetching strategy:
- Adopt SWR or React Query for Gallery and Listings with:
  - Stale-while-revalidate; cache keys based on params.
  - Pagination-aware cache.
  - Suspense-friendly boundaries with skeletons.

Error handling:
- Central toast/inline error states.
- Retry on network failures (max 1–2 times). No retries on 4xx.

---

## 7. Page Templates and Key Components

- Page Wrapper
  - Sticky header with minimal shadow.
  - Optional top announcement bar (e.g., Climate Clock) with dismiss cookie (already in `header_new.js`).

- Hero Section
  - Option A: 3D background (R3F) with interactive tilt.
  - Option B: Lottie animation fallback.
  - Text content with strong hierarchy and CTA.

- Info Sections
  - Grid-based content blocks with image-left/image-right variations, scroll-triggered reveals.

- Cards
  - Initiative card, Blog card, Gallery card; consistent padding, title clamp, action states.

- Tabs
  - Pill tabs with focus styles, keyboard nav; deep-link support.

- Paginator
  - Reusable component for all list pages.

- Footer
  - Social links, app badges (as in `sidebar.js`), newsletter CTA.

- Form Components
  - Unified validation UI, accessible labels, clear error messaging.

- Overlays/Modals
  - Trap focus, ESC to close, backdrop click closes.

- Toasts
  - Use `react-toastify` dependency already present.

---

## 8. Accessibility (WCAG 2.1 AA)

- Keyboard Navigation
  - Menus: tab/shift+tab, arrow keys within menu, ESC to close.
  - Focus visible on all interactive elements.
- ARIA
  - `role=menu`, `role=menuitem`, `role=tablist`, `role=tab`, `aria-controls`, `aria-selected`, `aria-expanded`.
- Color Contrast
  - Ensure 4.5:1 for text. Use `--color-text` and `--color-primary` with compliant contrast.
- Media
  - Alt text for all images; captions for videos where applicable.
- Motion
  - Respect `prefers-reduced-motion`: disable non-essential animations and all 3D.
- Skip Links
  - Add a skip-to-content link.

---

## 9. SEO and Content

- Metadata per page (title, description) via Next.js metadata API.
- Canonical URLs, Open Graph, Twitter Card.
- Structured Data (JSON-LD)
  - Organization, Website, Article (Blogs), CollectionPage (Gallery tabs).
- Sitemap and robots
  - Dynamic sitemap for initiatives/galleries; ensure robots.txt correct.
- Image alt/captions enhance discoverability.

---

## 10. Performance and Security

- Performance
  - Use `next/image` responsive sizes everywhere (already in use; continue consistently).
  - Code-split heavy components (Lightbox, 3D scenes) via dynamic import.
  - Preload critical fonts; prefer a variable font to reduce file sizes.
  - Limit third-party scripts; defer or lazy-load.
  - Establish a performance budget (LCP < 2.5s on mid devices, CLS < 0.1).

- Security
  - Keep CSP/HSTS as documented in `CSP_IMPLEMENTATION.md`, `HSTS_IMPLEMENTATION.md`.
  - Sanitize any HTML with DOMPurify (already in `package.json`).
  - Avoid exposing secrets in public env; use server routes for privileged calls.

---

## 11. Implementation Plan (Phased)

### Phase 1: Foundations (1–1.5 weeks)
- Tokenize styles; add `tokens.css`.
- Introduce Framer Motion and Lenis (client-only) with flags for reduced motion.
- Standardize env usage (`NEXT_PUBLIC_API_ROUTE2`, `NEXT_PUBLIC_USER_ID`) across client components.
- Build Axios service with interceptors.

Deliverables:
- Updated header/sidebar with accessible interactions.
- Smooth scroll baseline.

### Phase 2: Gallery Revamp (1.5–2 weeks)
- Convert Gallery tabs to accessible tablist (retain `#` deep links and pagination).
- Extract shared Paginator component.
- Improve image placeholders and card layouts; dynamic imports for heavy parts.

Deliverables:
- `Gallery/[slug]` and nested `[slug1]` fully upgraded, no route changes.

### Phase 3: Initiatives & About (1–1.5 weeks)
- New hero sections (3D or Lottie fallback), staggered reveals.
- Standard content blocks and CTAs.

### Phase 4: SEO, a11y, perf hardening (1 week)
- Metadata, structured data, sitemap.
- Contrast fixes, skip links, keyboard loops.
- Bundle analysis and fine-tuning.

---

## 12. Acceptance Criteria

- IA and routing unchanged; all existing links, hashes, and pagination preserved.
- Menus usable by keyboard; correct ARIA roles.
- Smooth scrolling and animations respect reduced motion.
- Gallery tabs deep-link correctly and persist state.
- 3D scenes degrade to Lottie or static when unsupported.
- LCP and CLS within budget on test environments.

---

## 13. Library Choices (Recommended)

- Animations: `framer-motion`
- Smooth Scroll: `@studio-freight/lenis`
- 3D: `@react-three/fiber`, `@react-three/drei`, `three`
- Lightbox: continue `yet-another-react-lightbox`
- Data: `axios`, optionally `@tanstack/react-query` or `swr`

Note: Add only what is necessary; prefer dynamic imports for heavy libs.

---

## 14. Notes Specific to Current Code

- `header_new.js` and `sidebar.js` fetch initiatives via `listinitiative` to build dynamic Gallery menu; keep this.
- `Gallery/[slug]/page.js` uses hash + localStorage for active tab. Preserve. Migrate visual tabs to accessible tab components.
- `Our-story/component.js` fetches `metaDetail` images; move to standard service and use public env var.
- `Blogs/BlogsClient.js` fetches `listallwebblog`; add skeletons and error states; consider category filters.
- Large CSS in `src/app/css/custom.css`: progressively replace hard-coded values with tokens and leverage modern layout utilities.

---

## 15. Risk & Mitigation

- 3D performance on low-end devices
  - Detect `prefers-reduced-motion`, cap DPR, disable effects where needed.
- Smooth scroll conflicts
  - Add opt-out toggle; isolate scroll management in a top-level client component.
- CSS regressions
  - Introduce visual regression checks (Percy or manual QA checklist). Keep change scope per feature branch.

---

## 16. Next Steps

1) Approve this spec and library selections.
2) I will scaffold the tokens, motion provider, and API service.
3) Proceed phase-by-phase with PRs, ensuring no route or behavior regressions.

