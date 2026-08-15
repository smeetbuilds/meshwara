# Meshvara Studio — Skeletal Animation Foundation

This phase establishes the local-first rig and pose data model needed before FK/IK, retargeting or bone timelines can be implemented responsibly. Native GLB clips remain under `node.animation`; Meshvara object transform tracks remain under `node.timeline`; skeletal mapping and pose-library state live under the imported node's `rig` field.

## Rig inventory

When an imported GLB finishes loading, Studio traverses the cloned scene and inventories every `THREE.Bone`. Bone IDs are deterministic hierarchy paths built from authored bone names and sibling occurrence, rather than transient Three.js UUIDs. The inspection exposes parent IDs, depth, root-bone count, a rest-pose snapshot and warnings for unusually large/multi-root rigs.

Projects support up to 256 validated pose bones and 64 saved poses per imported node. Unknown or malformed project data is discarded/clamped during project restore instead of being trusted.

## Humanoid mapping

Studio defines 22 foundational humanoid roles: hips, spine/chest/upper chest/neck/head, bilateral shoulder/upper arm/lower arm/hand and bilateral upper leg/lower leg/foot/toes.

Auto-map uses conservative name heuristics covering common Mixamo-style and left/right naming. Auto-map is only a suggestion. Every role has a manual bone selector, mappings may be cleared, and low-confidence rigs surface a warning rather than pretending to be humanoid.

## Pose library

For a rigged imported GLB users can:

- capture the current local skeleton pose;
- save the authored rest pose;
- apply any saved pose;
- return to the authored rest pose;
- duplicate and delete poses;
- mirror a mapped pose left → right or right → left;
- export a versioned `.meshvara-poses.json` library;
- import that library locally.

Pose transforms store local position, normalized quaternion rotation and local scale by stable bone ID. Applying a saved pose is local/browser-only. An explicitly active pose takes precedence over native GLB clip playback; returning to REST releases that override so imported clips can play normally again.

Directional mirroring copies only the requested source side into its mapped opposite side. The mirrored local position reflects X and quaternion rotation is reflected across the YZ plane. This is a deterministic authoring primitive, not a claim of semantic full-body retargeting.

## Project and delivery parity

Rig mapping, pose library and active pose are part of the version-1 `.meshvara-project` node data. Older projects without `rig` migrate to an empty rig state. Duplicate imported nodes receive fresh pose IDs so pose identity remains node-local.

Typed Studio config and R3F scaffold metadata include rig data. Imported-model component ZIPs add the same sanitized rig/pose metadata to `meshvara-preset.json` and document the separation from native GLB animation clips.

## Local-first guarantees

No pose, skeleton, character model or mapping is uploaded. Capture, apply, mirroring, import/export and persistence remain in IndexedDB/project JSON/browser memory.

## Intentional boundaries

This phase **does not** claim FK bone gizmos, IK targets, full-body IK, foot planting, humanoid retargeting, animation-clip baking, bone dope-sheet tracks, root-motion extraction, pose blending or constraint solving. Those depend on this stable bone/mapping/pose identity layer and are the next animation phases.

## QA

`bun run rig:check` executes pure rig/mapping/mirror/migration behavior plus the structural integration contract. `studio:check` includes that gate so project persistence, viewport application and delivery parity cannot silently drift apart.
