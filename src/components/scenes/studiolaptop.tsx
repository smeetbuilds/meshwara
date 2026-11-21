import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/studio-laptop.glb'

/**
 * Source: Poly Haven, classic_laptop (CC0).
 * Original author and SHA-256 are preserved in cc0Models.json.
 * See downloadable LICENSE-ASSET.md for the original model credits.
 */
export default function StudioLaptop() {
  return <CC0Mesh url={modelUrl} maxSize={2.75} rotation={[0,-0.4,0]} position={[0,-.12,0]} />
}
