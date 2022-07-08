import './katex.css'

import asciimath2latex from 'asciimath-to-latex'
import katex from 'katex'

const mathBlock = (code) => {
  let tex = ''
  code.split(/(?:\n\s*){2,}/).forEach((line) => { // consecutive new lines means a new formula
    try {
      tex += katex.renderToString(line.trim(), { displayMode: true })
    } catch (err) {
      tex += `<pre>${err}</pre>`
    }
  })
  return `<div>${tex}</div>`
}

const LatexPlugin = (md) => {
  // inline math
  const temp1 = md.renderer.rules.code_inline.bind(md.renderer.rules)
  md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
    let code = tokens[idx].content
    if (code.startsWith('@') && code.endsWith('@')) {
      code = '$' + asciimath2latex(code.substr(1, code.length - 2)) + '$'
    }
    if (code.startsWith('$') && code.endsWith('$')) { // inline math
      code = code.substr(1, code.length - 2)
      try {
        return katex.renderToString(code)
      } catch (err) {
        return `<code>${err}</code>`
      }
    }
    return temp1(tokens, idx, options, env, slf)
  }

  // fenced math block
  const temp2 = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    let token = tokens[idx]
    let code = token.content.trim()
    if (token.info === 'math' || token.info === 'katex') { // math
      return mathBlock(code)
    }
    if (/^ascii-?math/i.test(token.info)) {
      code = code.split(/(?:\n\s*){2,}/).map((item) => { return asciimath2latex(item) }).join('\n\n')
      return mathBlock(code)
    }
    return temp2(tokens, idx, options, env, slf)
  }
}

export default LatexPlugin
