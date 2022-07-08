# markdown-it-toc-and-anchor
[![circleci](https://badgen.net/circleci/github/medfreeman/markdown-it-toc-and-anchor/master)](https://circleci.com/gh/medfreeman/markdown-it-toc-and-anchor)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/medfreeman/markdown-it-toc-and-anchor.svg?label=windows%20build)](https://ci.appveyor.com/project/medfreeman/markdown-it-toc-and-anchor)
[![Version](https://img.shields.io/npm/v/markdown-it-toc-and-anchor.svg)](https://github.com/medfreeman/markdown-it-toc-and-anchor/blob/master/CHANGELOG.md)
[![Coverage Status](https://img.shields.io/coveralls/medfreeman/markdown-it-toc-and-anchor/master.svg)](https://coveralls.io/github/medfreeman/markdown-it-toc-and-anchor?branch=master)
[![Dependency Status](https://img.shields.io/david/medfreeman/markdown-it-toc-and-anchor.svg)](https://david-dm.org/medfreeman/markdown-it-toc-and-anchor)

> markdown-it plugin to add toc and anchor links in headings

## Installation

```console
$ yarn add markdown-it-toc-and-anchor
```

## Usage

### ES6

```js
import markdownIt from "markdown-it"
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"

markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItTocAndAnchor, {
      // ...options
    })
    .render(md)
```

### ES5 / CommonJS

```js
var markdownIt = require('markdown-it'),
    markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default;

markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItTocAndAnchor, {
      // ...options
    })
    .render(md)
```

:information_source: Note that the 'default' property has to be used when requiring this plugin, this is due to the use of Babel 6 now making ES6 compliant exports ([Misunderstanding ES6 Modules, Upgrading Babel, Tears, and a Solution
](https://medium.com/@kentcdodds/misunderstanding-es6-modules-upgrading-babel-tears-and-a-solution-ad2d5ab93ce0#.enq6dfcnn))

### Options

#### `toc`

(default: `true`)

Allows you to enable/disable the toc transformation of `@[toc]`

#### `tocClassName`

(default: `"markdownIt-TOC"`)

Option to customize html class of the `<ul>` wrapping the toc. If no class is wanted set to `null`.

#### `tocFirstLevel`

(default: `1`)

Allows you to skip some heading level. Example: use 2 if you want to skip `<h1>`
from the TOC.

#### `tocLastLevel`

(default: `6`)

Allows you to skip some heading level. Example: use 5 if you want to skip `<h6>`
from the TOC.

#### `tocCallback`

(default: `null`)

Allows you to get toc contents externally by executing a callback function returning toc elements, in addition / instead of using @[toc] tag in content.
Example :

```
  markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItTocAndAnchor, {
      tocCallback: function(tocMarkdown, tocArray, tocHtml) {
        console.log(tocHtml)
      }
    })
    .render(md)
```

To allow callback to be more flexible, this option is also available in global markdown-it options, and in render environment.
Example :

##### Callback in global markdown-it options

```
  var mdIt = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItTocAndAnchor)

  ....

  mdIt.set({
    tocCallback: function(tocMarkdown, tocArray, tocHtml) {
      console.log(tocHtml)
    }
  })
    .render(md)
```

##### Callback in render environment

```
  var mdIt = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItTocAndAnchor)

  ....

  mdIt
    .render(md, {
      tocCallback: function(tocMarkdown, tocArray, tocHtml) {
        console.log(tocHtml)
      }
    })
```

#### `anchorLink`

(default: `true`)

Allows you to enable/disable the anchor link in the headings

#### `anchorLinkSymbol`

(default: `"#"`)

Allows you to customize the anchor link symbol

#### `anchorLinkSpace`

(default: `true`)

Allows you to enable/disable inserting a space between the anchor link and heading.

#### `anchorLinkSymbolClassName`

(default: `null`)

Allows you to customize the anchor link symbol class name. If not null, symbol will be rendered as `<span class="anchorLinkSymbolClassName">anchorLinkSymbol</span>`.

#### `anchorLinkBefore`

(default: `true`)

Allows you to prepend/append the anchor link in the headings

#### `anchorLinkPrefix`

(default: `undefined`)

Allows you to add a prefix to the generated header ids, e.g. `section-`.

#### `anchorClassName`

(default: `"markdownIt-Anchor"`)

Allows you to customize the anchor link class. If no class is wanted set to `null`.

#### `wrapHeadingTextInAnchor`

(default: `false`)

Makes the entire heading into the anchor link (takes precedence over `anchorLinkSymbol` and `anchorLinkBefore`)

#### `resetIds`

(default: `true`)

Allows you to reset (or not) ids incrementation. Use it if you will have multiple
documents on the same page.

#### `slugify`

(default: uses the [`uslug`](https://www.npmjs.com/package/uslug) package)

Allows you to customize the slug function that create ids from string.

Ex:
```js
   // ...
   slugify : string => `/some/prefix/${string.replace(/(\/| |')/g, "_")}`
   // ...
```

---

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)
