import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { StudioInspector as StudioInspectorCore } from './StudioInspectorCore'
import { StudioRigPanel } from './StudioRigPanel'
import '../../styles/studio-rig.css'
import { addStudioPose, resolveStudioRig, type StudioRigInspection, type StudioRigState } from '../../lib/studioRigState'
import { updateStudioNode } from '../../lib/studioProject'
import type { StudioModelInspection } from '../../lib/studioModelTools'
import {
  createStudioRigCaptureRequest,
  dispatchStudioRigCaptureRequest,
  onStudioRigCaptureResult,
} from './studioRigEvents'

// Keep the production Inspector API intact while widening node patches to include the rig state added by the project facade.
type CoreProps = ComponentProps<typeof StudioInspectorCore>
type StudioInspectorProps = Omit<CoreProps, 'onNodePatch'> & {
  onNodePatch: (patch: Parameters<typeof updateStudioNode>[2]) => void
}

type InspectionWithRig = StudioModelInspection & { rig?: StudioRigInspection }

export function StudioInspector({ node, inspection, onNodePatch, ...coreProps }: StudioInspectorProps) {
  const [rigStatus, setRigStatus] = useState('LOCAL RIG STATE · READY')
  const pendingCapture = useRef<string | null>(null)
  const rigInspection = (inspection as InspectionWithRig | undefined)?.rig

  useEffect(() => onStudioRigCaptureResult((result) => {
    if (!node || result.nodeId !== node.id || result.requestId !== pendingCapture.current) return
    pendingCapture.current = null
    const rig = addStudioPose(resolveStudioRig(node.rig), result.pose)
    onNodePatch({ rig })
    setRigStatus(`POSE CAPTURED · ${result.pose.name.toUpperCase()} · UNDO AVAILABLE`)
  }), [node, onNodePatch])

  const capturePose = (name: string) => {
    if (!node || node.kind !== 'imported' || !rigInspection?.bones.length) {
      setRigStatus('POSE CAPTURE REQUIRES A LOADED RIGGED GLB')
      return
    }
    const request = createStudioRigCaptureRequest(node.id, name)
    pendingCapture.current = request.requestId
    dispatchStudioRigCaptureRequest(request)
  }

  const patchRig = (rig: StudioRigState) => {
    if (!node || node.kind !== 'imported') return
    onNodePatch({ rig })
    setRigStatus('RIG / POSE STATE UPDATED · UNDO AVAILABLE')
  }

  return (
    <div className="studio-inspector-stack">
      <StudioInspectorCore
        {...coreProps}
        node={node}
        inspection={inspection}
        onNodePatch={onNodePatch as CoreProps['onNodePatch']}
      />
      <StudioRigPanel
        node={node}
        inspection={rigInspection}
        onChange={patchRig}
        onCapture={capturePose}
        onStatus={setRigStatus}
      />
      {node?.kind === 'imported' ? <p className="studio-rig-status" role="status" aria-live="polite">{rigStatus}</p> : null}
    </div>
  )
}
