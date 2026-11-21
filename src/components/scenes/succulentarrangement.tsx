import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/succulent-arrangement.glb'

/**
 * Source: Poly Haven, cheiridopsis_succulent (CC0).
 * Original author and SHA-256 are preserved in cc0Models.json.
 * See downloadable LICENSE-ASSET.md for the original model credits.
 */
export default function SucculentArrangement() {
  return <CC0Mesh url={modelUrl} maxSize={2.35} rotation={[0,-0.31,0]} position={[0,-.12,0]} />
}
