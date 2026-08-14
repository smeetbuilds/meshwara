# Meshvara Animation Studio — precision authoring

This module upgrades the transform-animation foundation from basic key insertion into a practical local-first authoring workflow. It deliberately keeps native GLB clips (`node.animation`) separate from Meshvara transform tracks (`node.timeline`).

## Rotation correctness

Rotation key values remain Euler XYZ so they are editable through the existing Inspector and remain portable in version-1 project/config formats. Evaluation no longer linearly interpolates Euler components. For each rotation segment Studio:

1. converts both XYZ endpoints to normalized quaternions;
2. flips the destination quaternion when necessary so the dot product is positive;
3. evaluates shortest-path spherical interpolation (slerp);
4. converts the evaluated quaternion back to Euler XYZ for the scene transform.

A 170° → −170° authored turn therefore passes through ±180° instead of spinning through 0°.

## Persistent work area

Every timeline now owns `rangeStart` and `rangeEnd` in addition to duration/fps/loop. Old projects without these fields migrate to the full timeline (`0 → duration`). Imported hostile values are clamped, ordered and frame-snapped.

The work area affects playback transport only. Full-duration scrubbing remains possible so an animator can inspect keys outside the active preview range. Looping wraps inside the range; non-looping playback stops at the range end.

Controls include:

- numeric IN/OUT fields;
- SET IN / SET OUT at the current playhead;
- FULL to restore the complete duration;
- `I` / `O` keyboard shortcuts;
- work-area visualization on the scrubber and all three tracks.

## Key authoring workflow

The selected key is now controller state rather than disposable component-local state, enabling deterministic commands:

- direct X/Y/Z editing;
- previous/next key navigation (`[` / `]`);
- transient key clipboard;
- paste at the current playhead;
- duplicate one frame forward;
- one-frame left/right nudging with same-channel collision protection;
- delete through the key editor;
- frame/easing editing from the existing editor.

Clipboard and selection are transient UI state and never pollute autosave/history. Any command that changes project data still commits through the normal Studio history channel, so undo/redo remains authoritative.

## Delivery parity

`rangeStart`, `rangeEnd`, frame-snapped keys and easing remain in:

- `.meshvara-project` autosave/export;
- typed Meshvara scene config;
- generated R3F scaffold metadata;
- `meshvara-preset.json` inside R3F component ZIPs.

The component-pack README explicitly documents that stored rotation keys are Euler values while Meshvara preview interpolation uses quaternion shortest-path evaluation.

## Boundaries kept intentional

This phase still does not claim skeletal authoring, IK/FK, humanoid retargeting, root-motion extraction, multi-bone dope sheets, tangent/Bezier handles, ghost poses, or GLB animation baking. Those require a bone/clip data model rather than overloading object-transform tracks.

## QA

`bun run animation:precision:check` covers work-area sanitization, quaternion wraparound, clipboard/paste, duplicate/nudge collision behavior and key navigation. `animation:check` includes that gate plus the original foundation validator.
