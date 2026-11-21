import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/moss-stone-study.glb'

/** Same locally hosted, source-pinned model as the downloaded CC0 GLB. */
export default function MossStoneStudy() { return <CC0Mesh url={modelUrl} maxSize={3.8} rotation={[0,-0.32,0]} position={[0,-0.12,0]} /> }
