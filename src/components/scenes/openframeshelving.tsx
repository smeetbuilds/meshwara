import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/open-frame-shelving.glb'

/** Same locally hosted, source-pinned model as the downloaded CC0 GLB. */
export default function OpenFrameShelving() { return <CC0Mesh url={modelUrl} maxSize={2.95} rotation={[0,-0.3,0]} position={[0,-0.1,0]} /> }
