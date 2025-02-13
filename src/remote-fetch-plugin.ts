import { dirname, extname, join } from 'jsr:@std/path@1.0.8'
import {
  type OnLoadArgs,
  type OnLoadResult,
  type OnResolveArgs,
  type OnResolveResult,
  type Plugin,
  type PluginBuild,
} from './types.d.ts'

function jsrToEsm(path: string) {
  const url = new URL(`/jsr/${path.slice(4)}`, 'https://esm.sh/')
  url.searchParams.set('target', 'esnext')
  return url.href
}

function npmToEsm(path: string) {
  const url = new URL(`/${path.slice(4)}`, 'https://esm.sh/')
  url.searchParams.set('target', 'esnext')
  return url.href
}

export function remoteFetchPlugin(): Plugin {
  return {
    name: 'remote-fetch',
    setup({ onResolve, onLoad }: PluginBuild) {
      onResolve(
        { filter: /^(https?:|npm:|jsr:)/ },
        (args: OnResolveArgs): OnResolveResult => {
          // NOTE: this does not deal with `node:` imports and I do not plan to implement this
          let path = args.path
          if (args.path.startsWith('jsr:')) {
            path = jsrToEsm(args.path)
          } else if (args.path.startsWith('npm:')) {
            path = npmToEsm(args.path)
          }

          return ({
            path,
            namespace: 'remote-fetch',
          })
        },
      ),
        onResolve(
          { filter: /.*/, namespace: 'remote-fetch' },
          (args: OnResolveArgs) => {
            // NOTE: if there is a path inside an external module which uses an absolute import,
            // simply joining as if it were relative does not work.
            if (args.path.startsWith('/')) {
              const url = new URL(args.importer)
              url.pathname = args.path
              return {
                path: url.href,
                namespace: 'remote-fetch',
              }
            }

            const importerDir = dirname(args.importer)
            const relativePath = args.path

            return {
              path: join(importerDir, relativePath),
              namespace: 'remote-fetch',
            }
          },
        ),
        onLoad(
          { filter: /.*/, namespace: 'remote-fetch' },
          async (args: OnLoadArgs): Promise<OnLoadResult> => {
            const url = new URL(args.path)
            const res = await fetch(url.href)
            const contents = await res.text()
            return { contents, loader: determineLoaderFromPath(args.path) }
          },
        )
    },
  }
}

function determineLoaderFromPath(pathString: string) {
  switch (extname(pathString)) {
    case '.tsx':
      return 'tsx'
    case '.ts':
      return 'ts'
    case '.css':
      if (pathString.endsWith('module.css')) {
        return 'local-css'
      }
      return 'css'
    case '.jsx':
      return 'jsx'
    default:
      return 'js'
  }
}
