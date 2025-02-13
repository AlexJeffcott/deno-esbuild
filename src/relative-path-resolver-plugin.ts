import * as path from 'jsr:@std/path@1.0.6'
import {
  type OnResolveArgs,
  type OnResolveResult,
  type Plugin,
  type PluginBuild,
} from './types.d.ts'

type Config = {
  baseDir: string
}

// IS THIS EVEN USED?
export function relativePathResolverPlugin({ baseDir }: Config): Plugin {
  return {
    name: 'relativePathResolverPlugin',
    setup({ onResolve }: PluginBuild) {
      onResolve(
        { filter: /^\.\//, namespace: 'importMap' },
        (args: OnResolveArgs): OnResolveResult | undefined => {
          // console.log('\n relative resolve: ', args.path)
          if (args.kind === 'entry-point') {
            return urlToEsbuildResolution(
              path.toFileUrl(path.resolve(baseDir, args.path)),
            )
          } else if (args.kind === 'import-statement') {
            return urlToEsbuildResolution(
              path.toFileUrl(path.resolve(args.resolveDir, args.path)),
            )
          }
        },
      )
    },
  }
}

function urlToEsbuildResolution(url: URL) {
  if (url.protocol === 'file:') {
    return { path: path.fromFileUrl(url), namespace: 'file' }
  }

  const namespace = url.protocol.slice(0, -1)
  return { path: url.href.slice(namespace.length + 1), namespace }
}
