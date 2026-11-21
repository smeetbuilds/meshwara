import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/bedside-table.glb'

/** Same locally hosted, source-pinned model as the downloaded CC0 GLB. */
export default function BedsideTable() { return <CC0Mesh url={modelUrl} maxSize={2.8} rotation={[0,-0.3,0]} position={[0,-0.1,0]} /> }
