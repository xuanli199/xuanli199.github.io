import tape from 'tape'
import mdIt from './utils/md-it'

tape('markdown-it-github-toc option: indentation', (t) => {
  t.equal(
    mdIt(
      `[toc]
# Heading 1
`,
      {
        toc: true,
        indentation: ''
      }
    ),
    `<p>
<ul class="markdownIt-TOC">
<li>
<a href="#heading-1">Heading 1</a>
</li>
</ul>
</p>
<h1 id="heading-1">Heading 1</h1>\n`,
    'should works with no indentation'
  )

  t.end()
})
