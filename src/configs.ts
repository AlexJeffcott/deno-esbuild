import { importMapPlugin } from './import-map-plugin.ts'
import { remoteFetchPlugin } from './remote-fetch-plugin.ts'
import { localFileLoaderPlugin } from './local-file-loader-plugin.ts'
// import { relativePathResolverPlugin } from './relative-path-resolver-plugin.ts'
import * as path from 'jsr:@std/path@1.0.8'
import { load } from 'jsr:@std/dotenv@0.225.3'
import { type BuildOptions } from './types.d.ts'

function generateBuildId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// configPath: await Deno.realPath('./deno.json') ????
const baseDir: string = Deno.cwd()

export const define = async (
  mode: 'prod' | 'dev',
  targetPlatform: 'deno' | 'browser',
  envPath?: string,
): Promise<BuildOptions['define']> => {
  await load({ envPath, export: true })
  const buildId = generateBuildId()
  Deno.env.set('BUILD_ID', buildId)
  Deno.env.set('MODE', mode)

  return ({
    'globalThis.Deno': targetPlatform === 'deno' ? 'true' : 'false',
    'globalThis.ENV': JSON.stringify(Deno.env.toObject()), // you can access the build mode via `globalThis.ENV`
  })
}

export const getBaseConfig = (
  mode: 'prod' | 'dev',
  targetPlatform: 'deno' | 'browser',
): BuildOptions => ({
  platform: 'neutral',
  charset: 'utf8',
  bundle: true,
  minify: true,
  publicPath: '/',
  format: 'esm',
  allowOverwrite: true,
  treeShaking: true,
  splitting: true,
  outdir: './build',
  write: false,
  sourcemap: 'linked' as const,
  absWorkingDir: baseDir, // NOT SURE I NEED THIS
  pure: mode === 'prod' ? ['console.debug', 'console.assert'] : [],
  target: targetPlatform === 'deno'
    ? ['esnext']
    : ['chrome120', 'firefox120', 'safari17'],
  assetNames: '[name]', // this means that the .woff2 files will not have a hash so it is easy to reference them in the .html
  loader: {
    '.png': 'file',
    '.woff2': 'file',
    '.webmanifest': 'file',
    '.ico': 'file',
  },
})

export function getImportMapPathWithFileName(fileName: string): URL {
  return path.toFileUrl(baseDir + '/' + fileName)
}

export const forPreact = async (
  overrides: BuildOptions,
  importMapFileName: 'import_map.json' | 'deno.json' | 'deno.jsonc',
  mode: 'prod' | 'dev',
  targetPlatform: 'deno' | 'browser',
  envPath?: string,
): Promise<BuildOptions> => ({
  ...getBaseConfig(mode, targetPlatform),
  define: await define(mode, targetPlatform, envPath),
  jsx: 'automatic' as const,
  jsxImportSource: 'preact' as const,
  ...overrides,
  plugins: [
    importMapPlugin({
      importMapFileUrl: getImportMapPathWithFileName(importMapFileName),
    }),
    localFileLoaderPlugin(),
    remoteFetchPlugin(),
  ],
})
