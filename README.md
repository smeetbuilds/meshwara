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
MESHVARA_SITE_URL=https://your-production-domain.example bun --bun run build
bun --bun run preview
```

`MESHVARA_SITE_URL` is used only at build time to generate canonical `robots.txt` and `sitemap.xml` URLs. If it is omitted, the build still succeeds and emits `robots.txt`, but intentionally skips `sitemap.xml` rather than publishing an incorrect production origin. Hosting environments may also provide `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, or `URL` instead.

Project QA:

```bash
bun run qa
bun run e2e:install
bun run release:check
```

The full QA chain verifies exact dependency pins, staged third-party source provenance, model-inspector/validator fixtures, modeled-asset publish gates, scene-quality floors, public contrast, deterministic download-pack generation, catalog/archive consistency, interaction-contract parity, TypeScript types, and the production static build. `release:check` additionally runs the browser suite against the built preview in Chromium, Firefox and WebKit targets. `packs` rebuilds every public ZIP deterministically from canonical source and pinned dependency manifests. `quality:check` rejects placeholder markers, exact scene duplicates, weak scaled-batch metadata, and under-authored new scene sources. `validate` checks duplicate slugs/indexes/scenes, contiguous numbering, lazy-registry parity, deterministic scene rules, ZIP CRC/content, pinned pack dependencies and reduced-motion support before a catalog update is considered publishable. Every pack build also writes `public/downloads/manifest.json` with the file size and SHA-256 digest of all public downloads.

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

For real pinned-Bun verification results, see [2026-11-19 evaluation readiness evidence](docs/REAL_VERIFICATION_2026-11-19.md). The study is not certified complete until ownership, archive licensing and browser QA are cleared.

## Evaluation study preparation and contributor guidance

Before using this project in a recorded AI coding session, read the [pre-application audit](docs/PRE_APPLICATION_AUDIT.md), [ownership/provenance review](docs/OWNERSHIP_AND_PROVENANCE_REVIEW.md), and [safe session guide](docs/EVALUATION_SESSION_SAFETY.md). The [development backlog](docs/DEVELOPMENT_BACKLOG.md) lists real future tasks with acceptance criteria. See [contributing](CONTRIBUTING.md) and [security reporting](SECURITY.md) for maintenance guidance.

The audit is a **partial evidence review, not a certification**. The Bun lockfile's direct dependencies have been reconciled with `package.json`, but a **clean Bun frozen install and browser test run are still required**.

### Local evaluation readiness checks

Run these **before** entering any recorded AI coding session, in a clean clone and outside the recording:

```bash
node scripts/check-study-lockfile.mjs
node tests/security/study-lockfile.test.mjs
node tests/security/study-history.test.mjs
node scripts/audit-study-history.mjs
bun install --frozen-lockfile
bun run studio:check
bun run qa
bun run release:audit
bun run e2e
```

The no-dependency Git-history scanner checks reachable text blobs for recognizable credential patterns, reports **paths and shortened blob IDs only**, and never prints suspected secret values. Return status 2 means a finding requires manual review; status 0 means **no pattern matched**, not that the entire history or any ZIP archive has been certified safe. It inspects small ZIP archives (up to 4 MiB) with bounded decompression, including historical source packs. GLB and other binary files, oversized archives, unsupported ZIP members and unknown credential formats still require separate review. Review its output privately, not during a recorded session. `bun run study:check` runs the two small local security/lockfile test suites and a lockfile structural check. For the whole project, Bun's own frozen install and browser QA remain authoritative.

### Safe local Pack-v1 release candidate

Use [the Pack-v1 release candidate guide](docs/PACK_V1_RELEASE_CANDIDATE.md) to run a clean, no-CI, detached-worktree verification without touching published ZIPs. The scripts `node scripts/prepare-pack-v1-release.mjs --plan` and `node scripts/prepare-pack-v1-release.mjs --prepare --candidate-dir ../meshvara-pack-v1-candidate` check the pinned Bun version, frozen install, history screening, full QA, browser tests, all 500 ZIP checksums and repeatable generation. The preparation command writes **only a separate, unapproved candidate folder**; it does not commit, push, deploy, or replace the existing archives. The executable synthetic regression test is `bun run release:candidate:test`.

### Current published pack snapshot

The checked-in `public/downloads/manifest.json` lists 500 archives but **does not declare `packSchemaVersion: 1`** (as inspected 2026-11-19). Therefore the current `main` checkout is **not yet a verified Pack-v1 release**, and `node scripts/validate-pack-parity.mjs` will reject its manifest until regeneration. `bun run qa` regenerates archives before checking them and may change the tracked ZIP corpus. Do not treat that generated success as proof the currently committed download snapshot was already Pack-v1. See `RELEASE_READINESS.md`; regenerate, diff-review, license-review and commit any archive migration deliberately, never silently.

### Portable Studio import data safety

Portable project restoration has a 256 MiB cumulative decoded-media safety budget in addition to per-file GLB/texture limits. Importing a backup with media IDs already owned by another local project or a separate local file is rejected **before persistence** instead of silently replacing existing data. Same-project restore remains supported; a rejected import requires choosing a new, conflict-free source rather than automatically overwriting another project. This prevents one known cross-project data-loss path but does not replace full browser/IndexedDB regression testing.

## Static Vercel deployment contract

This project is an **entirely static** TanStack Start prerendered site. The Vercel configuration explicitly publishes `dist/client`, not generic Vite's `dist` root; no Nitro server is required for Meshvara's current no-backend architecture. `vite.config.ts` excludes binary downloads, other static files and query-state variants from the HTML prerender crawler. The build must pass `node scripts/verify-static-output.mjs`, which checks the generated homepage and all 500 ZIPs against the generated download manifest's byte sizes and SHA-256 hashes. Local regression commands are `bun run deployment:check`.

Before this fix, a Vercel build marked `READY` returned actual HTTP 404 for the homepage and downloads. A successful build status **does not** establish live availability: verify `/`, `/assets`, `/studio`, `/downloads/manifest.json` and an actual `.zip` URL at the canonical production alias after each deployment.

### Complete static catalog route verification

TanStack Start does not automatically discover parameterized routes during prerendering. Meshvara now supplies an explicit `pages` list for all 500 `/assets/<slug>` routes, derived from the same checked-in manifest as its download registry, and turns off incidental link crawling. The production build fails if any of those 500 HTML pages is missing or has the wrong asset title, using `scripts/verify-asset-pages.mjs`. This complements the existing check of all 500 ZIP SHA-256 hashes. The local regression test is `tests/deployment/asset-pages.test.mjs`. After deployment, verify actual HTTP 200 responses across the catalog; a green Vercel build is not enough.
