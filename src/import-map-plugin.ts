import * as path from 'jsr:@std/path@1.0.8'
import {
  type OnResolveArgs,
  type OnResolveResult,
  type Plugin,
  type PluginBuild,
} from './types.d.ts'

type Config = { importMapFileUrl: URL }

type ImportMap = Record<string, string>
let importMap = {}

export function importMapPlugin({ importMapFileUrl }: Config): Plugin {
  return {
    name: 'importMap',
    setup({ onResolve, onStart }: PluginBuild) {
      onStart(async () => {
        const { imports } = await fetch(importMapFileUrl)
          .then((res) => res.json())
          .catch(console.error)

        importMap = imports || {}
      }),
        onResolve(
          { filter: /.*/ },
          (args: OnResolveArgs): (OnResolveResult) | undefined => {
            const importMapResolvedPath = importMapResolver(
              importMap,
              args.path,
            )
            if (/^(https?:|npm:|jsr:)/.test(importMapResolvedPath)) {
              return { path: importMapResolvedPath, namespace: 'remote-fetch' }
            } else if (/^(https?:|npm:|jsr:)/.test(args.importer)) {
              const url = new URL(args.path, args.importer)
              return {
                path: path.isAbsolute(args.path)
                  ? url.href
                  : path.join(args.importer, args.path),
                namespace: 'remote-fetch',
              }
            }
            if (importMapResolvedPath === args.path) {
              return
            } else {
              return {
                path: path.resolve(importMapResolvedPath),
                namespace: 'file',
              }
            }
          },
        )
    },
  }
}

function importMapResolver(
  imports: ImportMap,
  specifier: string,
): string {
  for (const [key, value] of Object.entries(imports)) {
    if (key.endsWith('/') && specifier.startsWith(key)) {
      return value + specifier.slice(key.length)
    }

    if (specifier === key) {
      return value
    }
  }
  return specifier
}
