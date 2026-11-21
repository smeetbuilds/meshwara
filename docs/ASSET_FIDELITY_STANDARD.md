# MESHVARA: Asset visual fidelity and release standard

The archive has 500 procedural source assets, but none currently has the required
independent human approval against visual reference evidence. A valid preview
and working ZIP are not proof that the object resembles its title. Existing
automatic scores rate technical source structure, NOT photorealism.

An asset can be described as professional, finished or photorealistic only after
the following independent review criteria are approved:

1. Identity: non-expert recognizes the object at thumbnail size without the name.
2. Silhouette: credible proportions from front, side and three-quarter angles.
3. Materials: object-appropriate roughness, metallic response, fabric/organic
   shading, UV textures and normal/detail maps when applicable.
4. Geometry: correctly assembled features, sensible topology, realistic thickness,
   seams, chamfers, realistic joints and no unsupported floating subassemblies.
5. Three angles: actual screenshots of front, side and three-quarter views.
6. Performance: viewport FPS, triangle count, draw calls and mobile memory.
7. Download parity: exported source or GLB matches the on-site viewer, with
   licensing and independent asset provenance.

Hard-surface assets may use bespoke procedural meshes, but complex subjects
often require dedicated Blender modeling and PBR baking. Animals, humans and
other organic studies require anatomy-aware modeling and detailed UV/PBR
surfaces or legally redistributable scans, not ellipsoids in a generic rig.

Run node scripts/audit-visual-fidelity.mjs for a catalog-wide source-risk report.
Run node scripts/audit-visual-fidelity.mjs --strict for the human-approval
release gate: it deliberately fails until the archive has been reviewed.

Reviews belong in quality/visual-approvals.json and must include a named human
reviewer, ISO date, the exact source SHA-256, all true checks named by the
generated report, plus at least three nonempty evidence images under
quality/evidence. Changing the scene invalidates its approval. Approval cannot
be granted by geometry size, mesh counts, automated screenshots or this script.

Roadmap: individually rebuild and review named hard-surface objects, update
both live preview and ZIP source, replace generic shared-form copies with unique
geometry, then tackle anatomy-heavy and environment-heavy assets using licensed
high-quality source meshes. All 500 remain UNREVIEWED until signed evidence.

## Reproducible CC0 model assets (2026-11-21)

Six exact-match PBR models are sourced from Poly Haven under CC0 1.0 and tracked
in `src/data/cc0Models.json` with each original asset ID, MD5 source record,
final reconstructed GLB SHA-256, mesh count and embedded textures. The committed
repository contains the provenance manifest and import code, **not** the binary
GLB files: `scripts/import-cc0.mjs` downloads and reconstructs missing GLBs
from the original allowlisted host on a clean build, verifies upstream MD5 and
refuses any GLB not matching the committed SHA-256 pin. This is an intentional
build-time external dependency: a fresh build fails when Poly Haven is offline
or changes the source bytes. Production browsers load only local same-origin
static GLBs, without calling the external host.

`scripts/cc0-overlay.mjs` embeds the byte-identical GLB, a portable TSX viewer,
original CC0 license notice and source provenance inside each corresponding ZIP.
`scripts/check-cc0-release.mjs` verifies source, embedded buffers and textures,
ZIP parity, license, and the download manifest without granting artistic approval.
All six models still require independent human visual review before claims of
production-ready hyperrealism.
