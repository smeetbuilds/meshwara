import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/lion-form-study.glb'

/**
 * Source: Poly Haven, lion_head (CC0).
 * Original author and SHA-256 are preserved in cc0Models.json.
 * See downloadable LICENSE-ASSET.md for the original model credits.
 */
export default function LionFormStudy() {
  return <CC0Mesh url={modelUrl} maxSize={2.65} rotation={[0,-0.32,0]} position={[0,-.12,0]} />
}
