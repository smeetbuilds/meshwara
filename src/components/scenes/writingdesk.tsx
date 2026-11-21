import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/writing-desk.glb'

/** Same locally hosted, source-pinned model as the downloaded CC0 GLB. */
export default function WritingDesk() { return <CC0Mesh url={modelUrl} maxSize={3.15} rotation={[0,-0.34,0]} position={[0,-0.1,0]} /> }
