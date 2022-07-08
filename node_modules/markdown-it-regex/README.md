# markdown-it-regex

Plugin for markdown-it, replaces strings that match a regular expression pattern.


## Installation

```
yarn add markdown-it-regex
```


## Usage

```javascript
import markdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'
const mdi = markdownIt()
mdi.use(markdownItRegex, {
  name: 'emoji',
  regex: /(:(?:heart|panda_face|car):)/,
  replace: (match) => {
    return `<i class="e1a-${match.slice(1, -1)}"></i>`
  }
})
mdi.render('I :heart: you') // <p>I <i class="e1a-heart"></i> you</p>
```


## Development

### Build

```
yarn build:watch
```

### Test

```
yarn test
```

### Distribution

```
yarn release && npm publish
```
