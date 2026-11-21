import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/lounge-chair.glb'

export default function LoungeChair(){ return <CC0Mesh url={modelUrl} maxSize={2.7} rotation={[0,-0.39,0]} position={[0,-0.13,0]}/> }
