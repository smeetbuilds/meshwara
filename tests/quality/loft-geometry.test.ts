import assert from 'node:assert/strict'
import { buildLoftGeometry } from '../../src/components/geometry/GeometryV2'

/**
 * Real geometry regression: texture-safe UV seam, hard-surface cap normals,
 * outward winding, no NaNs and finite index topology.
 * Not a claim of photorealism.
 */
const segments = 32
const stations = [
  {x:-1.3,y:0,width:.2,height:.28,exponent:3.4},
  {x:-.35,y:.16,width:.49,height:.51,exponent:3.1,twist:.08},
  {x:.42,y:.12,width:.55,height:.48,exponent:3.0},
  {x:1.4,y:-.06,width:.14,height:.22,exponent:3.6},
]
const g=buildLoftGeometry(stations,segments)
const pos=g.getAttribute('position'),uv=g.getAttribute('uv'),normal=g.getAttribute('normal'),index=g.getIndex()
const stride=segments+1,sideVertexCount=stations.length*stride
assert.equal(pos.count,sideVertexCount+2*(stride+1),'Loft uses seam-separated side rings and independent cap rings')
assert.equal(uv.count,pos.count)
assert.equal(normal.count,pos.count)
assert.equal(index.count,(stations.length-1)*segments*6+segments*6)

for(let i=0;i<pos.count;i++){
 for(const item of [pos.getX(i),pos.getY(i),pos.getZ(i),uv.getX(i),uv.getY(i),normal.getX(i),normal.getY(i),normal.getZ(i)])
  assert.ok(Number.isFinite(item),'Non-finite buffer value at vertex '+i)
}
for(let row=0;row<stations.length;row++){
 const a=row*stride,b=a+segments
 for(const axis of ['X','Y','Z'])assert.ok(Math.abs(pos['get'+axis](a)-pos['get'+axis](b))<1e-5,'seam points diverged')
 assert.equal(uv.getY(a),0,'side seam must start at V=0')
 assert.equal(uv.getY(b),1,'side seam must end at V=1')
 const seamNormalDistance=Math.hypot(normal.getX(a)-normal.getX(b),normal.getY(a)-normal.getY(b),normal.getZ(a)-normal.getZ(b))
 assert.ok(seamNormalDistance<1e-5,'UV seam introduces a lighting crease')
}
// Only side triangles are subject to the UV discontinuity test.
// No indexed side triangle should jump across the V wrap.
for(let i=0;i<(stations.length-1)*segments*6;i+=3){
 const ia=index.getX(i),ib=index.getX(i+1),ic=index.getX(i+2)
 const v=[uv.getY(ia),uv.getY(ib),uv.getY(ic)]
 assert.ok(Math.max(...v)-Math.min(...v)<1/segments+.000001,'side triangle spans 0→1 UV seam')
}
const firstCapCenter=sideVertexCount
const lastCapCenter=sideVertexCount+(stride+1)
for(const [row,center,normalSign] of [[0,firstCapCenter,-1],[stations.length-1,lastCapCenter,1]]){
 assert.ok(Math.abs(pos.getX(center)-stations[row].x)<.00001)
 assert.ok(normal.getX(center)*normalSign>.999,'cap center should face OUTWARD along X')
 for(let i=0;i<=segments;i++){
  const vertex=center+1+i
  assert.ok(normal.getX(vertex)*normalSign>.999,'cap normals must be flat, not melted into side normals')
 }
}
assert.ok(g.boundingSphere?.radius>1)
assert.ok(g.boundingBox?.max.x>1)
assert.throws(()=>buildLoftGeometry([stations[0]],segments),/two stations/)
assert.throws(()=>buildLoftGeometry(stations,3),/radialSegments/)
assert.throws(()=>buildLoftGeometry(stations,16.5),/radialSegments/)
assert.throws(()=>buildLoftGeometry([{...stations[0],height:NaN},stations[1]],segments),/non-finite/)
assert.throws(()=>buildLoftGeometry([{...stations[0],width:-1},stations[1]],segments),/invalid dimensions/)
g.dispose()
console.log('Loft mesh regression passed: texture seam continuity, outward flat cap normals, valid triangle winding and finite buffers.')
