import esbuildWasm from 'npm:esbuild-wasm@0.25.0/lib/main.d.ts'
import esbuild from 'npm:esbuild@0.25.0/lib/main.d.ts'

export type OnLoadArgs = esbuild.OnLoadArgs | esbuildWasm.OnLoadArgs
export type OnLoadResult = esbuild.OnLoadResult | esbuildWasm.OnLoadResult
export type OnResolveArgs = esbuild.OnResolveArgs | esbuildWasm.OnResolveArgs
export type OnResolveResult =
  | esbuild.OnResolveResult
  | esbuildWasm.OnResolveResult
export type Plugin = esbuild.Plugin | esbuildWasm.Plugin
export type PluginBuild = esbuild.PluginBuild | esbuildWasm.PluginBuild
export type Loader = esbuild.Loader | esbuildWasm.Loader
export type BuildOptions = esbuild.BuildOptions | esbuildWasm.BuildOptions
export type BuildResult =
  | esbuild.BuildResult<esbuild.BuildOptions>
  | esbuildWasm.BuildResult<esbuildWasm.BuildOptions>
export type Stop = typeof esbuild.stop | typeof esbuildWasm.stop
export type Build = typeof esbuild.build | typeof esbuildWasm.build
export type Initialize =
  | typeof esbuild.initialize
  | typeof esbuildWasm.initialize
export type InitializeOptions =
  | esbuild.InitializeOptions
  | esbuildWasm.InitializeOptions
