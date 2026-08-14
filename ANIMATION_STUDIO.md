# Meshvara Animation Studio foundation

Animation Studio is the local-first transform-animation layer inside `/studio`. It is intentionally built on the existing Meshvara project/history/storage contract so animation data survives autosave, undo/redo, portable `.meshvara-project` export, typed config export and R3F handoff without introducing a cloud dependency.

## Shipped foundation

Each Studio object owns a bounded transform `timeline` that is deliberately separate from its native GLB `animation` clip state:

- frame-snapped position, rotation and scale keys;
- per-key easing: linear, ease-in, ease-out, ease-in-out and step;
- 0.25–120 second duration;
- 12–60 fps authoring;
- up to 600 transform keys per object;
- loop/clamp playback;
- scrubber, first/previous/play/next/last transport;
- manual position/rotation/scale key insertion;
- Auto Key for the active transform mode on a single selected object;
- direct key time/easing editing and deletion;
- keyboard transport: `Space` toggles playback and `K` keys the current transform mode;
- viewport evaluation for all keyed objects at the shared playhead;
- undo/redo and autosave because timeline edits commit through `StudioProject`;
- duplication creates fresh key IDs while retaining the duplicated motion;
- legacy version-1 projects with no transform keys migrate to an empty 5 second / 30 fps timeline;
- hostile project imports clamp duration/fps/time/vector values and drop invalid or duplicate keys.

Native GLB clips remain a separate capability and data model. Imported models still use Three.js `AnimationMixer` plus the existing Inspector clip/speed/loop controls in `node.animation`, while object-level transform tracks live in `node.timeline` and animate the Studio object itself. This separation prevents transform authoring from polluting future skeletal/clip tooling.

## Data model

Transform keys are deliberately object-local instead of a second global persistence database. A key stores:

- stable `key-*` ID;
- time in seconds, snapped to the object's fps;
- channel: `position`, `rotation`, or `scale`;
- three numeric values;
- interpolation/easing mode.

The current version keeps Euler rotation interpolation because Studio's transform editor already stores Euler TRS. Quaternion/slerp rotation tracks are the next correctness upgrade before character-oriented animation work.

## Editing semantics

Playback state and the current playhead are transient UI state. They are **not** committed on every animation frame, avoiding history/autosave churn.

Key creation, key edits, deletion, duration/fps changes and Auto Key commits are normal Studio project mutations, so undo/redo remains predictable.

Auto Key is intentionally limited to one selected object in this foundation. Multi-selection transforms continue to use the existing hierarchy-preserving base-transform path until group timeline deltas can be represented without double-transforming selected descendants.

## Boundaries

This tranche is **not skeletal keyframing**. It does not yet provide:

- bone selection/manipulation;
- pose libraries;
- humanoid retargeting;
- FK/IK solvers;
- root-motion extraction;
- dope-sheet multi-bone editing;
- tangent/Bezier curve handles;
- quaternion curve editing;
- onion-skin/ghost poses;
- animation clip baking back into GLB.

Those belong to the next Animation Studio phases. This foundation supplies the persistent timeline, transport, interpolation, UI and delivery contract those systems require.

## QA contract

`bun run animation:check` executes timeline state/migration tests plus `scripts/validate-animation-studio.mjs`. `studio:check` includes that gate. Browser interaction remains covered by the Studio Playwright suite when the full Bun/Chromium environment is provisioned.
