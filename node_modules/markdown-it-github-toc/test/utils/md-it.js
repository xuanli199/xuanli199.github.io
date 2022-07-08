import markdownIt from 'markdown-it'
import markdownItTocAndAnchor from '../../src'

export default (md, options = {}) => markdownIt({
  html: true,
  linkify: true,
  typography: true
})
  .use(markdownItTocAndAnchor, {

    // disable main features
    // make tests easier to write
    toc: false,
    anchorLink: false,

    ...options
  })
  .render(md)
