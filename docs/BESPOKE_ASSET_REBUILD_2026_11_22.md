# MESHVARA: second source-fidelity batch (2026-11-22)

This change repairs eight additional catalog scene sources where the title promised recognizable features that the previous scene largely omitted. The rebuilds are original WebGL authored works; no external proprietary model or purchased texture is included. They remain **UNREVIEWED** until independent three-view artist evidence exists.

| Asset | Authored structural details | Materials |
|---|---|---|
| Precision Lathe Chuck | Three offset scroll jaws with stepped gripping teeth, concentric faceplate rings, front fasteners, jaw slide guides and rear spindle register | Brushed steel, dark alloy, fasteners |
| Clinical Otoscope | Diagnostic head, viewing window, angled removable conical speculum, grip rings, illumination detail, control and charger | Satin alloy, optically coated window and rubber |
| Thermal Printer | Receipt-roll housing, output throat, cutter, status key, cooling slots, curved printed thermal receipt and feet | Paper texture, ABS shell, metal cutter |
| Magnetic Stirrer | Ceramic hotplate, separate control dials, gradated borosilicate beaker, translucent liquid and magnetic stir bar | Glass transmission, matte ceramic, clear liquid and PTFE |
| Sourdough Loaf | Oval irregularly displaced loaf, baked crust, cut scoring, expanded ears and crumb-like accent, bread board | Procedural albedo and bump crust maps; no photogrammetry |
| Performance Surfboard | Continuous shaped rocker, narrowing nose/tail, beveled deck rails, 3 fins, grip pad and leash plug | Epoxy-coated foam color, rail and fins |
| Network Router | Four hinged antennas, eight LEDs, RJ45 ports with contacts, DC barrel socket, heat vents and feet | Polymer and metallic contacts |
| Mushroom Cluster | Five variable convex mushroom caps, stems, radial gills, mycelium and forest substrate | Three procedural speckled cap materials |

## Product-integrity guardrails

- `tests/quality/bespoke-object-identity.test.mjs` checks authored structural markers, deterministic source, no generic-form substitute, and materials.
- `bun run bespoke:check` runs structural checks independently.
- The production build calls `tests/quality/bespoke-object-identity.test.mjs --packs` *after* regenerating the full 500 downloadable ZIPs. It verifies each affected ZIP has the expected scene bytes, the precise CurveBox/GeometryV2 helper sources where used, and matching SHA-256 records in the global manifest.
- The reference three-angle Playwright evidence suite now includes these eight scenes, bringing it to 18 affected assets. Run `bun run visual:evidence` to create actual WebGL screenshots, then inspect them manually.
- TypeScript and static distribution checks remain part of the production build. No new branch, PR, paid service, vendor model or CI workflow was introduced.

## Remaining truthfully measured work

The production build is a software validity gate, **not** an artistic fidelity gate. The checker `scripts/audit-visual-fidelity.mjs` continues to report 500 items pending independent review. Even the enhanced original procedural scenes do not provide calibrated real-world dimensions, photo-based texture sets, micrometer-level machined design, proper food scans, or verified wildlife anatomy. The 500-item rebuild queue, especially its highest structural-risk group, remains the authoritative next inspection workload.

The next objective release milestone is a representative, independently approved, fully textured GLB/Blender mesh with front, side and three-quarter visual evidence, performance metrics and exact live-viewer-to-download parity. Use this proven workflow to rebuild the remaining categories rather than conflating added mesh details with photorealism.
