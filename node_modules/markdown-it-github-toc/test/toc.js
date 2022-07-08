import tape from 'tape'
import mdIt from './utils/md-it'

tape('markdown-it-github-toc toc', (t) => {
  t.equal(
    mdIt(
      '',
      { toc: true }
    ),
    ``,
    'should works with nothing'
  )

  t.equal(
    mdIt(
      '[toc]'
    ),
    `<p></p>\n`,
    'should do nothing if not asked to'
  )

  t.equal(
    mdIt(
      '[toc]',
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
</ul>
</p>\n`,
    'should works with no heading'
  )

  t.equal(
    mdIt(
      '# heading\n\n[toc]',
      {
        toc: true,
        anchorLink: false
      }
    ),
    `<h1 id="heading">heading</h1>
<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">heading</a>
  </li>
</ul>
</p>\n`,
    'should works with one heading'
  )

  t.equal(
    mdIt(
      '[toc]',
      {
        toc: true,
        tocClassName: 'test'
      }
    ),
    `<p>
<ul class="test">
</ul>
</p>\n`,
    'should allow custom class'
  )

  t.equal(
    mdIt(
      `[toc]
# 新年快乐`,
      {
        toc: true
      }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#新年快乐">新年快乐</a>
  </li>
</ul>
</p>
<h1 id="新年快乐">新年快乐</h1>\n`,
    'should support unicode headings'
  )

  t.equal(
    mdIt(
      `[toc]
# Heading`,
      {
        toc: true,
        anchorLink: true,
        anchorClassName: 'anchor',
        anchorLinkSymbol: '',
        anchorLinkSymbolClassName: 'octicon octicon-link',
        anchorLinkSpace: false
      }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading"><a class="anchor" href="#heading">` +
    `<span class="octicon octicon-link"></span></a>Heading</h1>\n`,
    'should support GitHub style anchor link'
  )

  t.equal(
    mdIt(
      `[toc]
# Heading
## Two
### Three
# One`,
      {
        toc: true,
        tocFirstLevel: 2
      }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#two">Two</a>
    <ul>
      <li>
        <a href="#three">Three</a>
      </li>
    </ul>
  </li>
</ul>
</p>
<h1 id="heading">Heading</h1>
<h2 id="two">Two</h2>
<h3 id="three">Three</h3>
<h1 id="one">One</h1>\n`,
    'should works when skipping first level'
  )

  t.equal(
    mdIt(
      `[toc]
# Heading
# Heading`,
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">Heading</a>
  </li>
  <li>
    <a href="#heading-2">Heading</a>
  </li>
</ul>
</p>
<h1 id="heading">Heading</h1>
<h1 id="heading-2">Heading</h1>\n`,
    'should works with smiliar levels and similar titles'
  )

  t.equal(
    mdIt(
      `[toc]
# 'Heading' ?
# $.lel!
# $.lel?
`,
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading">'Heading' ?</a>
  </li>
  <li>
    <a href="#lel">$.lel!</a>
  </li>
  <li>
    <a href="#lel-2">$.lel?</a>
  </li>
</ul>
</p>
<h1 id="heading">'Heading' ?</h1>
<h1 id="lel">$.lel!</h1>
<h1 id="lel-2">$.lel?</h1>\n`,
    'should works with special chars'
  )

  t.equal(
    mdIt(
      `[toc]
### a
# b
`,
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <ul>
      <li>
        <ul>
          <li>
            <a href="#a">a</a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <a href="#b">b</a>
  </li>
</ul>
</p>
<h3 id="a">a</h3>
<h1 id="b">b</h1>\n`,
    'should works when not starting with h1'
  )

  t.equal(
    mdIt(
      `[toc]
# Heading 1
## SubHeading
# Heading 2
### Deeper Heading`,
      { toc: true }
    ),
    `<p>
<ul class="markdownIt-TOC">
  <li>
    <a href="#heading-1">Heading 1</a>
    <ul>
      <li>
        <a href="#subheading">SubHeading</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="#heading-2">Heading 2</a>
    <ul>
      <li>
        <ul>
          <li>
            <a href="#deeper-heading">Deeper Heading</a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
</p>
<h1 id="heading-1">Heading 1</h1>
<h2 id="subheading">SubHeading</h2>
<h1 id="heading-2">Heading 2</h1>
<h3 id="deeper-heading">Deeper Heading</h3>\n`,
    'should works'
  )

  t.end()
})
