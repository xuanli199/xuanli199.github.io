export const rendererRule = (tokens, idx, options) => {
  return options.replace(tokens[idx].content)
}

export const coreRuler = (state, options) => {
  for (let i = 0; i < state.tokens.length; i++) {
    if (state.tokens[i].type !== 'inline') {
      continue
    }
    let tokens = state.tokens[i].children
    for (let j = tokens.length - 1; j >= 0; j--) {
      let token = tokens[j]
      if (token.type === 'text' && options.regex.test(token.content)) {
        const newTokens = token.content.split(options.regex)
          .map((item, index) => ({ type: (index % 2 === 0 ? 'text' : options.name), content: item }))
          .filter((item) => item.content.length > 0)
          .map((item) => {
            const newToken = new state.Token(item.type, '', 0)
            newToken.content = item.content
            return newToken
          })
        state.tokens[i].children = tokens = [...tokens.slice(0, j), ...newTokens, ...tokens.slice(j + 1)]
      }
    }
  }
}

const regexPlugin = (md, options) => {
  md.renderer.rules[options.name] = (tokens, idx) => {
    return rendererRule(tokens, idx, options)
  }

  md.core.ruler.push(options.name, (state) => {
    coreRuler(state, options)
  })
}

export default regexPlugin
