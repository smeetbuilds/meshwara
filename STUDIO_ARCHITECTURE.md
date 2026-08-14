# Meshvara Studio architecture contract

Meshvara Studio is the free, no-login, local-first composition and model-delivery layer for the Meshvara archive. The editor must keep project data inspectable and portable, must never require a cloud persistence service for core work, and must distinguish input-decoding support from export/encoding pipelines that are not actually implemented.

## Local-first boundary

- Studio projects persist with native IndexedDB.
- Imported GLB and replacement texture bytes live in a separate local IndexedDB file store and are never uploaded by Studio.
- If IndexedDB is unavailable, the active session degrades to in-memory project/file stores instead of introducing a network fallback.
- Studio has no sign-in, payment, email, Supabase, Firebase, analytics-write or hosted project-sync requirement.
- GLBs are limited to 100 MB per local source file.
- Replacement textures are limited to 16 MB and must be binary PNG, JPEG or WebP. SVG is intentionally not accepted as a model texture payload.
- Storage garbage collection removes only file IDs no longer referenced by any saved project, including material texture references. The active project's past/present/future undo snapshots are passed as protected file IDs so manual cleanup cannot break an undoable GLB or texture edit.
- Deleting one project cannot destroy a GLB or texture still referenced by another saved project; when a non-active project is deleted, the active editor history is also protected from that cleanup pass.

## Project, hierarchy and transform model

`StudioProject` remains the backward-compatible `meshvara-project` version `1` format. Optional editor state extends the format without invalidating earlier version-1 projects.

- `archive` nodes reference a published Meshvara asset slug.
- `imported` nodes reference a browser-local GLB file ID.
- Nodes store explicit local position/rotation/scale, visibility, locking and optional `parentId`.
- Archive nodes may carry the canonical typed customization state. Older version-1 projects without that field resolve to the authored default instead of failing import.
- Scene size remains bounded to 250 nodes and undo/redo to 50 committed snapshots.
- Reparenting rejects self-parenting, descendant cycles and missing parents.
- Reparenting computes the current world matrix, derives the new local TRS under the requested parent, and commits only when the world transform can be represented without unsupported shear.
- Multi-selection transform commits derive a world-space delta from the primary gizmo and apply it to selected root nodes. Selected descendants inherit the movement through their selected ancestor instead of receiving the delta twice.
- Group-transform/reparent operations reject singular or shear-producing transformations rather than silently corrupting object placement.

Portable `.meshvara-project` export embeds every referenced local GLB and replacement texture, so moving the project between browsers does not silently lose media. Import sanitizes transforms, hierarchy, archive customization, material state, animation/debug state and file references before restoration.

## Production model editor

Imported GLBs provide:

- skeleton-safe scene cloning through Three.js `SkeletonUtils`;
- mesh, skinned-mesh, vertex, triangle, material and texture counts;
- bounds and structural web-runtime warnings;
- stable PBR material slots;
- editable base color, emissive color/intensity, roughness, metalness and opacity;
- animation clip discovery, play/pause, loop and speed controls;
- wireframe, axes, bounds and skeleton editor debugging;
- recursive Studio hierarchy rendering;
- hierarchical outliner and additive Shift/Ctrl/Command multi-selection;
- bulk show/hide/lock/unlock/delete/duplicate operations.

Archive assets continue to use the canonical scene registry. The curated flagship set adds one typed material/form contract; Studio still does not invent a fake universal shader/geometry API across all 500 heterogeneous archive scenes.

## Local texture workflow

Material overrides can replace or explicitly remove these PBR texture channels:

- `map`;
- `normalMap`;
- `roughnessMap`;
- `metalnessMap`;
- `emissiveMap`;
- `alphaMap`;
- `aoMap`.

Replacement files are validated by binary signature, stored locally, embedded in portable project export and reference-counted by storage cleanup. Color textures (`map`, `emissiveMap`) use sRGB color space; data maps use no color space. Replacement textures use glTF-compatible `flipY = false` behavior. Material **Reset to authored** removes both scalar and texture overrides.

The viewport reloads texture resources only when texture references change, so roughness/metalness/color slider changes do not repeatedly decode the same image files.

## Local GLB validation and storage safety

A filename or MIME type is never sufficient validation.

GLB validation checks:

- binary glTF magic;
- glTF version 2;
- declared file length;
- required JSON chunk bounds/type;
- parseable JSON chunk declaring glTF 2.x;
- 100 MB size ceiling;
- `extensionsUsed` / `extensionsRequired`, including whether Draco, Meshopt or KTX2/BasisU decoding is required.

Known offline codecs are reported by validation but are accepted because the Studio loader is configured for the same codec contract. Unknown extension errors remain loader-level failures rather than being silently ignored.

Texture validation checks binary PNG/JPEG/WebP signatures and the 16 MB ceiling. Portable project restoration verifies that imported-model source IDs resolve to GLB records and material texture IDs resolve to image records.

## Offline codec runtime

Studio input loading supports the three compressed glTF paths that matter to the current archive/editor workflow:

- `KHR_draco_mesh_compression` through Three.js `DRACOLoader`;
- `EXT_meshopt_compression` through Three.js `MeshoptDecoder`;
- `KHR_texture_basisu` through Three.js `KTX2Loader` / Basis Universal transcoding.

The runtime deliberately has **no decoder CDN dependency**. `scripts/sync-codecs.mjs` reads the exact pinned `three@0.185.1` installation and deterministically copies the official Draco decoder JS/WASM files and Basis transcoder JS/WASM files into same-origin `/public/codecs/draco/` and `/public/codecs/basis/`. It records byte counts and SHA-256 digests in generated `/public/codecs/manifest.json`. `scripts/validate-codecs.mjs` verifies that output against the package pin and the runtime wiring.

Meshopt is imported as an ESM module from the pinned Three.js package and bundled with the application. `StudioViewport` configures each `GLTFLoader` with the shared Draco loader, Meshopt decoder and renderer-aware KTX2 loader; KTX2 support detection is run against the active WebGL renderer.

The generated decoder/transcoder bytes are build artifacts, not hand-copied source blobs. Draco and Basis payloads retain their upstream Apache-2.0 license; `public/codecs/THIRD_PARTY_LICENSES.md` and `APACHE-2.0.txt` ship the notice/license alongside the runtime contract. Dev, build and release QA run the sync step, and `.gitignore` excludes only the generated decoder directories/manifest while preserving the codec documentation/licenses.

Three's Draco/KTX2 implementations use Web Workers/Blob worker sources. A strict production CSP therefore needs a compatible worker policy, typically `worker-src 'self' blob:`. That is a deployment requirement, not a reason to fall back to a remote decoder host.

This is **input decoding/transcoding support**. It does not mean Studio GLB export re-encodes geometry with Draco/Meshopt or converts textures to KTX2/BasisU.

## Typed archive customization parity

Exactly 13 flagship procedural archive assets (001–013) share a canonical versioned customization contract in `src/data/customization-registry.json`:

1. Mercury Fold;
2. Prismatic Vault;
3. Halo Assembly;
4. Porcelain Bloom;
5. Liquid Lens;
6. Carbon Spine;
7. Magnetic Filaments;
8. Gravity Shards;
9. Signal Coil;
10. Vector Needles;
11. Obsidian Monolith;
12. Chromatic Shell;
13. Velvet Orbit.

The typed state covers palette mode, primary/secondary colors, roughness/metalness/emissive multipliers, opacity, object scale and wireframe, with authored defaults plus curated presets. The material layer clones mounted materials and applies changes relative to authored values, so resetting restores the source look instead of accumulating destructive edits.

The same state is used by:

- the asset-detail WebGL preview;
- Playground controls, v2 share URLs and exported preset JSON;
- Studio archive nodes and Inspector controls;
- portable `.meshvara-project` files;
- typed `.meshvara-scene.ts` / R3F developer handoff;
- the generated downloadable component pack.

Backward compatibility is explicit: v1 Playground links and older version-1 Studio projects that have no customization payload resolve to authored defaults.

`scripts/enrich-customizable-packs.mjs` runs after normal/Geometry V2 pack generation but before Pack-v1 standardization. For those 13 packs it injects the typed customization runtime, layer, wrapper, preset data and exports; only then does Pack-v1 compute final payload hashes. The contract does **not** claim that every one of the other 487 assets exposes identical deep material/shader/geometry parameters.

## Web GLB export profiles

Imported models can be re-exported locally through Three.js `GLTFLoader` + `GLTFExporter` after applying current PBR and texture overrides.

Three honest profiles are exposed:

- **Preserve** — no Studio texture-dimension cap (`maxTextureSize: Infinity`).
- **Web · 2K** — exporter texture dimensions capped at 2048 px.
- **Mobile · 1K** — exporter texture dimensions capped at 1024 px.

All profiles preserve discovered animation clips, export binary GLB, filter invisible objects and use TRS output. Studio reports source/output bytes and the size delta.

These profiles are real texture-size optimization, but they are **not codec re-encoding**. No UI, README or quality contract may describe them as Draco/Meshopt geometry compression or KTX2/BasisU texture encoding.

## Downloadable component delivery

A primary imported model can be exported as a deterministic **R3F component ZIP** entirely in the browser. The ZIP contains:

- the selected profile's exported GLB with current Studio material/texture edits baked in;
- a typed React Three Fiber component;
- discovered animation names as a TypeScript literal union;
- `package.json` with exact Meshvara dependency pins;
- `meshvara-preset.json` metadata;
- `QUALITY.md`;
- MIT license;
- README/install example.

The ZIP writer is implemented locally with deterministic stored entries and CRC32; no server-side archive service is involved. This closes downloadable-component parity for **Studio-imported GLB models**.

For archive assets, the 13-asset enrichment pipeline now defines equivalent typed customization delivery on the next canonical pack build. That does **not** mean the checked-in public ZIP corpus has been physically regenerated in this execution environment; full binary regeneration remains a release action that must pass the 500-pack parity gate.

## Developer handoff

Studio provides:

1. typed `.meshvara-scene.ts` configuration;
2. `.meshvara-scene.tsx` React Three Fiber scaffold;
3. portable `.meshvara-project` editor handoff;
4. imported-model R3F component ZIP delivery;
5. typed archive customization state for the 13 curated flagship assets.

Typed scene configuration includes hierarchy, source identity, archive customization, scalar PBR overrides, local texture file references, animation/debug state and scene presentation. The generic R3F scene scaffold continues to require a consumer-supplied `renderSource(object)` resolver; Meshvara does not pretend browser-local IDs automatically resolve inside a third-party application.

## Appearance and browser release gate

Studio keeps the dark/light/system appearance contract and responsive desktop/tablet/mobile workbench behavior. Browser release tests cover real binary file controls and same-origin runtime resources rather than checking only rendered labels.

## Regression coverage

`studio:check` combines:

- project/hierarchy/state sanitization tests;
- GLB binary validation and offline-codec capability tests;
- curated archive customization/project-migration tests;
- world-transform-preservation/group-transform tests;
- texture binary validation tests;
- local storage + portable GLB/texture round-trip tests using the no-IndexedDB memory fallback;
- deterministic component-pack ZIP tests;
- Studio theme/contrast tests;
- structural source-contract validation.

The Playwright release suite additionally exercises real GLB upload, texture replacement, portable project round-trip, component ZIP inspection, same-origin Draco/Basis runtime endpoints, asset-to-Studio handoff and persisted flagship customization.

These automated contracts are useful without an account or cloud service. Full browser execution still requires a provisioned repository with Bun, dependencies and Playwright browser binaries.

## Known boundary

This tranche does **not** claim completion of:

- Draco or Meshopt **export encoding/re-compression**;
- KTX2/BasisU **export encoding**;
- UV editing, texture painting or atlas generation;
- geometry decimation, mesh merge or automatic LOD authoring;
- keyframe timeline editing, retargeting or IK authoring;
- live simultaneous gizmo movement for every selected object while dragging (group deltas commit on transform completion);
- arbitrary editing of the internal GLTF node hierarchy below a Studio top-level object;
- uniform deep shader/geometry customization for all 500 archive assets;
- physical regeneration of all existing public archive ZIP binaries in an environment where the canonical pack build has not actually run;
- cloud collaboration, accounts or hosted project URLs.

Those remain future optimization, animation and archive-release work.

## QA invariant

`bun run studio:check` must remain part of `bun run qa` and must fail if:

- `/studio`, `/assets` or asset-to-Studio deep linking regress;
- bounded history, hierarchy/cycle protection or multi-object operations disappear;
- world-preserving reparent/group transform math is removed;
- PBR scalar or texture replacement state falls out of project sanitization/handoff;
- archive typed customization falls out of preview, Playground, Studio, portable-project or typed-export parity;
- texture references stop participating in portable project files or storage garbage collection;
- GLB/texture storage starts trusting extensions without binary validation;
- the same-origin Draco/Basis paths, Meshopt wiring or renderer-aware KTX2 setup disappear;
- Studio introduces remote persistence, decoder CDNs or remote model-processing calls;
- skeleton-safe loading, model diagnostics, animation playback or material/texture application disappear;
- web export profiles stop using real `GLTFExporter.maxTextureSize` values or start claiming codec re-encoding;
- deterministic imported-model component ZIP delivery disappears;
- typed config/R3F scaffold delivery disappears.

Real desktop/tablet/mobile interaction testing, IndexedDB quota pressure, very large model/texture memory behavior, browser-specific image decode behavior, GPU-specific material behavior, codec performance on representative compressed assets and visual GLTFExporter round-trip parity still require browser QA.
