# Meshvara: two scanned CC0 composites (2026-11-22)

## Scope and source identity

Two catalog scenes were rebuilt using **genuine independently authored meshes**, rather than extending primitive-object count. The model's 1K color, normal and ARM textures are baked into a same-origin GLB; the distributed per-asset ZIP contains exactly that model, the source React Three Fiber scene, the shared CC0Mesh helper, original author metadata and license. All imported files were checked against Poly Haven's official MD5 references and the resulting GLBs are SHA-256 pinned.

| Catalog asset | Official CC0 model | Original author | Original triangles | Packed GLB size |
| --- | --- | --- | ---: | ---: |
| `pendant-cluster` | [Modern Ceiling Lamp 01](https://polyhaven.com/a/modern_ceiling_lamp_01) | James Ray Cock | 5,602 | 433,620 bytes |
| `artisan-bread-basket` | [Wicker Basket 01](https://polyhaven.com/a/wicker_basket_01) | Kuutti Siitonen | 22,276 | 2,729,144 bytes |

- Pendant Cluster: three model instances with independent offsets, cable connection points, subtle point lighting and a shared ceiling rail. The three pendants genuinely depict scanned hanging glass lamps.
- Artisan Bread Basket: the detailed woven basket is scanned; the **three bread loaves are still original procedural work** with baked albedo/bump data. They are not scans and must not be advertised as such.
- The basket's first prototype put the bread and white liner at the rim, making them visibly float. Their vertical locations were corrected and a more natural linen color was selected after WebGL screenshot inspection.

## Pinning and release checks

`scripts/import-cc0.mjs` now pins these source IDs and pulls author names and polygon counts from the official model-information endpoint **only when explicitly run with `--bootstrap`**. Standard builds require an existing pin; they reject unpinned new models. Both imported sources satisfy the 250,000-triangle budget and the 18 MB packed-model budget.

`scripts/check-cc0-release.mjs` now validates all **41** curated sources for model origin, authors, SHA-256, embedded textures and ZIP-to-browser source parity. The material-geometry regression test understands the scanned `pendant-cluster` scene rather than incorrectly requiring its superseded procedural mesh. The visual evidence suite includes `artisan-bread-basket`, bringing its selected coverage to 23 assets.

On the exact assembled source in a persistent isolated workspace:
- `bun run check` completed successfully.
- `MESHVARA_SITE_URL=https://meshwara.vercel.app bun run build` completed successfully.
- 500 catalog pages and 500 downloadable ZIP archives were verified.
- Archive SHA-256/source parity covered 92,494,849 total ZIP bytes.
- 41 pinned, licensed, source-matched scanned GLBs passed release checks.
- Source risk queue still reports 90 higher-risk candidates and 500 needing visual review.
- Independent visual-approval registry: **0/500 approved**.

Before the workspace was restored, both scanned-composite asset scenes completed the Chromium three-angle visible-subject smoke checks, and the adjusted bread placement completed its targeted retest. These are smoke tests **not** expert art acceptance. Final source is identical to the persistent build; repository commit hash and Vercel production deployment must be verified separately.

## Limitations and next art pass

The catalog is not 500 photorealistic assets. The scanned wicker has physically authored weave and real texture detail, but the bread remains synthetic. The lamp bodies are scanned, but the cluster's assembled suspension, rail and emitted light need reference-matched calibration. Other procedural scenes still require accurate materials, topology, dimensions, visual comparisons, and mobile frame-time budgets.

Next: independently inspect actual 23-scene screenshots, correct oversized/float/overlap defects, and source further true semantic matches (not approximate substitutes). Do not increase `quality/visual-approvals.json` without real signed evidence.
