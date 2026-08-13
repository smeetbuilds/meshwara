# MESHVARA — character production standard

Character packs are treated as performance assets, not static meshes with incidental animation. A character is publishable only when modeling, deformation, motion, facial behavior, responsive delivery, licensing, and runtime integration all pass review.

## Non-negotiable publication bar

A production character must be:

- full-body and intentionally art-directed;
- skinned to a semantically identifiable humanoid rig;
- authored as desktop, tablet, and mobile GLB tiers;
- shipped with a minimum locomotion/transition set;
- reviewed for contact, balance, deformation, clipping, and loop continuity;
- supplied with evidence for every required clip, transition, and diagnostic deformation pose;
- integrated through the same canonical animation API across all LOD tiers;
- packaged with explicit redistribution/commercial-use rights.

Automated checks reject incomplete assets. They do not replace visual review.

## Young Man 01 — flagship realistic contract

The first realistic human pack is specified as a young-adult full-body character suitable for hero-scale presentation and medium closeups.

### Geometry and materials

Desktop target:

- up to 140k rendered triangles;
- up to 12 texture bindings;
- <= 12 MiB final self-contained GLB;
- face, ears, hands, footwear, and clothing silhouette remain clean at hero framing;
- deformation topology must preserve shoulder, elbow, wrist, hip, knee, ankle, mouth, and eyelid loops;
- normals/tangents must remain stable across all published animation clips.

Tablet target:

- <= 80k triangles;
- <= 8 MiB GLB;
- no visible silhouette collapse at the approved tablet framing.

Mobile target:

- <= 45k triangles;
- <= 5 MiB GLB;
- hands, face, footwear, and clothing read correctly at the approved crop;
- LOD reduction must not introduce visible skinning pops or broken normals.

### Humanoid semantic rig

Every tier must resolve at least these semantics:

- hips, spine, chest, neck, head;
- left/right shoulder;
- left/right upper arm, lower arm, hand;
- left/right upper leg, lower leg, foot.

The validator accepts declared aliases (for example `Hips`, `mixamorig:Hips`, `pelvis`) but every semantic must resolve in every tier.

### Facial standard

A realistic closeup-ready character requires at least 52 morph targets and named semantic coverage for:

- blink left / blink right;
- jaw open;
- smile left / smile right;
- brow raise left / brow raise right;
- brow down left / brow down right;
- brow down left / right;
- mouth funnel / pucker;
- cheek raise left / right.

The flagship contract uses a 52+ morph target floor so blink, mouth, brow and cheek controls do not compete for a tiny expression set. Eye aim may remain bone-driven when documented in QA evidence.


### Hand and finger standard

A realistic hand-closeup-ready human must expose 30 finger semantics: three phalange joints for thumb, index, middle, ring and pinky on both hands. Aliases can map to Mixamo, Unreal-style or custom rig names, but every semantic must resolve in every LOD tier.

Hand QA requires both review evidence and machine-readable metrics. Young Man 01 targets:

- <= 2.5 mm finger interpenetration;
- <= 2 degrees joint-limit overshoot;
- no collapsed knuckles, palm tearing or visible wrist discontinuity in close-up poses.

### Required animation set

Minimum production clips:

1. Idle
2. Walk
3. Run
4. TurnLeft90
5. TurnRight90
6. WalkStart
7. WalkStop
8. RunStart
9. RunStop
10. LookAround
11. Wave

The first nine are mandatory for every published character pack. The flagship Young Man 01 contract requires all eleven.

For locomotion clips the animation must visibly engage hips, both leg chains, both feet, and counter-motion in the upper body. The manifest declares those semantic requirements; the GLB inspector verifies the targeted nodes.

### Motion QA

Every required clip receives its own QA evidence file. Contact-critical clips are reviewed for:

- planted feet with no visible sliding during stance;
- correct heel/toe roll where the style calls for it;
- no knee inversion or popping;
- credible center-of-mass travel;
- hip/shoulder counter-rotation;
- clean arm arcs and hand pose;
- no clothing/body penetration;
- clean first/last-frame continuity for loops;
- consistent perceived speed between desktop/tablet/mobile tiers.

Raw mocap or retarget output is never final publication material. It must be cleaned and reviewed.

Contact-critical clips also require machine-readable metrics. The validator rejects clips whose measured maximum foot slide, contact height error, root vertical jitter, or loop pose error exceeds the manifest threshold. For Young Man 01 the walk/run foot-slide target is <= 12 mm and loop pose error is <= 3 degrees. These measurements supplement, rather than replace, visual motion review.

### Transition QA

Required transition reviews:

- Idle -> Walk
- Walk -> Idle
- Walk -> Run
- Run -> Walk

The approved blend window must be <= 0.5 seconds. Each transition has evidence showing that the blend does not cause foot skating, pose collapse, or visible snapping. A metrics JSON file is also mandatory and is thresholded for maximum foot slide, root-position snap, and angular pose snap.

### Deformation QA

A realistic character requires at least eight diagnostic deformation reviews. Young Man 01 uses:

- shoulder overhead reach;
- arms-forward reach;
- elbow deep flexion;
- wrist extension/flexion;
- hip high flexion;
- deep squat;
- knee deep flexion;
- ankle dorsiflexion / toe-off.

Additional facial and finger diagnostic poses are required before a closeup-ready asset is approved. Realistic deformation poses also carry machine-readable thresholds for maximum surface penetration, local volume loss and normal deviation; an approval note without those measurements cannot publish the flagship human.

### Cross-LOD consistency QA

Desktop, tablet and mobile exports are compared as one character, not three unrelated meshes. Young Man 01 requires measured consistency for overall height, ground offset, silhouette deviation and clip-duration drift. The current flagship thresholds are <= 0.5% height drift, <= 4 mm ground offset, <= 3% silhouette deviation and <= 0.02 seconds clip-duration drift across tiers.

### Responsive QA

Each tier has separately approved:

- model scale;
- world position;
- camera position;
- camera target;
- silhouette and ground contact;
- visible facial/hand detail;
- frame time and memory behavior.

A mobile tier is not considered complete merely because it has fewer triangles.

## Evidence format

QA evidence can be Markdown that references locally archived screenshots/videos or contains measured review notes. Publication requires meaningful evidence files; empty approval flags are rejected.

## Runtime contract

Downloaded character packs expose:

- canonical animation names independent of upstream clip naming;
- alias-aware action resolution;
- per-clip loop/one-shot behavior;
- configurable crossfade duration;
- a frozen intentional first-frame pose under `prefers-reduced-motion`;
- device-tier GLB selection and tier-specific framing.

The runtime must never silently keep playing a previous clip when a requested clip is absent.
