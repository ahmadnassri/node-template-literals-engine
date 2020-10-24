const Engine = require('../lib')

const engine = new Engine({ root: `${__dirname}/fixtures/layouts` })

const { test } = require('tap')

test('layouts', assert => {
  assert.plan(1)

  const result = engine.render('template')

  assert.equal(result, '<html>\n<body>\n\n<h1>hello world</h1>\n\n</body>\n</html>')
})
