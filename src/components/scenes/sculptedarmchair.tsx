import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/sculpted-armchair.glb'

/** Same locally hosted, source-pinned model as the downloaded CC0 GLB. */
export default function SculptedArmchair() { return <CC0Mesh url={modelUrl} maxSize={2.85} rotation={[0,-0.35,0]} position={[0,-0.1,0]} /> }
