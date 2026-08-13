# MESHVARA

MESHVARA is the open Three.js asset archive by Aahav Labs — a frontend-only collection of production-grade spatial assets, built with TanStack Start, React Three Fiber and Bun.

**Developed by Aahav Labs with love ♥**  
[aahavlabs.in](https://aahavlabs.in) · [hi@aahavlabs.in](mailto:hi@aahavlabs.in)

## Product constraints

- No authentication
- No runtime backend/database; TanStack Start prerenders the site to static HTML
- No payments or email gates
- Direct free ZIP downloads
- Responsive desktop/tablet/mobile UI
- Viewport-gated WebGL previews
- Per-asset lazy scene chunks so the catalog can grow without shipping every 3D implementation up front
- Static metadata-driven catalog

## The Meshvara archive

The project currently contains 500 published, source-backed downloadable assets organized into five browsing worlds, categories, and precise subcategory filters, with dedicated categories for visual systems, products, furniture, technology, fashion, food, jewelry, sports, tools, architecture, vehicles, industrial systems, nature, animals, science, medical assets and complete scenes. Every catalog entry maps to a real lazy scene module and a real ZIP in `public/downloads`. People remains a reserved category for modeled characters that pass the stricter character publication gate.

## Run with Bun

```bash
bun install
bun --bun run dev
```

Production build with static prerendering:

```bash
bun --bun run build
bun --bun run preview
```

Project QA:

```bash
bun run qa
```

The full QA chain verifies exact dependency pins, staged third-party source provenance, model-inspector/validator fixtures, modeled-asset publish gates, scene-quality floors, deterministic download-pack generation, catalog/archive consistency, interaction-contract parity, TypeScript types, and the production static build. `packs` rebuilds every public ZIP deterministically from canonical source and pinned dependency manifests. `quality:check` rejects placeholder markers, exact scene duplicates, weak scaled-batch metadata, and under-authored new scene sources. `validate` checks duplicate slugs/indexes/scenes, contiguous numbering, lazy-registry parity, deterministic scene rules, ZIP CRC/content, pinned pack dependencies and reduced-motion support before a catalog update is considered publishable. Every pack build also writes `public/downloads/manifest.json` with the file size and SHA-256 digest of all public downloads.

## Dependency integrity

Runtime and build dependencies are pinned to exact versions rather than floating `latest` tags. Bun is configured to save exact versions and to disable automatic dependency installation during execution. On the first clean install, commit the generated `bun.lock`; CI/deployments should then use `bun install --frozen-lockfile`.

Because the TanStack package ecosystem had a malicious-package incident in May 2026, do not reuse an unknown `node_modules` directory or lockfile from that incident window. Install from a clean workspace and review any dependency lifecycle scripts before trusting them.

## Adding an asset

1. Add a dedicated scene module at `src/components/scenes/<scene>.tsx`.
2. Register the scene as a lazy import in `src/components/sceneRegistry.tsx`.
3. Add metadata to `src/data/assets.ts`.
4. Run `bun run packs` to generate/update the direct archive at `public/downloads/<slug>.zip`.
5. Run the checks in `QUALITY_STANDARD.md` for visual quality, animation, responsiveness and runtime behavior.
6. Run `bun run qa` before publishing.

## Licensing

The application source and bundled procedural assets in this repository are MIT licensed. Externally authored models, textures, HDRIs, motion capture or animation data must carry redistribution-compatible licensing and must not be added without a documented source/license review.

## Modeled assets / characters

Professional GLB/glTF assets use a separate publish gate documented in `MODELED_ASSET_PIPELINE.md`. `scripts/model-inspector.mjs` extracts geometry, skin, animation, morph-target, texture and compression metadata without needing a runtime backend. `scripts/validate-modeled-assets.mjs` blocks publication when model files, LOD budgets, rig requirements, required clips, redistribution rights or QA approvals are missing.

The shared R3F model runtime lives at `src/components/model/ModelAsset.tsx`. It supports desktop/tablet/mobile model URLs, skeletal-animation clips, crossfades, reduced motion and grounded presentation. Character assets are intentionally excluded from the generic floating-object wrapper.

### Modeled delivery invariants

Publishable modeled assets must use self-contained GLB tiers and a validated `display` block. The model inspector reports external resource URIs; the validator rejects publishable tiers that are plain `.gltf`, reference external `.bin`/textures, omit presentation framing, or point `defaultClip` at an unavailable animation. This keeps direct downloads portable and makes character framing deterministic across the library and the downloadable R3F component.

### Third-party model source staging

Third-party model packs do not move directly into the catalog. `staging/sources/` records a non-published source snapshot with a pinned Git revision, license facts, expected byte sizes, and Git blob SHA-1 values. `scripts/materialize-model-source.mjs` downloads those exact files in a network-enabled environment and refuses any byte/hash mismatch. The first registered candidate is KayKit Adventurers; it remains staging-only until the actual GLBs are materialized and pass visual, rigging, animation/contact, responsive, performance, and evidence-backed publication QA.

## Production character standard

Character assets use the stricter rig, motion, transition, deformation, facial, LOD, and evidence gates documented in [`CHARACTER_ASSET_STANDARD.md`](./CHARACTER_ASSET_STANDARD.md). The flagship contract lives at `templates/model-asset/young-man-01.manifest.json`.


## Live catalog previews

Every catalog card renders the actual Three.js/R3F asset in a viewport-gated WebGL canvas before download. Preview rendering uses automatic bounds/framing, ACES filmic tone mapping, responsive DPR, deterministic studio lighting, reduced-motion support and recovery UI if a preview chunk fails.

## Asset quality audit

`bun run quality:check` runs both the scene-quality validator and the full 500-asset audit. The generated machine-readable report is written to `public/quality/asset-audit.json`. It verifies source depth, deterministic construction, rendering/material contracts, semantic density and packaging readiness. Automated checks complement visual art-direction review; they do not pretend to replace human visual judgement.
