# markdown-it-source-map

Add source map to the output HTML of [markdown-it](https://github.com/markdown-it/markdown-it).


## install

```
yarn add markdown-it-source-map
```


## usage

```JavaScript
import markdownIt from 'markdown-it'
import markdownItSourceMap from 'markdown-it-source-map'

const mdi = markdownIt()
mdi.use(markdownItSourceMap)

mdi.render('# hello world') // <h1 data-source-line="1">hello world</h1>
```


## develop

```
yarn build
yarn test
```
