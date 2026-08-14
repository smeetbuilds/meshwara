# Third-party codec notices

Meshvara's same-origin codec runtime is assembled from the exact Three.js version pinned by the application. The copied decoder/transcoder payloads remain third-party works under their upstream licenses.

- **Google Draco** — `draco_decoder.js`, `draco_decoder.wasm`, `draco_wasm_wrapper.js` — Apache License 2.0. Three.js r185 documents these files and the Apache-2.0 license in `examples/jsm/libs/draco/README.md`.
- **Basis Universal** — `basis_transcoder.js`, `basis_transcoder.wasm` — Apache License 2.0. Three.js r185 documents these files and the Apache-2.0 license in `examples/jsm/libs/basis/README.md`.
- **Three.js / Meshopt module integration** — the application dependency remains governed by the licenses distributed with the pinned Three.js package and its bundled third-party sources.

A copy of the Apache License 2.0 is included in `APACHE-2.0.txt` beside this notice. The generated binary/runtime files are not relicensed by Meshvara.
