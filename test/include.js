const Engine = require('../lib')

const engine = new Engine({ root: `${__dirname}/fixtures/include` })

const { test } = require('tap')

test('include', assert => {
  assert.plan(1)

  const result = engine.render('template', { name: 'ahmad' })

  assert.equal(result, 'hello ahmad')
})

test('apply', assert => {
  assert.plan(1)

  const result = engine.render('apply', { people: [{ name: 'ahmad' }, { name: 'nicole' }] })

  assert.equal(result, 'hello ahmad\nhello nicole')
})
