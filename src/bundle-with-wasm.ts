import {
  type Build,
  type BuildOptions,
  type BuildResult,
  type Initialize,
  type InitializeOptions,
  type Stop,
} from './types.d.ts'
import { delay } from 'jsr:@std/async@1.0.9'

type BundleResult = [
  (opts: {
    wasmURL: InitializeOptions['wasmURL']
    worker: InitializeOptions['worker']
  }) => Promise<void>,
  () => Promise<void>,
  () => Promise<BuildResult>,
]

export function bundleWithWasm(
  config: BuildOptions,
  build: Build,
  stop: Stop,
  initialize: Initialize,
): BundleResult {
  let started: Promise<void> | undefined
  async function starter(opts: {
    wasmURL: InitializeOptions['wasmURL']
    worker: InitializeOptions['worker']
  }) {
    if (!started) {
      started = initialize(opts)
    }

    return await started
  }

  let stopped: Promise<void> | undefined
  async function stopper() {
    if (!stopped) {
      stopped = stop()
    }

    await stopped
    await delay(10)
  }

  return [starter, stopper, () => build(config)]
}
