# Creature asset rebuild: source implementation and visual gates

Date: 2026-11-22

## Scope of this source change

- `wolf-form-study`: replaced a generic ellipsoid/cylinder assembly with independent torso, sloping neck, muzzle and face lofts, an anatomically directed rear hock / front wrist pose, toe details, upright ears, a brush tail, amber eyes and a seeded grayscale/tawny coat map.
- `zebra-form-study`: replaced a generic animal shape with independent barrel/chest, sloped neck and extended equine head lofts; 4 tapered, jointed legs with dark hooves; paired ears, muzzle nostrils, neck mane, tail, and **locally authored black-and-white flank, face and limb stripe textures**.
- Both scenes use original deterministic, locally generated Three.js geometry and data textures; neither downloads an animal scan or model at runtime.
- Both are packed by the existing Geometry V2 pipeline into a standalone download, with a source-and-geometry ZIP parity regression check.

## Quality claims and release state

These changes are **modeling improvements, not a certification of physical likeness, fidelity, or hyperrealism**. The coats are mathematically generated color maps; they do not substitute for photo-sourced scanned fur, professionally sculpted muscles, UV-unwrapped anatomical meshes, groomed hair cards or production-ready skinning.

No screenshots, in-browser visual sign-off or independent artist review were recorded during source authoring. Both assets remain **UNREVIEWED** along with the other 498, per `quality/visual-approvals.json`.

The required approval gate in `docs/ASSET_FIDELITY_STANDARD.md` must still be satisfied individually.

## Art-direction checklist before these can be approved

1. Produce consistent side, front and three-quarter renders of the current live scene, plus a neutral reference board for each species.
2. Check hip/shoulder height, knee and hock placement, abdomen-to-chest proportions, hoof/paw shape, ear scale, eye placement, throat/muzzle transition and joint connections.
3. Inspect stripe continuity over zebra shoulder, neck, forehead and rump; there should be no painted-looking discontinuities or stretched UVs.
4. Inspect wolf fur breakup and undercoat versus guard hair; a color map alone will not pass macro fur silhouette closeups.
5. Replace any anatomical failures with dedicated Blender sculpted meshes and licensed PBR data, with LODs as appropriate.
6. Measure triangles, draw calls, time-to-first-render, mobile FPS and device memory on actual devices; tune detail by distance.
7. Confirm the downloaded source renders equivalently to the catalog and includes legal provenance.
8. Complete an independent human review, evidence paths and source hash in `quality/visual-approvals.json`.

## Next production direction

First accept a single genuinely high-fidelity creature benchmark, using real multiview references and 3D render evidence, before re-authoring the remaining anatomy-heavy animal catalog. Then extend the proven Blender/PBR workflow to products, vehicles, interiors and industrial equipment. Do not reclassify tiny procedural studies as photorealistic merely by increasing mesh count or automated score.
