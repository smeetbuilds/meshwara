# MESHVARA — publishing quality standard

The catalog can grow without a quantity ceiling. The quality threshold does not move to hit a catalog target.

## Every asset must pass

### Art direction
- Clear silhouette and intentional composition at card size and full-screen size.
- No default-primitive demo aesthetic, random particle placement, arbitrary rainbow gradients, or motion added only to prove that an object is 3D.
- Materials, lighting and camera framing must support a defined visual concept.
- Primitive axes, face orientation, normals and local transforms must be reviewed against the intended object; technically valid but visibly mis-oriented geometry is a release blocker.

### Motion
- Motion must have weight, cadence and a reason to exist.
- No frame-rate-dependent animation.
- Loops must not visibly snap.
- `prefers-reduced-motion` must produce a stable presentation instead of continuing a hidden render loop.

### Responsive behavior
- Review at 320, 375, 430, 768, 1024, 1440 and ultrawide layouts.
- Preserve the intended silhouette; do not simply shrink the desktop camera until an asset happens to fit.
- Touch scrolling must not be trapped by decorative WebGL.
- Spatial/grounded scenes must not inherit the floating-object wrapper; presentation metadata must match both the site runtime and the generated download.

### Runtime
- Off-screen previews must be unmounted.
- Scene implementations are code-split per asset.
- Repeated geometry should use instancing where it materially reduces draw calls.
- Avoid unnecessary post-processing and oversized render targets.
- Cinematic assets may cost more GPU time, but must be explicitly labeled.

### Download package
- Direct ZIP, no account gate.
- Source code, README, TypeScript config and license included.
- A downloaded component must render without relying on private project code.
- Dependencies must be stated, minimal and pinned; floating `latest` versions are rejected.
- Packs must be reproducible from the canonical scene source through `bun run packs`.
- Standalone animated wrappers must honor `prefers-reduced-motion`.
- `interaction` and `presentation` metadata are contractual: an Idle asset cannot ship pointer inertia, and a Grounded/Static asset cannot ship the Float wrapper.

## Character / creature gate

The enforced humanoid rig/motion/facial/evidence contract is defined in `CHARACTER_ASSET_STANDARD.md` and validated by `scripts/validate-modeled-assets.mjs`.


A human, animal or other articulated character does not ship merely because a GLB loads.

Required review includes:
- anatomy and proportions
- topology around deformation zones
- skeleton hierarchy and joint placement
- skin weights at shoulders, elbows, wrists, fingers, hips, knees and ankles
- planted contacts without visible foot sliding
- believable center-of-mass and weight transfer
- clean turn, start, stop and loop transitions
- finger and head motion where visible
- facial morph/bone behavior when the face is presentation-critical
- no clothing, hair or body interpenetration in published clips
- LOD/mobile strategy for high-detail models
- animation cleanup after retargeting or mocap; raw motion capture is not considered final
- machine-readable contact/transition metrics for contact-critical human motion; narrative approval alone is insufficient

A failed deformation or animation review blocks publication even if the model is visually attractive in a static pose.

## Catalog preview gate

Every published MESHVARA asset must be inspectable before download from the catalog itself. The card preview is the real lazy-loaded Three.js/R3F scene, not a decorative placeholder image. The shared preview renderer must provide automatic bounds/framing, ACES filmic tone mapping, deterministic studio lighting, responsive DPR, reduced-motion handling, viewport gating, and a recovery state if a lazy scene chunk fails.

The asset detail viewer uses the same source scene at higher fidelity. Download wrappers mirror the important rendering contract so users do not lose framing/tone-mapping quality after downloading the asset.

## Full-catalog automated audit

`bun run quality:check` must validate all published scene sources and write `public/quality/asset-audit.json`. Critical automated checks cover deterministic construction, placeholder-free source, authored-source floor, renderability, explicit material definition, premium materials for cinematic assets, semantic geometry density for product/animal/spatial categories, and the stricter scaled-production density gate for assets 301+.

Automated quality metrics are evidence and regression protection; they do not replace visual art-direction review. A passing score must never be used to justify visibly weak proportions, wrong physical archetypes, broken animation, clipping, or poor composition.

## Geometry V2 — curved primary silhouettes

Realistic product, furniture, vehicle, botanical, food, medical and scientific assets must not rely on box/cylinder assemblies for their primary silhouette. Geometry V2 assets use authored profiles, spline sweeps, lofted/custom BufferGeometry, lathed surfaces, extrusions or production GLB meshes. Primitive geometry remains acceptable for secondary hardware and physically appropriate components.

The public homepage may feature only assets marked `geometryV2: true`. The automated Geometry V2 audit rejects featured assets that regress to primitive-dominated construction.
