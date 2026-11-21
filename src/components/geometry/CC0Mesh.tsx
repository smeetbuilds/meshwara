import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

/** Same-origin authored GLB with its embedded original CC0 PBR maps. */
export function CC0Mesh({
 url, maxSize = 2.6, rotation = [0, -.28, 0], position = [0, -.1, 0], clearOpticalLenses = false,
}: {
 url: string
 maxSize?: number
 rotation?: [number,number,number]
 position?: [number,number,number]
 clearOpticalLenses?: boolean
}) {
 const {scene} = useGLTF(url)
 const prepared=useMemo(()=>{
  const object=scene.clone(true)
  object.updateMatrixWorld(true)
  const box=new THREE.Box3().setFromObject(object)
  const extent=box.getSize(new THREE.Vector3())
  const center=box.getCenter(new THREE.Vector3())
  const axis=Math.max(extent.x,extent.y,extent.z)
  if(!Number.isFinite(axis)||axis<1e-6)throw Error('Malformed CC0 model bounds: '+url)
  const scale=maxSize/axis
  object.traverse(child=>{
   if(!(child instanceof THREE.Mesh))return
   child.castShadow=true
   child.receiveShadow=true
   if(clearOpticalLenses){
    const clear=(material: THREE.Material): THREE.Material=>{
     if(!(material instanceof THREE.MeshPhysicalMaterial) || !material.name.includes('spectacles_glass'))return material
     // Source GLB includes transmission, but a black tint map made the lenses
     // render as opaque sunglasses. Preserve geometry, replace only the glass.
     const lens=material.clone()
     lens.map=null
     lens.roughnessMap=null
     lens.metalnessMap=null
     lens.color.set('#d5e4ee')
     lens.metalness=0
     lens.roughness=.075
     lens.transmission=.18
     lens.ior=1.5
     lens.thickness=.008
     lens.transparent=true
     lens.opacity=.32
     lens.depthWrite=false
     lens.clearcoat=.6
     return lens
    }
    child.material=Array.isArray(child.material)?child.material.map(clear):clear(child.material)
   }
  })
  return {object,scale,offset:[-center.x*scale,-1.48-position[1]-box.min.y*scale,-center.z*scale] as [number,number,number]}
 },[scene,url,maxSize,position[1],clearOpticalLenses])
 return <group rotation={rotation} position={position}>
   <primitive object={prepared.object} scale={prepared.scale} position={prepared.offset}/>
 </group>
}
