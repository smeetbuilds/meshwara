# Meshvara genuine future development backlog

**Prepared:** 2026-11-19. These are real code locations and reviewable opportunities, not fake bugs, fabricated test results or a simulated study. Some represent **verified code discrepancies**; others are bounded validation/UX extensions where current behavior requires testing. No task below was pre-implemented merely to seed an evaluation.

**Selected first coding task: M-01**, because it has a concrete source-level import/export discrepancy, meaningful TypeScript/Three.js work and measurable GLB round-trip acceptance tests. It is future approved-session work, **not** a pre-application pass claim.

The project is a 500-asset, React/TypeScript/Three.js/React Three Fiber library with a local-first browser Studio and downloadable source packs. The public code is MIT-licensed subject to third-party notices and unresolved legal ownership confirmations; see `docs/OWNERSHIP_AND_PROVENANCE_REVIEW.md`.

## Candidate tasks (18)

### M-01. Compressed GLB export/import parity — Medium

- **Actual current behavior / limitation:** Export uses a bare GLTFLoader while imported-object preview configures offline Draco/Meshopt/KTX2.
- **Source and test paths:** `src/lib/studioModelExport.ts`; `src/lib/studioCodecRuntime.ts`; `src/components/studio/StudioImportedObject.tsx`; `tests/studio/glb-validation.test.ts`; `tests/e2e/studio.spec.ts`
- **Desired outcome / user benefit:** Share loader configuration and validate compressed input-to-export round trips including hierarchy, materials, transforms and clip metadata.
- **Technical area / language:** TypeScript / Three.js / codecs
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Offline decoders must be present; no private model assets.
- **Acceptance criteria / verification:** Build tiny authorized compressed GLBs; export each profile, reimport, assert structural/material/animation parity and explicit errors.

### M-02. Preflight file size before allocating uploaded GLB — Small

- **Actual current behavior / limitation:** The browser reads file.arrayBuffer() before the 100 MB validator sees byte length.
- **Source and test paths:** `src/lib/studioStorage.ts`; `tests/studio/glb-validation.test.ts`
- **Desired outcome / user benefit:** Reject huge File.size before reading and preserve current error UX.
- **Technical area / language:** TypeScript / browser file API
- **Complexity:** Small.
- **Dependencies / prerequisites:** None.
- **Acceptance criteria / verification:** Oversized File is rejected without arrayBuffer invocation; valid fixture still imports.

### M-03. Cumulative portable-project import size limit — Medium

- **Actual current behavior / limitation:** Individual GLB/texture caps exist but the full aggregate project/base64 payload is not capped.
- **Source and test paths:** `src/lib/studioStorage.ts`; `tests/studio/local-storage.test.ts`
- **Desired outcome / user benefit:** Budget total files/encoded bytes and reject before heavy decode.
- **Technical area / language:** TypeScript / browser memory safety
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Agree reasonable caps and compatibility policy.
- **Acceptance criteria / verification:** Synthetic many-file project over cap fails promptly; bounded project restores losslessly.

### M-04. Portable import ID-collision protection — Medium

- **Actual current behavior / limitation:** Restore persists supplied file IDs; existing-project collision behavior is not separately exercised.
- **Source and test paths:** `src/lib/studioStorage.ts`; `src/lib/studioProject.ts`; `tests/studio/local-storage.test.ts`
- **Desired outcome / user benefit:** Preserve unrelated projects' file records; remap IDs safely if needed.
- **Technical area / language:** TypeScript / IndexedDB
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Add collision fixture before implementation.
- **Acceptance criteria / verification:** Two projects with colliding IDs retain distinct blobs and updated node/texture references after reload.

### M-05. Quota-exceeded and transaction-failure recovery — Medium

- **Actual current behavior / limitation:** Autosave failure has a degraded-status path, but quota/partial transaction recovery is not comprehensively verified.
- **Source and test paths:** `src/lib/studioStorage.ts`; `src/components/studio/StudioShell.tsx`; `tests/e2e/storage-failure.spec.ts`
- **Desired outcome / user benefit:** Prevent false success and offer a safe export/retry path.
- **Technical area / language:** TypeScript / IndexedDB / React
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Use isolated browser storage fixtures.
- **Acceptance criteria / verification:** Simulated quota and blocked DB errors do not lose unsaved in-memory scene or claim durable save.

### M-06. Validate GLB chunk padding and declared JSON boundaries — Small

- **Actual current behavior / limitation:** Validation checks magic/version/JSON first chunk, not all malformed chunk-layout variants.
- **Source and test paths:** `src/lib/studioStorage.ts`; `src/lib/studioGlbCapabilities.ts`; `tests/studio/glb-validation.test.ts`
- **Desired outcome / user benefit:** Expand structural edge-case detection with size-safe parsing.
- **Technical area / language:** TypeScript / glTF binary parsing
- **Complexity:** Small.
- **Dependencies / prerequisites:** Document glTF spec constraints.
- **Acceptance criteria / verification:** Malformed padded chunks, truncated BIN, trailing data and unknown required extensions handled deterministically.

### M-07. Round-trip authored animation clips on exported GLB — Medium

- **Actual current behavior / limitation:** GLTFExporter receives gltf.animations, but no verified round-trip matrix for named clips after node changes was established.
- **Source and test paths:** `src/lib/studioModelExport.ts`; `src/lib/studioModelTools.ts`; `tests/e2e/studio-animation.spec.ts`
- **Desired outcome / user benefit:** Preserve target bindings, durations and clip names through edit and export.
- **Technical area / language:** TypeScript / Three.js animation
- **Complexity:** Medium.
- **Dependencies / prerequisites:** M-01 codec fixture may be reused, task otherwise independent.
- **Acceptance criteria / verification:** Synthetic animated rig/object survives export/reimport and plays expected clips.

### M-08. Texture-channel export parity regression — Medium

- **Actual current behavior / limitation:** Seven PBR override channels are supported; export fidelity across channels/color spaces needs independent fixture assertions.
- **Source and test paths:** `src/lib/studioTextureResources.ts`; `src/lib/studioModelTools.ts`; `src/lib/studioModelExport.ts`; `tests/studio/texture-validation.test.ts`
- **Desired outcome / user benefit:** Compare original vs authored overrides in exported GLB.
- **Technical area / language:** TypeScript / PBR materials
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Fixture PNG/JPEG/WebP only.
- **Acceptance criteria / verification:** sRGB and data textures, flipY, alpha and material resets round-trip with controlled fixtures.

### M-09. World/local transform edge-case test matrix — Medium

- **Actual current behavior / limitation:** Existing tests cover representative reparent and group moves; singular, negative-scale and near-shear edge cases need a broader matrix.
- **Source and test paths:** `src/lib/studioTransforms.ts`; `tests/studio/transform-preservation.test.ts`
- **Desired outcome / user benefit:** Improve precision/failure diagnostics without corrupting parent hierarchy.
- **Technical area / language:** TypeScript / linear algebra
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Keep current mathematical contracts.
- **Acceptance criteria / verification:** Matrix invariants hold or operation declines explicitly for diverse synthetic transforms.

### M-10. Undo/history media-reference persistence tests — Small

- **Actual current behavior / limitation:** History is 50 snapshots and cleanup protects active history, but reload/undo with referenced texture cleanup is under-tested.
- **Source and test paths:** `src/lib/studioProjectCore.ts`; `src/lib/studioStorage.ts`; `tests/studio/local-storage.test.ts`
- **Desired outcome / user benefit:** Guard against deleting media still reachable from undo/redo.
- **Technical area / language:** TypeScript / state history / IndexedDB
- **Complexity:** Small.
- **Dependencies / prerequisites:** No changes to history size.
- **Acceptance criteria / verification:** Undo, reload, cleanup, restore and redo retain valid media IDs.

### M-11. Timeline boundary and range playback regression — Medium

- **Actual current behavior / limitation:** Timeline supports durations, FPS ranges, interpolated keyframes; boundary combinations remain suitable for focused stress fixtures.
- **Source and test paths:** `src/lib/studioTimeline.ts`; `src/components/studio/StudioTimeline.tsx`; `tests/studio/timeline-state.test.ts`; `tests/studio/timeline-authoring.test.ts`
- **Desired outcome / user benefit:** Make range loop and keyframe snapping predictable.
- **Technical area / language:** TypeScript / timing / React
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Preserve 600-keyframe constraint.
- **Acceptance criteria / verification:** Start/end/zero-length-like cases and copied keys yield deterministic frame values.

### M-12. Rig export and pose restoration invariants — Medium

- **Actual current behavior / limitation:** Rig authoring has tests, but export/reimport of changed joint pose and skin does not have a demonstrated full artifact round trip.
- **Source and test paths:** `src/lib/studioRigRuntime.ts`; `src/lib/studioRigState.ts`; `tests/studio/rig-project.test.ts`; `tests/e2e/studio-rig.spec.ts`
- **Desired outcome / user benefit:** Add real fixture invariants on skeleton and pose after delivery.
- **Technical area / language:** TypeScript / skeletal animation
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Authorized synthetic rig fixture.
- **Acceptance criteria / verification:** Joint transforms and skinning remain valid and no unspecified bone changes occur.

### M-13. WebGL context-loss recovery in catalog previews — Medium

- **Actual current behavior / limitation:** The site has preview recovery UI, but actual WebGL context loss/recreation was not browser verified in this audit.
- **Source and test paths:** `src/components/AssetScene.tsx`; `src/components/studio/StudioViewport.tsx`; `tests/e2e/public-regressions.spec.ts`
- **Desired outcome / user benefit:** Restore usable preview state without runaway canvases.
- **Technical area / language:** TypeScript / WebGL / React
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Browser GPU runner.
- **Acceptance criteria / verification:** Simulated context lost/restored shows a recoverable state, no leaked render loop.

### M-14. Performance budget for 500 lazy preview cards — Medium

- **Actual current behavior / limitation:** 500 scene modules are registered with lazy preview architecture; real low-end device GPU/CPU impact is unmeasured here.
- **Source and test paths:** `src/components/sceneRegistry.tsx`; `src/routes/assets/index.tsx`; `scripts/audit-asset-quality.mjs`
- **Desired outcome / user benefit:** Add bounded measurements of active canvases, memory, intersection and first interaction.
- **Technical area / language:** TypeScript / React / WebGL performance
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Set budgets from baseline measurements.
- **Acceptance criteria / verification:** Benchmark on emulated low-end device, fail actionable regression thresholds.

### M-15. Keyboard and focus regression suite for Studio — Small

- **Actual current behavior / limitation:** There is a broad browser suite, but keyboard focus workflow was not verified in this review.
- **Source and test paths:** `src/components/studio/StudioInspector.tsx`; `src/components/studio/StudioOutliner.tsx`; `tests/e2e/studio.spec.ts`
- **Desired outcome / user benefit:** Document and test tab order, focus restoration and non-pointer operation.
- **Technical area / language:** TypeScript / accessibility / Playwright
- **Complexity:** Small.
- **Dependencies / prerequisites:** Real browser test runner.
- **Acceptance criteria / verification:** Keyboard-only user can select, edit and close workflows without lost focus.

### M-16. Reduced-motion and touch parity in asset previews — Small

- **Actual current behavior / limitation:** Reduced motion is part of contract; actual motion pausing across device input modes is unverified here.
- **Source and test paths:** `src/lib/useReducedMotion.ts`; `src/components/AssetScene.tsx`; `tests/e2e/public-regressions.spec.ts`
- **Desired outcome / user benefit:** Add repeatable reduced-motion/touch browser tests.
- **Technical area / language:** TypeScript / accessibility / interaction
- **Complexity:** Small.
- **Dependencies / prerequisites:** Touch/mobile browser fixture.
- **Acceptance criteria / verification:** CSS/browser preference fully stops motion and touch scroll remains usable.

### M-17. Memory-aware browser ZIP creation — Medium

- **Actual current behavior / limitation:** Browser ZIP builder has entry and path checks but constructs full archives in memory.
- **Source and test paths:** `src/lib/browserZip.ts`; `src/lib/studioComponentPackCore.ts`; `tests/studio/component-pack.test.ts`
- **Desired outcome / user benefit:** Add aggregate output-size guard and performance tests for many generated files.
- **Technical area / language:** TypeScript / ZIP integrity
- **Complexity:** Medium.
- **Dependencies / prerequisites:** Maintain byte-level pack contract.
- **Acceptance criteria / verification:** Bounded synthetic payloads either produce valid CRC archives or fail predictably before runaway memory.

### M-18. CLI integrity-test coverage for hostile registry inputs — Small

- **Actual current behavior / limitation:** CLI supports HTTP(S) and local registries with byte/hash limits; more redirect/path and oversized stream fixtures are useful.
- **Source and test paths:** `scripts/meshvara.mjs`; `scripts/distribution/core.mjs`; `tests/distribution/cli-network.test.mjs`
- **Desired outcome / user benefit:** Enforce deterministic failures without file overwrite or network credential leakage.
- **Technical area / language:** JavaScript / filesystem / network integrity
- **Complexity:** Small.
- **Dependencies / prerequisites:** No paid service; loopback fixtures only.
- **Acceptance criteria / verification:** Controlled local HTTP fixtures exercise redirects, max bytes, path traversal and atomic write behavior.

### M-19. Publish a reproducible Pack-v1 snapshot — Medium / release-gated

- **Actual current behavior / limitation:** The committed `public/downloads/manifest.json` lists 500 archives without `packSchemaVersion: 1`; strict `scripts/validate-pack-parity.mjs` rejects the untouched checkout, and the generated registry advertises legacy/unspecified packs.
- **Relevant paths:** `public/downloads/manifest.json`, `public/downloads/*.zip`, `scripts/standardize-download-packs.mjs`, `scripts/build-download-packs.mjs`, `scripts/validate-pack-parity.mjs`, `scripts/audit-release-readiness.mjs`, `RELEASE_READINESS.md`.
- **Desired outcome / product value:** Publish an owner-approved, reproducible archive set with correct Pack-v1 metadata and manifest integrity, preserving all legitimate download contents and licenses.
- **Technical area / language:** JavaScript, TypeScript, ZIP/package manifests and build reproducibility. **Complexity:** Medium to large depending on actual binary diff.
- **Dependencies:** Bun 1.3.14, clean frozen install, legal rights/attribution review for each redistributed payload, archive diff approval; avoid unnecessary deployments.
- **Acceptance and verification:** Regenerate in an isolated working tree; `bun run packs` produces 500 deterministic archives; verify `bun run pack:check`, `bun run release:audit`, license notices, 13 curated payloads, CLI strict install and Git diff; independent second generation yields identical SHA-256 outputs. Commit to `main` only after verifying there are no accidental content losses. **Do not execute this as a silent cleanup.**

## Google Form — specific next task

**Project:** Meshvara is my open-source 3D asset archive and local-first browser editing studio, maintained under Aahav Labs. It provides 500 downloadable procedural scenes and browser-based tools for inspecting, editing, organizing and exporting 3D work using TypeScript, React, Three.js, React Three Fiber, Bun and TanStack Start.

**Specific task I would work on next:** I would improve GLB import/export reliability by making the export pipeline support the same offline Draco, Meshopt and KTX2 decoding paths already used by the Studio viewer. I would then add repeatable GLB round-trip tests covering hierarchy, local/world transforms, PBR materials and animation clips to ensure compressed models can be edited and exported safely.

**Eligibility caveat:** Declare the solo-agency relationship and ownership honestly; the Upwork client, not this document, must decide whether solo-business ownership meets the study rules.
