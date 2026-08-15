import type { StudioPose } from '../../lib/studioRigState'

export const STUDIO_RIG_CAPTURE_REQUEST_EVENT = 'meshvara:studio-rig-capture-request'
export const STUDIO_RIG_CAPTURE_RESULT_EVENT = 'meshvara:studio-rig-capture-result'

export interface StudioRigCaptureRequestDetail {
  nodeId: string
  requestId: string
  name: string
}

export interface StudioRigCaptureResultDetail {
  nodeId: string
  requestId: string
  pose: StudioPose
}

function requestId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `rig-capture-${crypto.randomUUID()}`
  return `rig-capture-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function createStudioRigCaptureRequest(nodeId: string, name: string): StudioRigCaptureRequestDetail {
  return { nodeId, requestId: requestId(), name: name.trim().slice(0, 80) || 'Pose' }
}

export function dispatchStudioRigCaptureRequest(detail: StudioRigCaptureRequestDetail) {
  window.dispatchEvent(new CustomEvent<StudioRigCaptureRequestDetail>(STUDIO_RIG_CAPTURE_REQUEST_EVENT, { detail }))
}

export function dispatchStudioRigCaptureResult(detail: StudioRigCaptureResultDetail) {
  window.dispatchEvent(new CustomEvent<StudioRigCaptureResultDetail>(STUDIO_RIG_CAPTURE_RESULT_EVENT, { detail }))
}

export function onStudioRigCaptureRequest(handler: (detail: StudioRigCaptureRequestDetail) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<StudioRigCaptureRequestDetail>).detail)
  window.addEventListener(STUDIO_RIG_CAPTURE_REQUEST_EVENT, listener)
  return () => window.removeEventListener(STUDIO_RIG_CAPTURE_REQUEST_EVENT, listener)
}

export function onStudioRigCaptureResult(handler: (detail: StudioRigCaptureResultDetail) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<StudioRigCaptureResultDetail>).detail)
  window.addEventListener(STUDIO_RIG_CAPTURE_RESULT_EVENT, listener)
  return () => window.removeEventListener(STUDIO_RIG_CAPTURE_RESULT_EVENT, listener)
}
