# Meshvara editorial design system

The public Meshvara site implements the supplied **Airtable-design-analysis** reference as
a visual *system*, not as Airtable branding, marketing copy, or a copied layout.

## Scope

- Public home, archive, asset detail pages, navigation, footer and their shared controls.
- Studio retains its independent dark/light editor themes, 3D viewport and functional workflows. Its chrome now reuses the ink, forest and mint palette through `src/styles/studio-editorial.css` while preserving high-density editing layouts.
- Code is implemented in `src/styles/editorial.css` after the legacy `app.css` so the
  complete existing component and 3D system remains compatible.
- The source of truth for page structure is `src/routes/index.tsx` and the existing
  archive/detail routes. All interactive catalog elements remain data-driven.

## Visual tokens

| Role | Value | Application |
| --- | --- | --- |
| Ink and primary | `#181d26` | Editorial type, CTAs and dark feature |
| Canvas | `#ffffff` | Every editorial page and navigation |
| Body | `#333840` | Running copy |
| Muted | `#41454d` | Secondary copy |
| Hairline | `#dddddd` | Form borders, subtle dividers |
| Coral | `#aa2d00` | Live 3D showcase |
| Forest | `#0a2e0e` | Principles showcase |
| Cream | `#f5e9d4` | First collection/demo card |
| Peach | `#fcab79` | Second collection card |
| Mint | `#a8d8c4` | Third collection card |
| Yellow | `#f4d35e` | Fourth collection card |
| Mustard | `#d9a441` | Fifth collection card |
| Light CTA | `#e0e2e6` | Final call-to-action band |
| Link | `#1b61c9` | Secondary text links only |
| Focus | `#458fff` | Keyboard focus outline |

Typography follows the source's editorial scale: **40/1.2/400 hero**, **32/1.2/400
section headings**, **24/1.35/400 collection names**, and **14px running type**.
Haas Grotesk/Groot are proprietary and are **not** bundled. A pinned
`@fontsource-variable/inter@5.3.0` supplies the **self-hosted Inter Variable**
typeface (weights 100–900, `font-display: swap`) from same-origin WOFF2 assets;
the system font stack is used only while loading or as a fallback. No remote
font service is required. Inter carries the SIL Open Font License 1.1;
the redistributable license is in `public/licenses/inter-OFL.txt`. This is
not a claim of identical licensed-Haas letterforms.

## Layout principles

- Maximum site container **1280px** with up to **48px** interior gutters.
- Navigation height **64px** on all devices; white, sticky, no glass effect.
- Major desktop sections use **96px** vertical breathing room.
- Buttons are rounded rectangles (**12px**) with ink primary and white outline secondary.
- Cards use **10px** corners; only functional circular icon controls use circles.
- Homepage moves from **white hero → coral live object → pastel worlds → forest
  principles → white gallery → navy CTA → gray CTA → white footer**.
- Asset previews are actual Three.js canvases, not image replacements.
- The gallery permits only one active preview at a time; six home cards are
  painted consistently while archive cards retain progressive rendering.
- Archives retain real filter/search parameters, direct downloads and Studio handoff.

## Responsive behavior

- **>=1024px**: three-column collection and asset grids, wide split features.
- **768–1023px**: two-column grids and tighter sections.
- **<768px**: single-column grids, full-height mobile navigation, stacked CTAs,
  24px outer gutters and reduced vertical spacing.
- Existing screen-reader labels, keyboard focus, lazy previews and reduced-motion
  handling stay intact. Mobile menu supports Escape, focus trapping and restoration, background inerting, route-change dismissal and scroll locking.

## Verification

Run `bun run check`, `bun run build`, `bun run studio:check` and
`bun run distribution:check`; use the existing Playwright suite for browser
regression. The focused `tests/e2e/editorial-design.spec.ts` verifies editorial
tokens, the locally loaded font, uneven feature-card heights, active asset preview geometry, responsive structure, mobile-menu keyboard behavior, archive controls and Studio color themes.

No pricing page or Airtable-style sales flow was added: Meshvara is a free 3D archive,
not a SaaS subscription product. The design specification does not provide
per-pixel screenshot references, so screenshot parity should not be claimed
without an approved visual reference and visual-diff acceptance thresholds.
