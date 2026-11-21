import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/dining-table.glb'

export default function DiningTable(){ return <CC0Mesh url={modelUrl} maxSize={3.2} rotation={[0,-0.37,0]} position={[0,-0.15,0]}/> }
