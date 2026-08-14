import type { WebGLRenderer } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

export const STUDIO_DRACO_DECODER_PATH = '/codecs/draco/'
export const STUDIO_BASIS_TRANSCODER_PATH = '/codecs/basis/'

const dracoLoader = new DRACOLoader()
  .setDecoderPath(STUDIO_DRACO_DECODER_PATH)
  .setWorkerLimit(2)

const ktxLoaders = new WeakMap<WebGLRenderer, KTX2Loader>()

function ktxLoaderFor(renderer: WebGLRenderer) {
  const existing = ktxLoaders.get(renderer)
  if (existing) return existing
  const loader = new KTX2Loader()
    .setTranscoderPath(STUDIO_BASIS_TRANSCODER_PATH)
    .setWorkerLimit(2)
  loader.detectSupport(renderer)
  ktxLoaders.set(renderer, loader)
  return loader
}

/**
 * Configures Three's GLTFLoader for Meshvara's offline/same-origin codec contract.
 * Draco and Basis worker assets are emitted to /public/codecs from the pinned Three
 * dependency; Meshopt is bundled as an ESM dependency by the application build.
 */
export function configureStudioGltfLoader(loader: GLTFLoader, renderer: WebGLRenderer) {
  loader.setDRACOLoader(dracoLoader)
  loader.setMeshoptDecoder(MeshoptDecoder)
  loader.setKTX2Loader(ktxLoaderFor(renderer))
  return loader
}
