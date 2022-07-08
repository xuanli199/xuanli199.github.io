import assert from 'assert'
import markdownIt from 'markdown-it'
import markdownItLatex from '../dist/index'

const mdi = markdownIt()
mdi.use(markdownItLatex)

assert(mdi.render('# Hello world').trim() === '<h1>Hello world</h1>', '# Hello world')
assert(mdi.render('Hello world').trim() === '<p>Hello world</p>', 'Hello world')

console.log(mdi.render('`$E = mc^2$`'))
console.log(mdi.render(`\`\`\`math
E = mc^2
\`\`\``))
console.log(mdi.render('`@2=(((3-x)xx2)/(3-x))@`'))
console.log(mdi.render(`\`\`\`ascii-math
2=(((3-x)xx2)/(3-x))
\`\`\``))

assert(mdi.render('`$E = mc^2$`').indexOf('katex-mathml') > -1)
assert(mdi.render(`\`\`\`math
E = mc^2
\`\`\``).indexOf('katex-mathml') > -1)
assert(mdi.render('`@2=(((3-x)xx2)/(3-x))@`').indexOf('katex-mathml') > -1)
assert(mdi.render(`\`\`\`ascii-math
2=(((3-x)xx2)/(3-x))
\`\`\``).indexOf('katex-mathml') > -1)
