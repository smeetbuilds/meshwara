# Meshvara offline codec runtime

Meshvara Studio loads Draco and KTX2/BasisU decoder assets from this same-origin `/codecs/` directory. The binary/runtime files are synchronized at dev/build/release time from the exact `three` version pinned in the root `package.json`; they are not downloaded from a CDN at runtime.

Run `bun run codecs:sync` after installing dependencies. `bun run codecs:check` verifies byte sizes and SHA-256 digests against the generated `public/codecs/manifest.json`.

Meshopt decoding is imported from Three.js as an application module and is bundled by Vite. The copied Draco and Basis runtime assets are Apache-2.0 licensed; `THIRD_PARTY_LICENSES.md` and `APACHE-2.0.txt` are kept beside this runtime. Three.js itself is MIT licensed. Meshopt is bundled from the pinned Three.js dependency and retains its upstream license terms.

Because Three.js decoder/transcoder loaders create Web Workers from Blob URLs, deployments with a strict Content Security Policy should allow `worker-src 'self' blob:` while keeping network asset loading restricted to the same origin.
