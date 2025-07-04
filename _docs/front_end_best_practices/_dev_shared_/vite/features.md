eatures

At the very basic level, developing using Vite is not that different from using a static file server. However, Vite provides many enhancements over native ESM imports to support various features that are typically seen in bundler-based setups.
npm Dependency Resolving and Pre-Bundling

Native ES imports do not support bare module imports like the following:

import { someMethod } from 'my-dep'

The above will throw an error in the browser. Vite will detect such bare module imports in all served source files and perform the following:

    Pre-bundle them to improve page loading speed and convert CommonJS / UMD modules to ESM. The pre-bundling step is performed with esbuild and makes Vite's cold start time significantly faster than any JavaScript-based bundler.

    Rewrite the imports to valid URLs like /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd so that the browser can import them properly.

Dependencies are Strongly Cached

Vite caches dependency requests via HTTP headers, so if you wish to locally edit/debug a dependency, follow the steps here.
Hot Module Replacement

Vite provides an HMR API over native ESM. Frameworks with HMR capabilities can leverage the API to provide instant, precise updates without reloading the page or blowing away application state. Vite provides first-party HMR integrations for Vue Single File Components and React Fast Refresh. There are also official integrations for Preact via @prefresh/vite.

Note you don't need to manually set these up - when you create an app via create-vite, the selected templates would have these pre-configured for you already.
TypeScript

Vite supports importing .ts files out of the box.
Transpile Only

Note that Vite only performs transpilation on .ts files and does NOT perform type checking. It assumes type checking is taken care of by your IDE and build process.

The reason Vite does not perform type checking as part of the transform process is because the two jobs work fundamentally differently. Transpilation can work on a per-file basis and aligns perfectly with Vite's on-demand compile model. In comparison, type checking requires knowledge of the entire module graph. Shoe-horning type checking into Vite's transform pipeline will inevitably compromise Vite's speed benefits.

Vite's job is to get your source modules into a form that can run in the browser as fast as possible. To that end, we recommend separating static analysis checks from Vite's transform pipeline. This principle applies to other static analysis checks such as ESLint.

    For production builds, you can run tsc --noEmit in addition to Vite's build command.

    During development, if you need more than IDE hints, we recommend running tsc --noEmit --watch in a separate process, or use vite-plugin-checker if you prefer having type errors directly reported in the browser.

Vite uses esbuild to transpile TypeScript into JavaScript which is about 20~30x faster than vanilla tsc, and HMR updates can reflect in the browser in under 50ms.

Use the Type-Only Imports and Export syntax to avoid potential problems like type-only imports being incorrectly bundled, for example:

import type { T } from 'only/types'
export type { T }

TypeScript Compiler Options

Some configuration fields under compilerOptions in tsconfig.json require special attention.
isolatedModules

    TypeScript documentation

Should be set to true.

It is because esbuild only performs transpilation without type information, it doesn't support certain features like const enum and implicit type-only imports.

You must set "isolatedModules": true in your tsconfig.json under compilerOptions, so that TS will warn you against the features that do not work with isolated transpilation.

If a dependency doesn't work well with "isolatedModules": true. You can use "skipLibCheck": true to temporarily suppress the errors until it is fixed upstream.
useDefineForClassFields

    TypeScript documentation

The default value will be true if the TypeScript target is ES2022 or newer including ESNext. It is consistent with the behavior of TypeScript 4.3.2+. Other TypeScript targets will default to false.

true is the standard ECMAScript runtime behavior.

If you are using a library that heavily relies on class fields, please be careful about the library's intended usage of it. While most libraries expect "useDefineForClassFields": true, you can explicitly set useDefineForClassFields to false if your library doesn't support it.
target

    TypeScript documentation

Vite ignores the target value in the tsconfig.json, following the same behavior as esbuild.

To specify the target in dev, the esbuild.target option can be used, which defaults to esnext for minimal transpilation. In builds, the build.target option takes higher priority over esbuild.target and can also be set if needed.

useDefineForClassFields

If target in tsconfig.json is not ESNext or ES2022 or newer, or if there's no tsconfig.json file, useDefineForClassFields will default to false which can be problematic with the default esbuild.target value of esnext. It may transpile to static initialization blocks which may not be supported in your browser.

As such, it is recommended to set target to ESNext or ES2022 or newer, or set useDefineForClassFields to true explicitly when configuring tsconfig.json.
Other Compiler Options Affecting the Build Result

    extends
    importsNotUsedAsValues
    preserveValueImports
    verbatimModuleSyntax
    jsx
    jsxFactory
    jsxFragmentFactory
    jsxImportSource
    experimentalDecorators
    alwaysStrict

skipLibCheck

Vite starter templates have "skipLibCheck": "true" by default to avoid typechecking dependencies, as they may choose to only support specific versions and configurations of TypeScript. You can learn more at vuejs/vue-cli#5688.
Client Types

Vite's default types are for its Node.js API. To shim the environment of client side code in a Vite application, add a d.ts declaration file:

/// <reference types="vite/client" />

vite/client provides the following type shims:

    Asset imports (e.g. importing an .svg file)
    Types for the Vite-injected constants on import.meta.env
    Types for the HMR API on import.meta.hot

TIP

To override the default typing, add a type definition file that contains your typings. Then, add the type reference before vite/client.

For example, to make the default import of \*.svg a React component:

    vite-env-override.d.ts (the file that contains your typings):

declare module '\*.svg' {
const content: React.FC<React.SVGProps<SVGElement>>
export default content
}

The file containing the reference to vite/client:

    /// <reference types="./vite-env-override.d.ts" />
    /// <reference types="vite/client" />

HTML

HTML files stand front-and-center of a Vite project, serving as the entry points for your application, making it simple to build single-page and multi-page applications.

Any HTML files in your project root can be directly accessed by its respective directory path:

    <root>/index.html -> http://localhost:5173/
    <root>/about.html -> http://localhost:5173/about.html
    <root>/blog/index.html -> http://localhost:5173/blog/index.html

Assets referenced by HTML elements such as <script type="module" src> and <link href> are processed and bundled as part of the app. The full list of supported elements are as below:

    <audio src>
    <embed src>
    <img src> and <img srcset>
    <image src>
    <input src>
    <link href> and <link imagesrcset>
    <object data>
    <script type="module" src>
    <source src> and <source srcset>
    <track src>
    <use href> and <use xlink:href>
    <video src> and <video poster>
    <meta content>
        Only if name attribute matches msapplication-tileimage, msapplication-square70x70logo, msapplication-square150x150logo, msapplication-wide310x150logo, msapplication-square310x310logo, msapplication-config, or twitter:image
        Or only if property attribute matches og:image, og:image:url, og:image:secure_url, og:audio, og:audio:secure_url, og:video, or og:video:secure_url

<!doctype html>
<html>
  <head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <img src="/src/images/logo.svg" alt="logo" />
    <script type="module" src="/src/main.js"></script>
  </body>
</html>

To opt-out of HTML processing on certain elements, you can add the vite-ignore attribute on the element, which can be useful when referencing external assets or CDN.
Frameworks

All modern frameworks maintain integrations with Vite. Most framework plugins are maintained by each framework team, with the exception of the official Vue and React Vite plugins that are maintained in the vite org:

    Vue support via @vitejs/plugin-vue
    Vue JSX support via @vitejs/plugin-vue-jsx
    React support via @vitejs/plugin-react
    React using SWC support via @vitejs/plugin-react-swc

Check out the Plugins Guide for more information.
JSX

.jsx and .tsx files are also supported out of the box. JSX transpilation is also handled via esbuild.

Your framework of choice will already configure JSX out of the box (for example, Vue users should use the official @vitejs/plugin-vue-jsx plugin, which provides Vue 3 specific features including HMR, global component resolving, directives and slots).

If using JSX with your own framework, custom jsxFactory and jsxFragment can be configured using the esbuild option. For example, the Preact plugin would use:
vite.config.js

import { defineConfig
} from 'vite'

export default defineConfig
({
esbuild
: {
jsxFactory
: 'h',
jsxFragment
: 'Fragment',
},
})

More details in esbuild docs.

You can inject the JSX helpers using jsxInject (which is a Vite-only option) to avoid manual imports:
vite.config.js

import { defineConfig
} from 'vite'

export default defineConfig
({
esbuild
: {
jsxInject
: `import React from 'react'`,
},
})

CSS

Importing .css files will inject its content to the page via a <style> tag with HMR support.
@import Inlining and Rebasing

Vite is pre-configured to support CSS @import inlining via postcss-import. Vite aliases are also respected for CSS @import. In addition, all CSS url() references, even if the imported files are in different directories, are always automatically rebased to ensure correctness.

@import aliases and URL rebasing are also supported for Sass and Less files (see CSS Pre-processors).
PostCSS

If the project contains valid PostCSS config (any format supported by postcss-load-config, e.g. postcss.config.js), it will be automatically applied to all imported CSS.

Note that CSS minification will run after PostCSS and will use build.cssTarget option.
CSS Modules

Any CSS file ending with .module.css is considered a CSS modules file. Importing such a file will return the corresponding module object:
example.module.css

.red {
color: red;
}

import classes
from './example.module.css'
document
.getElementById
('foo').className
= classes
.red

CSS modules behavior can be configured via the css.modules option.

If css.modules.localsConvention is set to enable camelCase locals (e.g. localsConvention: 'camelCaseOnly'), you can also use named imports:

// .apply-color -> applyColor
import { applyColor
} from './example.module.css'
document
.getElementById
('foo').className
= applyColor

CSS Pre-processors

Because Vite targets modern browsers only, it is recommended to use native CSS variables with PostCSS plugins that implement CSSWG drafts (e.g. postcss-nesting) and author plain, future-standards-compliant CSS.

That said, Vite does provide built-in support for .scss, .sass, .less, .styl and .stylus files. There is no need to install Vite-specific plugins for them, but the corresponding pre-processor itself must be installed:

# .scss and .sass

npm add -D sass-embedded # or sass

# .less

npm add -D less

# .styl and .stylus

npm add -D stylus

If using Vue single file components, this also automatically enables <style lang="sass"> et al.

Vite improves @import resolving for Sass and Less so that Vite aliases are also respected. In addition, relative url() references inside imported Sass/Less files that are in different directories from the root file are also automatically rebased to ensure correctness.

@import alias and url rebasing are not supported for Stylus due to its API constraints.

You can also use CSS modules combined with pre-processors by prepending .module to the file extension, for example style.module.scss.
Disabling CSS injection into the page

The automatic injection of CSS contents can be turned off via the ?inline query parameter. In this case, the processed CSS string is returned as the module's default export as usual, but the styles aren't injected to the page.

import './foo.css' // will be injected into the page
import otherStyles
from './bar.css?inline' // will not be injected

NOTE

Default and named imports from CSS files (e.g import style from './foo.css') are removed since Vite 5. Use the ?inline query instead.
Lightning CSS

Starting from Vite 4.4, there is experimental support for Lightning CSS. You can opt into it by adding css.transformer: 'lightningcss' to your config file and install the optional lightningcss dependency:

npm add -D lightningcss

If enabled, CSS files will be processed by Lightning CSS instead of PostCSS. To configure it, you can pass Lightning CSS options to the css.lightningcss config option.

To configure CSS Modules, you'll use css.lightningcss.cssModules instead of css.modules (which configures the way PostCSS handles CSS modules).

By default, Vite uses esbuild to minify CSS. Lightning CSS can also be used as the CSS minifier with build.cssMinify: 'lightningcss'.
Static Assets

Importing a static asset will return the resolved public URL when it is served:

import imgUrl
from './img.png'
document
.getElementById
('hero-img').src = imgUrl

Special queries can modify how assets are loaded:

// Explicitly load assets as URL
import assetAsURL
from './asset.js?url'

// Load assets as strings
import assetAsString
from './shader.glsl?raw'

// Load Web Workers
import Worker
from './worker.js?worker'

// Web Workers inlined as base64 strings at build time
import InlineWorker
from './worker.js?worker&inline'

More details in Static Asset Handling.
JSON

JSON files can be directly imported - named imports are also supported:

// import the entire object
import json
from './example.json'
// import a root field as named exports - helps with tree-shaking!
import { field
} from './example.json'

Glob Import

Vite supports importing multiple modules from the file system via the special import.meta.glob function:

const modules
= import.meta.glob
('./dir/\*.js')

The above will be transformed into the following:

// code produced by vite
const modules = {
'./dir/bar.js': () => import('./dir/bar.js'),
'./dir/foo.js': () => import('./dir/foo.js'),
}

You can then iterate over the keys of the modules object to access the corresponding modules:

for (const path in modules) {
modules[path]().then((mod) => {
console.log(path, mod)
})
}

Matched files are by default lazy-loaded via dynamic import and will be split into separate chunks during build. If you'd rather import all the modules directly (e.g. relying on side-effects in these modules to be applied first), you can pass { eager: true } as the second argument:

const modules
= import.meta.glob
('./dir/\*.js', { eager
: true })

The above will be transformed into the following:

// code produced by vite
import _ as \_\_vite_glob_0_0 from './dir/bar.js'
import _ as **vite_glob_0_1 from './dir/foo.js'
const modules = {
'./dir/bar.js': **vite_glob_0_0,
'./dir/foo.js': \_\_vite_glob_0_1,
}

Multiple Patterns

The first argument can be an array of globs, for example

const modules
= import.meta.glob
(['./dir/*.js', './another/*.js'])

Negative Patterns

Negative glob patterns are also supported (prefixed with !). To ignore some files from the result, you can add exclude glob patterns to the first argument:

const modules
= import.meta.glob
(['./dir/*.js', '!**/bar.js'])

// code produced by vite
const modules = {
'./dir/foo.js': () => import('./dir/foo.js'),
}

Named Imports

It's possible to only import parts of the modules with the import options.

const modules
= import.meta.glob
('./dir/\*.js', { import
: 'setup' })

// code produced by vite
const modules = {
'./dir/bar.js': () => import('./dir/bar.js').then((m) => m.setup),
'./dir/foo.js': () => import('./dir/foo.js').then((m) => m.setup),
}

When combined with eager it's even possible to have tree-shaking enabled for those modules.

const modules
= import.meta.glob
('./dir/\*.js', {
import
: 'setup',
eager
: true,
})

// code produced by vite:
import { setup as **vite_glob_0_0 } from './dir/bar.js'
import { setup as **vite_glob_0_1 } from './dir/foo.js'
const modules = {
'./dir/bar.js': **vite_glob_0_0,
'./dir/foo.js': **vite_glob_0_1,
}

Set import to default to import the default export.

const modules
= import.meta.glob
('./dir/\*.js', {
import
: 'default',
eager
: true,
})

// code produced by vite:
import { default as **vite_glob_0_0 } from './dir/bar.js'
import { default as **vite_glob_0_1 } from './dir/foo.js'
const modules = {
'./dir/bar.js': **vite_glob_0_0,
'./dir/foo.js': **vite_glob_0_1,
}

Custom Queries

You can also use the query option to provide queries to imports, for example, to import assets as a string or as a url:

const moduleStrings
= import.meta.glob
('./dir/_.svg', {
query
: '?raw',
import
: 'default',
})
const moduleUrls
= import.meta.glob
('./dir/_.svg', {
query
: '?url',
import
: 'default',
})

// code produced by vite:
const moduleStrings = {
'./dir/bar.svg': () => import('./dir/bar.svg?raw').then((m) => m['default']),
'./dir/foo.svg': () => import('./dir/foo.svg?raw').then((m) => m['default']),
}
const moduleUrls = {
'./dir/bar.svg': () => import('./dir/bar.svg?url').then((m) => m['default']),
'./dir/foo.svg': () => import('./dir/foo.svg?url').then((m) => m['default']),
}

You can also provide custom queries for other plugins to consume:

const modules
= import.meta.glob
('./dir/\*.js', {
query
: { foo
: 'bar', bar
: true },
})

Glob Import Caveats

Note that:

    This is a Vite-only feature and is not a web or ES standard.
    The glob patterns are treated like import specifiers: they must be either relative (start with ./) or absolute (start with /, resolved relative to project root) or an alias path (see resolve.alias option).
    The glob matching is done via tinyglobby.
    You should also be aware that all the arguments in the import.meta.glob must be passed as literals. You can NOT use variables or expressions in them.

Dynamic Import

Similar to glob import, Vite also supports dynamic import with variables.

const module = await import(`./dir/${file}.js`)

Note that variables only represent file names one level deep. If file is 'foo/bar', the import would fail. For more advanced usage, you can use the glob import feature.
WebAssembly

Pre-compiled .wasm files can be imported with ?init. The default export will be an initialization function that returns a Promise of the WebAssembly.Instance:

import init
from './example.wasm?init'

init
().then
((instance
) => {
instance
.exports
.test
()
})

The init function can also take an importObject which is passed along to WebAssembly.instantiate as its second argument:

init
({
imports
: {
someFunc
: () => {
/_ ... _/
},
},
}).then
(() => {
/_ ... _/
})

In the production build, .wasm files smaller than assetInlineLimit will be inlined as base64 strings. Otherwise, they will be treated as a static asset and fetched on-demand.

NOTE

ES Module Integration Proposal for WebAssembly is not currently supported. Use vite-plugin-wasm or other community plugins to handle this.
Accessing the WebAssembly Module

If you need access to the Module object, e.g. to instantiate it multiple times, use an explicit URL import to resolve the asset, and then perform the instantiation:

import wasmUrl
from 'foo.wasm?url'

const main
= async () => {
const responsePromise
= fetch
(wasmUrl
)
const { module
, instance
} =
await WebAssembly.instantiateStreaming
(responsePromise
)
/_ ... _/
}

main
()

Fetching the module in Node.js

In SSR, the fetch() happening as part of the ?init import, may fail with TypeError: Invalid URL. See the issue Support wasm in SSR.

Here is an alternative, assuming the project base is the current directory:

import wasmUrl
from 'foo.wasm?url'
import { readFile
} from 'node:fs/promises'

const main
= async () => {
const resolvedUrl
= (await import('./test/boot.test.wasm?url')).default

const buffer
= await readFile
('.' + resolvedUrl
)
const { instance
} = await WebAssembly.instantiate
(buffer
, {
/_ ... _/
})
/_ ... _/
}

main
()

Web Workers
Import with Constructors

A web worker script can be imported using new Worker() and new SharedWorker(). Compared to the worker suffixes, this syntax leans closer to the standards and is the recommended way to create workers.

const worker = new Worker(new URL('./worker.js', import.meta.url))

The worker constructor also accepts options, which can be used to create "module" workers:

const worker = new Worker(new URL('./worker.js', import.meta.url), {
type: 'module',
})

The worker detection will only work if the new URL() constructor is used directly inside the new Worker() declaration. Additionally, all options parameters must be static values (i.e. string literals).
Import with Query Suffixes

A web worker script can be directly imported by appending ?worker or ?sharedworker to the import request. The default export will be a custom worker constructor:

import MyWorker
from './worker?worker'

const worker
= new MyWorker
()

The worker script can also use ESM import statements instead of importScripts(). Note: During development this relies on browser native support, but for the production build it is compiled away.

By default, the worker script will be emitted as a separate chunk in the production build. If you wish to inline the worker as base64 strings, add the inline query:

import MyWorker
from './worker?worker&inline'

If you wish to retrieve the worker as a URL, add the url query:

import MyWorker
from './worker?worker&url'

See Worker Options for details on configuring the bundling of all workers.
Content Security Policy (CSP)

To deploy CSP, certain directives or configs must be set due to Vite's internals.
'nonce-{RANDOM}'

When html.cspNonce is set, Vite adds a nonce attribute with the specified value to any <script> and <style> tags, as well as <link> tags for stylesheets and module preloading. Additionally, when this option is set, Vite will inject a meta tag (<meta property="csp-nonce" nonce="PLACEHOLDER" />).

The nonce value of a meta tag with property="csp-nonce" will be used by Vite whenever necessary during both dev and after build.

WARNING

Ensure that you replace the placeholder with a unique value for each request. This is important to prevent bypassing a resource's policy, which can otherwise be easily done.
data:

By default, during build, Vite inlines small assets as data URIs. Allowing data: for related directives (e.g. img-src, font-src), or, disabling it by setting build.assetsInlineLimit: 0 is necessary.

WARNING

Do not allow data: for script-src. It will allow injection of arbitrary scripts.
Build Optimizations

    Features listed below are automatically applied as part of the build process and there is no need for explicit configuration unless you want to disable them.

CSS Code Splitting

Vite automatically extracts the CSS used by modules in an async chunk and generates a separate file for it. The CSS file is automatically loaded via a <link> tag when the associated async chunk is loaded, and the async chunk is guaranteed to only be evaluated after the CSS is loaded to avoid FOUC.

If you'd rather have all the CSS extracted into a single file, you can disable CSS code splitting by setting build.cssCodeSplit to false.
Preload Directives Generation

Vite automatically generates <link rel="modulepreload"> directives for entry chunks and their direct imports in the built HTML.
Async Chunk Loading Optimization

In real world applications, Rollup often generates "common" chunks - code that is shared between two or more other chunks. Combined with dynamic imports, it is quite common to have the following scenario:
Entry async chunk A common chunk C async chunk B dynamic import direct import

In the non-optimized scenarios, when async chunk A is imported, the browser will have to request and parse A before it can figure out that it also needs the common chunk C. This results in an extra network roundtrip:

Entry ---> A ---> C

Vite automatically rewrites code-split dynamic import calls with a preload step so that when A is requested, C is fetched in parallel:

Entry ---> (A + C)

It is possible for C to have further imports, which will result in even more roundtrips in the un-optimized scenario. Vite's optimization will trace all the direct imports to completely eliminate the roundtrips regardless of import depth.
