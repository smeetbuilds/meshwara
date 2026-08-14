# Meshvara Studio architecture contract

Meshvara Studio is the free, no-login, local-first composition and model-delivery layer for the Meshvara archive. The editor must keep project data inspectable and portable, must never require a cloud persistence service for core work, and must distinguish real browser-side optimization from codecs or processing pipelines that are not actually bundled.

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
- Scene size remains bounded to 250 nodes and undo/redo to 50 committed snapshots.
- Reparenting rejects self-parenting, descendant cycles and missing parents.
- Reparenting now computes the current world matrix, derives the new local TRS under the requested parent, and commits only when the world transform can be represented without unsupported shear.
- Multi-selection transform commits derive a world-space delta from the primary gizmo and apply it to selected root nodes. Selected descendants inherit the movement through their selected ancestor instead of receiving the delta twice.
- Group-transform/reparent operations reject singular or shear-producing transformations rather than silently corrupting object placement.

Portable `.meshvara-project` export embeds every referenced local GLB and replacement texture, so moving the project between browsers does not silently lose media. Import sanitizes transforms, hierarchy, material state, animation/debug state and file references before restoration.

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

Archive assets continue to use the canonical scene registry. Studio still does not invent a fake universal geometry/shader API across 500 heterogeneous archive scenes.

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
- 100 MB size ceiling.

Texture validation checks binary PNG/JPEG/WebP signatures and the 16 MB ceiling. Portable project restoration verifies that imported-model source IDs resolve to GLB records and material texture IDs resolve to image records.

## Web GLB export profiles

Imported models can be re-exported locally through Three.js `GLTFLoader` + `GLTFExporter` after applying current PBR and texture overrides.

Three honest profiles are exposed:

- **Preserve** — no Studio texture-dimension cap (`maxTextureSize: Infinity`).
- **Web · 2K** — exporter texture dimensions capped at 2048 px.
- **Mobile · 1K** — exporter texture dimensions capped at 1024 px.

All profiles preserve discovered animation clips, export binary GLB, filter invisible objects and use TRS output. Studio reports source/output bytes and the size delta.

These profiles are real texture-size optimization, but they are **not** geometry compression. No UI, README or quality contract may describe them as Draco, Meshopt or KTX2 compression.

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

It does **not** yet mean every existing Meshvara archive ZIP has been regenerated with the same Studio-specific API. Full 500-archive-pack parity remains a separate distribution tranche and must not be marked complete until the real public archives and manifest are regenerated and validated.

## Developer handoff

Studio still provides:

1. typed `.meshvara-scene.ts` configuration;
2. `.meshvara-scene.tsx` React Three Fiber scaffold;
3. portable `.meshvara-project` editor handoff;
4. imported-model R3F component ZIP delivery.

Typed scene configuration includes hierarchy, source identity, scalar PBR overrides, local texture file references, animation/debug state and scene presentation. The generic R3F scene scaffold continues to require a consumer-supplied `renderSource(object)` resolver; Meshvara does not pretend browser-local IDs automatically resolve inside a third-party application.

## Regression coverage

`studio:check` now combines:

- project/hierarchy/state sanitization tests;
- GLB binary validation tests;
- world-transform-preservation/group-transform tests;
- texture binary validation tests;
- local storage + portable GLB/texture round-trip tests using the no-IndexedDB memory fallback;
- deterministic component-pack ZIP tests;
- structural source-contract validation.

These automated contracts are intentionally useful without a network or account. They supplement, rather than replace, real browser interaction testing.

## Known boundary

This tranche does **not** claim completion of:

- Draco geometry compression;
- Meshopt geometry compression;
- KTX2/Basis texture transcoding;
- UV editing, texture painting or atlas generation;
- geometry decimation, mesh merge or automatic LOD authoring;
- keyframe timeline editing, retargeting or IK authoring;
- live simultaneous gizmo movement for every selected object while dragging (group deltas commit on transform completion);
- arbitrary editing of the internal GLTF node hierarchy below a Studio top-level object;
- uniform deep shader/geometry customization for all 500 archive assets;
- regeneration of all existing public archive ZIPs with Studio-specific component APIs;
- cloud collaboration, accounts or hosted project URLs.

Those remain future compression, animation and archive-distribution tranches.

## QA invariant

`bun run studio:check` must remain part of `bun run qa` and must fail if:

- `/studio`, `/assets` or asset-to-Studio deep linking regress;
- bounded history, hierarchy/cycle protection or multi-object operations disappear;
- world-preserving reparent/group transform math is removed;
- PBR scalar or texture replacement state falls out of project sanitization/handoff;
- texture references stop participating in portable project files or storage garbage collection;
- GLB/texture storage starts trusting extensions without binary validation;
- Studio introduces remote persistence or remote model-processing calls;
- skeleton-safe loading, model diagnostics, animation playback or material/texture application disappear;
- web export profiles stop using real `GLTFExporter.maxTextureSize` values or start claiming unavailable codecs;
- deterministic imported-model component ZIP delivery disappears;
- typed config/R3F scaffold delivery disappears.

Real desktop/tablet/mobile interaction testing, IndexedDB quota pressure, very large model/texture memory behavior, browser-specific image decode behavior, GPU-specific material behavior and visual GLTFExporter round-trip parity still require browser QA.
