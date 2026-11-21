import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/croissant-study.glb'

export default function CroissantStudy(){ return <CC0Mesh url={modelUrl} maxSize={2.45} rotation={[0.05,-0.27,0.05]} position={[0,-0.15,0]}/> }
