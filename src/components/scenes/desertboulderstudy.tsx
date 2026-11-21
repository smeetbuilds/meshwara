import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/desert-boulder-study.glb'

export default function DesertBoulderStudy(){ return <CC0Mesh url={modelUrl} maxSize={2.65} rotation={[0,-0.24,0]} position={[0,-0.1,0]}/> }
