import * as paths from 'jsr:@std/path@1.0.8'
import {
  type Loader,
  type OnLoadArgs,
  type OnLoadResult,
  type OnResolveArgs,
  type OnResolveResult,
  type Plugin,
  type PluginBuild,
} from './types.d.ts'

export function localFileLoaderPlugin(): Plugin {
  return {
    name: 'localFileLoaderPlugin',
    setup({ onResolve, onLoad }: PluginBuild) {
      // NOTE: this resolver runs if no other resolver, in a different plugin, has resolved the relative path.
      // for example, by an import-map resolver plugin
      onResolve(
        { filter: /^\.?\// },
        (args: OnResolveArgs): OnResolveResult => {
          return ({
            path: paths.resolve(args.resolveDir || args.importer, args.path),
          })
        }, // NOTE: by using the resolveDir || importer it takes care of imports and entry-points
      ),
        onLoad(
          { filter: /^\.?\//, namespace: 'file' },
          async (args: OnLoadArgs): Promise<OnLoadResult | undefined> => {
            if (!/^(https?:|npm:|jsr:)/.test(args.path)) {
              const ext = paths.extname(args.path)
              const fp = paths.toFileUrl(args.path)
              const contents = await fetch(fp).then((res) => res.text())
              // I don't know why I did this, but it caused issues with importing woff2 in css files
              // if (initialOptions.loader && initialOptions.loader[ext]) {
              //   return
              // }
              let loader: Loader = 'default'
              if (ext === '.css' && args.path.includes('.module.css')) {
                loader = 'local-css'
              }
              return { contents, loader }
            }
          },
        )
    },
  }
}
