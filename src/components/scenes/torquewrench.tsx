import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/torque-wrench.glb'

/**
 * Source: Poly Haven, ratchet_wrench (CC0).
 * Original author and SHA-256 are preserved in cc0Models.json.
 * See downloadable LICENSE-ASSET.md for the original model credits.
 */
export default function TorqueWrench() {
  return <CC0Mesh url={modelUrl} maxSize={2.75} rotation={[0,-0.54,0]} position={[0,-.12,0]} />
}
