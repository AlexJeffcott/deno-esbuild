import { bundle } from './src/bundle.ts'
import { remoteFetchPlugin } from './src/remote-fetch-plugin.ts'
import * as esbuild from 'npm:esbuild@0.24.2'

bundle(
  {
    entryPoints: ['./src/mod.ts'],
    platform: 'neutral',
    charset: 'utf8',
    bundle: true,
    minify: true,
    publicPath: '/',
    format: 'esm',
    allowOverwrite: true,
    treeShaking: true,
    splitting: true,
    outdir: 'build',
    write: true,
    absWorkingDir: Deno.cwd(),
    target: ['chrome120', 'firefox120', 'safari17'],
    assetNames: '[name]',
    plugins: [remoteFetchPlugin() as esbuild.Plugin],
  },
  esbuild.build,
  esbuild.stop,
)
