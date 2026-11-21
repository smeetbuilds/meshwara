# MESHVARA — identifiable-object rebuild, November 22, 2026

## Goal

Improve object likeness in the real WebGL scene and distributed source, without counting a successful build as artist approval. The 500-entry archive is still provisional until individually reviewed.

## Rebuilt in this batch

| Slug | Distinctive authored features | Surface and geometry approach |
| --- | --- | --- |
| `match-basketball` | Spherical 8-panel meridian channels, additional seams, inflation valve | Full spherical form, deterministic pebbled leather color/bump maps, routed dark grooves |
| `tennis-racket` | True elliptical frame; 16 main / 19 cross strings bounded inside rim; graphite throat and wrapped overgrip | Spline tube hoop and branched throat, fitted strings, grommets, metallic-composite finish |
| `chef-knife` | Full-tang knife, profiled heel-tip silhouette, bolster, dual cutting bevels, pinned handle scales | Authored extruded curves, cold steel / wood-grip materials, engraved spine detail |
| `oscilloscope` | Recessed graticule, dual signal traces, encoders, BNC connectors, cooling slots and feet | Rounded industrial housing with local physical controls and live simulated waveform geometry |
| `action-camera` | Layered lens housing, status display, weather seals, top shutter, mounting hinge and rear display | Independently modeled optical rings, screen, silicon joints and textured alloy surfaces |
| `pneumatic-cylinder` | Rod guide, polished piston shaft, four tie rods, end caps, clevis, feed ports and hardware | Coaxial machined components, rounded mounting blocks and tubing |
| `conveyor-module` | 16 rollers, visible spindle journals, paired rails, support feet, motor and presence sensor | Repeated engineered axles, machined-frame components and sensor cabling |
| `air-compressor` | Cylindrical pressure receiver, twin finned pump, electric motor, regulator, two gauge scales, copper discharge line and four wheels | Domed tank, metallic machinery, routing pipes, elastomer tires and operating handle |

These remain procedural WebGL models. Physical realism, texture fidelity, actual proportions, performance and identity must be judged from images and measurements. **They are not certified photorealistic**.

## Integration and QA

- `node tests/quality/recognizable-products.test.mjs` enforces distinct required components and stable, nonrandom source.
- `node tests/quality/recognizable-products.test.mjs --packs` additionally verifies source-to-download portability, shipped helper equality and ZIP SHA-256 digest.
- `node scripts/generate-rebuild-workqueue.mjs` consumes the exhaustive `audit-visual-fidelity` report and generates `public/quality/rebuild-workqueue.json`. Every catalog item is tracked with provenance/source hash, risk indicators and a prescribed independent review method.
- The source-risk work queue is not a grade of visual quality. It cannot auto-promote an asset into `quality/visual-approvals.json`.

## Remaining production gates

1. Capture front, profile and three-quarter screenshots, all at stable camera, exposure and environment. Compare them to legally sourced reference photographs and accurate measurements.
2. In Blender or a dedicated modeling pipeline, correct any model whose proportions, material transitions, highlights, deformation or silhouette do not match the named subject.
3. Add object-appropriate UV-mapped PBR albedo, roughness, metallic, normal and displacement data; preserve author provenance and redistribution licensing.
4. Optimize and measure mesh statistics, draw calls, GPU memory, mobile FPS and the impact of all materials at card size and full-screen size.
5. Verify exact ZIP source, textures, licensing and GLB content against each rendered preview.
6. Obtain independent signed, multi-angle art direction approvals for each of the 500 objects. The archive is not a collection of 500 approved photorealistic meshes yet.

See `docs/ASSET_FIDELITY_STANDARD.md`, `QUALITY_STANDARD.md`, and `quality/visual-approvals.json` for release policy.
