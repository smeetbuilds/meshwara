# Meshvara visual-asset production pass — 22 November 2026

## Scope

This pass addresses four new object-identity failures with explicit architectural anatomy and better material provenance. It does not claim completion of the 500-asset photorealism goal, and the independent visual approval registry must remain unchanged until a reviewer signs off on actual front, profile and three-quarter screenshots.

### Glazed Window Bay (`glazed-bay`)

- Replaced a solid opaque wall directly behind the translucent window with four separate structural masonry panels forming a real aperture.
- Added two-depth glazing, insulated pane thickness, five mullions, horizontal transoms, seals, frame pressure plates, fixing points, a visible operating handle, concrete returns and a projecting timber sill.
- Reused the verified local **plaster, concrete and oak CC0 PBR maps**, with original Poly Haven provenance and precise source ZIP inclusion.

### Brutalist Stair (`brutalist-stair`)

- Rebuilt ten discrete stair treads and risers with a continuous structural stair slab, upper/lower concrete landings, two full-length side stringers, guards and paired metal handrails.
- Applied existing verified **concrete CC0 color, normal and roughness maps** to the primary structural concrete surfaces. Avoided an unbroken stack of ten colored cubes as the whole stair.

### Aero Wheel (`aero-wheel`)

- Added a molded tire, procedural surface relief, sixty-four tread elements, wheel barrel, rim lips, ten alloy spokes, rotor ventilation, five fixing bolts, brake-caliper body and tire valve.
- The source is portable. However, it is still a procedural automotive study, **not a licensed OEM scan or dimensional engineering CAD**.

### Pendant Cluster (`pendant-cluster`)

- Corrected the previous five-sphere illustration to **three distinct pendants**, matching the actual catalog metadata.
- Added individually suspended cable runs, connector glands, two-walled revolved translucent shades, rolled rims, visible bulbs, sockets, ceiling plates and source-level environmental light.
- Materials use physically plausible transmission, index of refraction, metal and roughness parameters; visual calibration is pending.

## Tests and packaging contracts

`tests/quality/material-geometry-identity.test.mjs` asserts identity-specific markers and complete source-code provenance. When called with `--packs` after pack generation, it verifies scene bytes against each ZIP, source-helper byte parity, manifest SHA-256, and **every included local CC0 color, normal and roughness map** for the two architecture assets, including author/source-license notes. This prevents a model from looking better on the site than in its downloadable standalone package.

`tests/e2e/asset-rebuild-visual.spec.ts` now covers 22 asset scenes, each with three actual WebGL orientations for reproducible visual evidence when a Playwright browser is available. Adding a test is not the same as running it. Human reviewers must independently evaluate anatomy, materials, lighting, frame coverage and performance.

## Release and acceptance caveats

- `main` currently has a Vercel **build-rate-limit** status on the previous commit. Do not claim this patch is live until the actual deployment is green.
- A failed or absent release is a blocking operational issue distinct from asset-source quality.
- Passes from source markers, deterministic geometry and ZIP hashes mean portable code, **not ultraphotorealistic artwork**.
- The remaining 500 scenes still require independent visual approval, real-view reference boards, geometry corrections, correctly licensed PBR textures or scans and device-level performance measurements. Structural source risk alone is a queue signal, not an art score.

See `docs/ASSET_FIDELITY_STANDARD.md`, `quality/visual-approvals.json` and `public/quality/rebuild-workqueue.json` for the catalog-wide quality workflow.
