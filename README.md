# Deno-Esbuild

## WIP: The missing bundler for Deno

## NOT READY

### Current discussion

I wish to publish this package targeted at Deno deploy users on jsr, but
unfortunately there are issues with this:

1. jsr only allows jsr and npm network imports in jsr packages.
2. esbuild does not publish to jsr, only to deno/land and npm.
3. the types for esbuild on deno/land are different from those on npm.
4. esbuild-wasm on npm contains code that needs --allow-run, which is not
   possible on deno deploy.

Compounding all this is that jsr penalizes packages for having 'slow types' -
those not defined in-line.

Even worse, jsr-style imports do not work in the browser.

I do not wish to vendor the whole of the deno/land esbuild wasm package, for
some reason, so my solution for all this, until such time as I think of
something better or these kinks are worked out, is to have the user pass in
whatever esbuild jazz they want, and to 'vendor' the types in each of the
modules which are specialised to the particular use-case.

### Examples

```
import {
  bundleInDenoDeploy,
  forPreact
} from 'deno-esbuild'
import * as esbuild from "https://deno.land/x/esbuild@v0.24.0/wasm.js"

const cfg = await forPreact({
    entryPoints: ['./src/main.tsx'],
    write: false,
  }, 'deno.jsonc', 'dev', 'browser', '.env')

const result = await bundleInDenoDeploy(cfg, esbuild)

console.log(result)
```

### Aims

- Complete: To provide the missing pieces needed to use Deno for your own web
  projects.
- Simple: a couple of targeted esbuild plugins and composable configurations is
  all you need.

If you want to build a performant website with JSX and Deno, you should probably
just use Fresh. It is fast and powerful and a great choice when you have a
normal website to build.

If you want to build an application using web techs that goes beyond a normal
website, then Fresh may not be the best choice. For example, if you will need to
use Shared Workers, IndexedDB, WebSockets and a Rust WASM for encryption to
fulfill the aims of the project.

### Philosophy

- implementation should be small and easy to understand.
- usage should be clean and easy to understand.
- defaults are likely all that is needed, but intuitive escape hatches are
  provided - not work-arounds or hacks.
- fast builds are great, but speed is not everything.
- HMR is a scam.

### Strong opinions, lightly held.

Typescript Javascript Modules only Preact or React or
[Hono/jsx](https://hono.dev/guides/jsx) or
[Million.js](https://million.dev/blog/virtual-dom) css-modules JSON imports png
and jpg assets svg as components mdx

Can bundle in environments which have no file system access. Can output assets
as files and put them on the file system to be uploaded to a CDN, physical
server, or whatever. Can create assets to be held in memory and served directly.

### Prerequisites

- vscode
- deno extension

### steps

#### Basic setup

```shell
mkdir deno-esbuild && cd $_
mkdir bin src
git init
git branch -m main
code .
```

```
cmd + shift + p
deno: enable
```

```shell
deno init
rm -f main*
touch src/main.ts
```

- Add a `.vscode/recommendations.json`

```json
{
  "recommendations": ["denoland.vscode-deno"]
}
```

- Add a `.gitignore`

```
.DS_Store
```

- Edit `deno.jsonc` to be

```json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["deno.ns", "webworker", "dom", "dom.iterable", "dom.asynciterable"],
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "useUnknownInCatchVariables": true
  },
  "lint": {
    "include": ["src/, bin/"],
    "rules": {
      "tags": ["recommended"],
      "include": ["no-non-null-assertion"]
    }
  },
  "fmt": {
    "semiColons": false,
    "singleQuote": true
  },
  "nodeModulesDir": false,
  "lock": false,
  "test": {
    "include": ["src/"]
  },
  "tasks": {
    "start": "deno run --allow-read src/main.ts"
  },
  "imports": {
    "@/": "./src/",
    "std/": "https://deno.land/std@0.220.1/",
    "esbuild-wasm": "https://deno.land/x/esbuild@v0.24.0/wasm.js",
    "esbuild": "https://deno.land/x/esbuild@v0.24.0/mod.js",
    "hono/": "jsr:@hono/hono@^4.6.1/",
    "preact": "https://esm.sh/*preact@10.24.2",
    "preact/": "https://esm.sh/*preact@10.24.2/",
    "@preact/signals": "https://esm.sh/*@preact/signals@1.2.2",
    "@preact/signals-core": "https://esm.sh/*@preact/signals-core@1.5.1"
  }
}
```

### Structure

#### Folders by execution context

When building web applications there is a real and hard boundary between
execution contexts that is best made explicit. I feel that the decision of the
React team to blur these lines by enabling patterns of server-side code in
client-side code is a mistake, as is the decision to adopt such patterns.

Code which accesses the window object will not work in a server environment.
Using Deno or Node to access the filesystem will not work in the browser. There
are similar examples of mutually exclusive objects in Worker contexts too.

Additionally, if I instantiate a class in a lib and then import that object in
two modules that end up in the same execution context (in the server bundle, for
example), then they will be accessing the same object. If, on the other hand,
those two modules end up in different bundles they will be accessing different
objects.

The way we structure our application should make it very easy to avoid these
pitfalls, and very hard to fall into them.

#### `mod.ts`

`mod.ts` files are used as export gathering modules. These should be used when
you will want to import all the elements. You shouldn't use this to export all
the context-agnostic-libs from the root dir, for example, as this could create
an unnecessarily large module graph.

#### `main.ts?x`

`main.ts` or `main.tsx` files are entry points for executable code. These are
targeted to be independent entry-points for esbuild - separate bundles.

First off, apologies if this is not the right place for this. If there is a
better place, tell me and I will remove this and head there.

Similarly, if there is an existing active discussion on this, I will gladly head
there.

I like Deno a lot but there is unnecessary friction and pain for web projects
because of bundling. I should not need to be knowledgeable and skilled in
creating esbuild plugins to use Deno for a web app.

I know there was a lot of discussion around this feature being 'batteries
included', and I personally think it was as big a misstep to remove it rather
than doubling-down on it, as to not have NPM compatibility as a priority for the
get-go, and I suspect that Bun will profit / capitalise on this, but that is
just my inconsequential opinion.

That ship has sailed for Deno, but there could be a middle way. The defacto
bundler for Deno projects is esbuild, even though the maintainer does not
particularly support Deno and I suspect would not advise it for most use-cases
(that is just my impression from reading the docs and issues, though). If you
want to use esbuild with Deno you need to use plugins for it to work at all
because esbuild assumes that imports work like node, not Deno / the browser.

Judging from the best and best-maintained plugin which is maintained by a single
Deno core-team member on their personal github account, this is not at all a
trivial task to fully support all the things like 'npm:' resolution even though
it is fairly simple to get 80% there. The release cadence on the project is
sadly sporadic and issues / pull requests are largely seemingly ignored. It has
not supported the latest version of esbuild since around June.

To be clear, this is in no way a dig at that project or the maintainer - it is
wonderful that people who are way mor knowledgeable and smarter than me are
doing such work and making it available so we too can benefit from their hard
work and abilities.

It is frustrating that I want to use it, and would find it useful but cannot
because it has a single maintainer and is feels unreliable. It is more of a
comment that this project, or one like it, should be under the auspices of Deno
(I mean official, rather than inside Deno, if that makes sense).

So finally, to my question:

Why is there no properly maintained official esbuild plugin with full and useful
documentation aimed at Deno users? This would bridge the gap between wanting to
use Deno in a web app project and actually using it.
