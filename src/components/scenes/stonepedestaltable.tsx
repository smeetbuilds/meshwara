import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/stone-pedestal-table.glb'

/** Same locally hosted, source-pinned model as the downloaded CC0 GLB. */
export default function StonePedestalTable() { return <CC0Mesh url={modelUrl} maxSize={3.05} rotation={[0,-0.33,0]} position={[0,-0.1,0]} /> }
