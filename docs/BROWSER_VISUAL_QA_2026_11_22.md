# MESHVARA — real WebGL evidence audit (November 22, 2026)

## What was actually executed

An isolated Chromium / software-WebGL environment cloned commit `c9ffda266ef776b2ca50ea269b5de75400fdbb45` of `smeetbuilds/meshwara`. The source typo in `sourdough.tsx` was corrected and separately committed as `75c8b53b838a9f07786a2ac2d7773519ac07b17c`.

After that source fix, **`bun run check` returned exit 0**. The complete production script **`bun run build` returned exit 0** and reported:
- 500 deterministic download ZIPs with source-to-package hash parity (89,561,737 bytes total);
- 500 generated static asset detail pages;
- 39 pinned CC0 PBR model origins and ZIP material provenance;
- 500 catalog asset-quality checks passed, automated minimum 64;
- 90 elevated *source-risk* candidates in the rebuild work queue;
- **0 of 500 artist-approved**, 500 still pending.

The full build was run **before** the final three visual adjustments below, so these newer source modifications require normal pack regeneration and end-to-end production build verification on the next deployment. After those adjustments, **`bun run check` returned exit 0** and three targeted Playwright checks passed (chef's knife, loaf and surfboard).

## Real browser findings

The original 22-asset Playwright screenshot test had a broken selector, `canvas.asset-canvas`; the CSS class actually belongs to the *container*, and the proper selector is `.asset-canvas canvas`.

After repairing the selector, the canvas initially reported 150px height before layout settled. It is now polled until the actual WebGL viewport exceeds 200px.

Crucially, **an active WebGL context can still show an empty stage** while a lazy scene loads. The initial test captured an entirely blank sourdough preview at around one second. A repeat capture after 10 seconds showed the object. The test originally falsely treated this as visual evidence. The revised test measures pixel contrast in the central subject area of a screenshot and waits for more than 50 foreground sample pixels before each screenshot, including the rotated views. The check distinguishes *visible content* from the empty backdrop, but does **not** score realism, species resemblance, correct materials or object quality.

With the stronger visible-subject gate, the 22-asset sweep reported **21 passed and one failed**: the performance surfboard was too small and edge-on at one rotation (49 sampled foreground pixels against the 50-pixel threshold). Its default orientation was corrected to show the main deck face. The sourdough loaf's procedural crust was also revised to remove repeated flour spots that resembled sesame seeds, the board moved to the actual loaf base and the scoring lines raised to the surface. The chef's knife base/bevel materials were rebalanced so it no longer rendered as an almost-black metal slab.

After these changes, the stricter Playwright sweep limited to those three corrected assets returned **3 passed / 0 failed**.

## Remaining visual issues and release gates

These models are still stylized or procedural, not scan-quality photorealistic objects:
- The loaf's scoring is currently an overlaid curve treatment, not a true sculpted incision with exposed baked crumb.
- The knife needs accurate steel anisotropy, tempered highlights, physically realistic blade taper, and full reference matching.
- The surfboard needs proper rocker/rail contours, realistic fiberglass/foam surface and measured fins.
- Architectural assets need dimensionally grounded detail; wildlife and anatomy still need professional sculpture or scanned assets.
- A static contact-shadow plane may not match every asset's actual lowest point. Grounding should be calibrated per asset or by reliable scene bounds, with browser review.

Do not set `quality/visual-approvals.json` to approved just because a test sees pixels. Real acceptance requires front, side and three-quarter evidence, reference comparisons, independent reviewer, stable mesh+texture distribution, and device performance.

## Operational blocker

GitHub `main` is updated directly, but **Vercel production builds are blocked by the account's build-rate-limit status**. The current live production site is still an older green commit; a source commit is not a deployment. Do not claim these revisions are live or perform a paid upgrade without authorization.

All claims in this report are scoped to the exact executed runs. The browser sandbox was disposable; screenshots were inspected during the work but are not durable, independently signed evidence or a user-facing GLB release.
