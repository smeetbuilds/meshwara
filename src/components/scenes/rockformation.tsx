import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/rock-formation.glb'

export default function RockFormation(){ return <CC0Mesh url={modelUrl} maxSize={2.9} rotation={[0,-0.3,0]} position={[0,-0.15,0]}/> }
