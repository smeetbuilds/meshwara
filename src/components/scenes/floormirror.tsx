import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/floor-mirror.glb'

/**
 * Source: Poly Haven, ornate_mirror_01 (CC0).
 * Original author and SHA-256 are preserved in cc0Models.json.
 * See downloadable LICENSE-ASSET.md for the original model credits.
 */
export default function FloorMirror() {
  return <CC0Mesh url={modelUrl} maxSize={2.75} rotation={[0,-0.18,0]} position={[0,-.12,0]} />
}
