import tape from 'tape'
import mdIt from './utils/md-it'

tape('markdown-it-github-toc anchor', (t) => {
  t.equal(
    mdIt(
      `[toc](Title)
# 'Heading' ?
# $.lel!
# $.lel?
`,
      { anchorLink: true }
    ),
    `<p><a href="Title">toc</a></p>
<h1 id="heading"><a class="markdownIt-Anchor" href="#heading">#</a> 'Heading' ?</h1>
<h1 id="lel"><a class="markdownIt-Anchor" href="#lel">#</a> $.lel!</h1>
<h1 id="lel-2"><a class="markdownIt-Anchor" href="#lel-2">#</a> $.lel?</h1>\n`,
    'should add anchors'
  )

  t.end()
})
