import { ExtrudedProfile, LoftSurface, SplineTube, type LoftStation } from '../geometry/GeometryV2'
const basket:LoftStation[]=[{x:-.78,width:.42,height:.3,y:-.08,exponent:3},{x:-.4,width:.52,height:.4,exponent:3.4},{x:.4,width:.52,height:.4,exponent:3.4},{x:.78,width:.42,height:.3,y:-.08,exponent:3}]
const rim:Array<[number,number,number]>=[[-.78,.38,.34],[-.38,.48,.48],[.4,.48,.48],[.78,.38,.34]]
const loaf:LoftStation[]=[{x:-.42,width:.18,height:.16},{x:0,width:.28,height:.24,y:.03,exponent:2.5},{x:.42,width:.17,height:.15}]
export default function ArtisanBreadBasket(){return <group position={[0,-.5,0]} rotation={[0,-.3,0]}>
 <LoftSurface stations={basket}><meshPhysicalMaterial color="#9b704b" roughness={.72} sheen={.18}/></LoftSurface>
 <SplineTube points={rim} radius={.035}><meshStandardMaterial color="#6e4b35" roughness={.82}/></SplineTube>
 {[-.3,-.1,.1,.3].map((y,i)=><SplineTube key={i} points={[[-.7,y,.36],[-.25,y+.04,.5],[.3,y+.02,.5],[.7,y,.36]]} radius={.018}><meshStandardMaterial color={i%2?"#7f573b":"#ad8159"} roughness={.82}/></SplineTube>)}
 {[[-.32,.5,.03],[.2,.48,.05],[.02,.7,-.16]].map((p,i)=><group key={i} position={p as [number,number,number]} rotation={[0,(i-1)*.12,0]}><LoftSurface stations={loaf}><meshStandardMaterial color={i===0?"#b67848":i===1?"#c28752":"#a96940"} roughness={.72}/></LoftSurface>{[-.18,0,.18].map((x,j)=><ExtrudedProfile key={j} points={[[-.08,-.01],[.08,-.01],[.06,.018],[-.06,.018]]} depth={.015} position={[x,.2,.16]}><meshStandardMaterial color="#e2b87b" roughness={.68}/></ExtrudedProfile>)}</group>)}
 <LoftSurface stations={[{x:-.92,width:.5,height:.05},{x:0,width:.98,height:.08},{x:.92,width:.48,height:.05}]} position={[0,-.38,0]}><meshStandardMaterial color="#66533f" roughness={.94}/></LoftSurface>

 <SplineTube points={[[-.6,.22,-.38],[-.18,.28,-.5],[.32,.26,-.48],[.62,.2,-.34]]} radius={.016}><meshStandardMaterial color="#c09a70" roughness={.76}/></SplineTube>
</group>}
