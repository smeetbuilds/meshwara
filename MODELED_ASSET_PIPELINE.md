# MESHVARA — modeled asset production pipeline

Modeled assets are held to a stricter gate than procedural scenes because a GLB can be technically valid while still failing visually, anatomically, legally, or at runtime.

## Publication state

A modeled asset lives in `public/models/<slug>/` with a `manifest.json` and three delivery tiers. The site remains frontend-only: manifests and models are static files, and direct ZIP downloads are generated at build/authoring time.

A model is **not public catalog inventory** until `publish` is `true` and every QA field is `approved`.

## Required tiers

- `desktop`: presentation/high tier
- `tablet`: reduced geometry and/or texture pressure
- `mobile`: deliberately authored mobile tier, not merely the desktop model rendered at lower DPR

The validator rejects an LOD chain where tablet is heavier than desktop or mobile is heavier than tablet.

## Character workflow

The complete enforced character contract is documented in `CHARACTER_ASSET_STANDARD.md`. Use `templates/model-asset/young-man-01.manifest.json` as the realistic flagship reference rather than the generic object manifest.


1. Reference board and target presentation distance are locked before modeling.
2. Base mesh is modeled/sculpted to intentional anatomy and silhouette.
3. Retopology prioritizes shoulders, elbows, wrists, hips, knees, ankles, mouth and eyelids where visible.
4. UVs and PBR texture sets are authored at the required tier resolutions.
5. Skeleton placement is reviewed in neutral pose before skinning.
6. Skin weights are tested with extreme diagnostic poses, not only the final animation.
7. Animation is cleaned after retargeting/mocap. Raw mocap is never a publishable final clip.
8. Contact-critical clips are checked for foot/hand sliding, penetration and center-of-mass errors.
9. Facial-closeup assets require a validated morph/bone facial system and measured eyelid/lip/asymmetry QA.
10. Realistic hand-closeup assets require 30 finger semantics plus measured finger interpenetration and joint-limit QA.
11. Hair/clothing intersections are checked across every published clip.
12. Diagnostic deformation poses carry measured penetration, local volume-loss and normal-deviation limits.
13. LODs are generated and manually reviewed for silhouette, hands, face and deformation, then compared with cross-tier consistency metrics.
14. glTF/GLB inspection and static manifest validation run before browser QA.
15. Browser QA covers the responsive breakpoints in `QUALITY_STANDARD.md` and reduced motion.
16. The asset is downloadable only after license/redistribution review is approved.

## Automated inspection

`bun scripts/model-inspector.mjs <file.glb|file.gltf>` reports:

- byte size
- mesh / primitive counts
- vertices and estimated triangles
- material / texture / image counts
- skins and unique joints
- skinned primitive presence
- morph target count
- animation clips, durations and target paths
- Draco / Meshopt / KTX2 usage
- named nodes for required rig checks

`bun scripts/validate-modeled-assets.mjs` checks every `public/models/*/manifest.json` against file existence, budgets, LOD ordering, rig and finger semantics, clip/contact metrics, transition metrics, facial/hand metrics, deformation metrics, cross-LOD consistency, licensing and QA state.

## Quality rule

Automated checks are necessary but never sufficient. A model can pass every numeric budget and still be rejected for poor anatomy, weak materials, bad motion, generic art direction, visible clipping, bad camera framing, or a low-quality mobile LOD.

## Self-contained delivery rule

A modeled asset may only set `publish: true` when every desktop/tablet/mobile tier is a self-contained `.glb`. External buffer or image URIs are rejected by `models:check`; downloadable packs must not depend on sibling `.bin`, texture, or remote files that can be lost after extraction.

The `display` block is also mandatory. It captures the approved base presentation transform and framing (`scale`, `position`, optional `rotation`, optional camera position/target, and optional default animation clip). `display.tiers.desktop/tablet/mobile` may override transform or camera values for device-specific composition. The same responsive tier resolver selects both the GLB and its framing, so a mobile character can use a genuinely authored LOD and crop instead of merely shrinking the desktop camera.

## Integrity and review evidence

For `publish: true`, each model tier must include the exact lowercase SHA-256 digest of the final GLB. Validation re-hashes the bytes and rejects drift. Every approved QA dimension must also point to a non-empty evidence file under the model directory. Character packs additionally carry the machine-readable metrics files referenced by animation, transition, deformation, facial, hand and LOD-consistency contracts inside the final download ZIP. This makes visual/technical approval auditable and prevents a manifest-only approval from bypassing review.

## Staging licensed third-party sources

Use `staging/sources/*.json` for licensed upstream packs before any conversion or optimization. A registry must be `publish: false`, use a pinned Git revision, explicitly permit redistribution/commercial use, and pin every source file by expected byte length plus Git blob SHA-1. Run the materializer only in an environment with network access; successful materialization does **not** imply publication approval.
