import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/monocoque-chair.glb'

/** Same locally hosted, source-pinned model as the downloaded CC0 GLB. */
export default function MonocoqueChair() { return <CC0Mesh url={modelUrl} maxSize={2.85} rotation={[0,-0.33,0]} position={[0,-0.1,0]} /> }
