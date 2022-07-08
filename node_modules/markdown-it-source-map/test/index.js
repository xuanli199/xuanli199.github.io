/* eslint-env mocha */
import assert from 'assert'
import markdownIt from 'markdown-it'
import markdownItSourceMap from '../src/index'

const mdi = markdownIt()
mdi.use(markdownItSourceMap)

describe('tokens', function () {
  it('should render heading correctly', function () {
    assert.equal('<h1 data-source-line="1">Hello world</h1>', mdi.render('# Hello world').trim())
  })
  it('should render paragraph correctly', function () {
    assert.equal('<p data-source-line="1">Hello world</p>', mdi.render('Hello world').trim())
  })
})

