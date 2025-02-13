import {
  type Build,
  type BuildOptions,
  type BuildResult,
  type Stop,
} from './types.d.ts'

// NOTE: bundle({entryPoints: ["./bin/start.ts"]})
export async function bundle(
  config: BuildOptions,
  build: Build,
  stop: Stop,
): Promise<BuildResult> {
  try {
    return await build(config)
  } finally {
    await stop()
  }
}
