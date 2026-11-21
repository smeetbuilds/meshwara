# Industrial mechanism rebuild: visual engineering acceptance

The Phase 5 abstract \`IndustrialForm\` wrapper is not sufficient to depict
named machinery. Six scene modules have been replaced with independent,
object-specific geometry:

- Precision milling vise: fixed and sliding jaws, steel gripping inserts,
  ways, lead screw, clamping mounts and hand-crank
- Hydraulic tie-rod cylinder: barrel, moving chromed rod, front gland,
  four threaded tie rods and dual hydraulic ports
- SCARA assembly robot: two planar rotary links, vertical Z spindle,
  motor pedestal and end-effector jaws
- Delta pick robot: fixed upper triangle, three parallel link pairs,
  small moving tool platform, suction cup and indexing belt
- PLC rack: metal backplane, DIN rails, CPU and modular I/O cards,
  terminal barriers, status LEDs and cable harnesses
- Safety light curtain: separate emitter and receiver housings,
  optical windows, status indicators, sensor arrays and signal cables

All are engineering **illustrations**, not manufacturing-grade CAD. Shapes,
electrical ports and mechanisms have not been validated against manufacturer
CAD, certification standards or measured physical reference dimensions.

## Quality gates

\`node tests/quality/industrial-identity.test.mjs\` checks named components,
curved/profile geometry, distinct source files, controlled material palettes
and absence of the former generic wrapper. With \`--packs\`, it additionally
verifies the generated ZIP contains the same source as the live preview and the
required GeometryV2 helper.

Even a pass does not constitute human art-direction approval, photorealism,
operational safety, mechanical stress analysis, wiring correctness or
manufacturing fitness. The strict independent visual-release gate remains
unmet until multi-angle review evidence is signed off.

A matching CC0 bronze horse-head bust is independently sourced from Poly Haven
with its original artists, embedded PBR maps and source license in the download.
This model is also **artist-unreviewed in Meshvara** despite its realistic mesh.
