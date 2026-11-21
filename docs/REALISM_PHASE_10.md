# Meshvara realism upgrade — Phase 10

**Release base:** main at a878713cec843478271f84de6ed1b41710d1f9f8.
**Goal:** improve *actual source accuracy* instead of counting generic code geometry as photorealism.

## Eight newly sourced, original-authored CC0 GLBs

Original author, official source, original texture checksums, generated GLB hash,
mesh/material/image counts, source-polycount and license are pinned per asset
in src/data/cc0Models.json. The 1K glTF originals and their image resources are
MD5-validated before being packed as one same-origin, embedded-PBR GLB.

| Stable slug | Corrected visual catalog name | Poly Haven source | Original authors |
| --- | --- | --- | --- |
| studio-laptop | Retro Laptop Computer | classic_laptop | Arrangemonk |
| floor-mirror | Ornate Gilded Mirror | ornate_mirror_01 | James Ray Cock |
| research-microscope-pro | Vintage Brass Microscope | vintage_microscope | Luis José Fernández Rodríguez |
| professional-saute-pan | Aged Brass Cooking Pan | brass_pan_01 | Rico Cilliers |
| fluted-console-cabinet | Vintage Glass-Front Cabinet | vintage_cabinet_01 | Rico Cilliers |
| lion-form-study | Carved Lion Head Sculpture | lion_head | Tina |
| succulent-arrangement | Cheiridopsis Succulent Study | cheiridopsis_succulent | James Ray Cock; Jenelle van Heerden |
| torque-wrench | Chrome Ratchet Wrench | ratchet_wrench | John Hutcheson |

The stable historical URL slugs are retained to preserve existing links.
Display titles and descriptions were corrected where previous labels implied
a different modern object. For example, a mechanical ratchet wrench is not
a calibrated torque wrench and a Victorian mirror is not a floor-standing
mirror. The newly sourced scanned source must not be used to imply otherwise.

## Cross-catalog geometry fix

src/components/geometry/GeometryV2.tsx now builds lofts using:

- A duplicate UV seam vertex on every cross-section, preventing triangles
  from stretching a texture across V=0 and V=1.
- Smoothed matching normals across the duplicated side seam, so it doesn't
  become a visible shading crack.
- Independently authored flat end-cap perimeter vertices, with correct
  outward normals on both sides.
- Finite-coordinate and radial-subdivision input checks.

The tests/quality/loft-geometry.test.ts gate verifies exact buffers, UV
continuity, cap winding, seam normal equality, bounds and invalid-input
rejection. Generated ZIPs package this same helper source.

## Verified quality, remaining work

The complete 500-scene build and Pack-v1 integrity suite passed in the
ephemeral Vercel sandbox after GLB import and geometry repairs. Download
archives embed exact new GLB bytes and preserve the model's license notice.
Sampled desktop/mobile WebGL loads also passed after the browser tests were
split into low-memory groups. Four sample model screenshots were inspected.

The visual-fidelity heuristic was also fixed to recognize ten architectural
assets that use the audited local CC0Surface helper.

At this release, the automated source audit reports:

- 500 assets total
- 39 source-pinned original CC0 PBR models
- 451 scenes without confirmed source texture maps
- 196 scenes with low source-code volume (only a triage signal)
- 0 generic production-form scenes
- **0 of 500 independently artist-approved**

These are not all ultra-hyperrealistic. Even models with authentic PBR data
need independent visual reviews for subject and proportions, authored
camera composition, material calibration under controlled lights, multiple
viewpoints, mobile performance, and semantic naming.

**Production art priorities:** externally reference and review the remaining
451 no-source-texture scenes first. Preserve object-specific geometry and
technical pack/source parity, and never relabel generic forms as verified
photorealistic solely because the technical checks pass. The public artist
review badge must remain pending until actual signed visual evidence exists.

No branch, pull request, paid source, paid hosting upgrade or new CI job
was introduced by this phase.
