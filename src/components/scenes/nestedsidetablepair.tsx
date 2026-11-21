import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/nested-side-table-pair.glb'

/** Two separately scaled independent table shapes; both share the verified CC0 mesh. */
export default function NestedSideTablePair() {
 return <group>
   <CC0Mesh url={modelUrl} maxSize={2.0} rotation={[0,-.25,0]} position={[-.51,-.1,-.12]} />
   <CC0Mesh url={modelUrl} maxSize={1.54} rotation={[0,.26,0]} position={[.58,-.1,.24]} />
 </group>
}
