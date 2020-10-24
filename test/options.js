const Engine = require('../lib')
const { test } = require('tap')

const root = `${__dirname}/fixtures/options`

test('just defaults', assert => {
  assert.plan(1)

  const engine = new Engine()

  const result = engine.render('test/fixtures/simple/no-data')

  assert.equal(result, 'hello world!')
})

test('no root', assert => {
  assert.plan(1)

  const engine = new Engine({ extension: 'html' })

  const result = engine.render('test/fixtures/options/page', { name: 'ahmad' })

  assert.equal(result, '<h1>hello ahmad</h1>')
})

test('extenstion', assert => {
  assert.plan(1)

  const engine = new Engine({ root, extension: 'html' })

  const result = engine.render('page', { name: 'ahmad' })

  assert.equal(result, '<h1>hello ahmad</h1>')
})

test('extenstion', assert => {
  assert.plan(1)

  const engine = new Engine({ root, matter: { language: 'json' } })

  const result = engine.render('json-matter')

  assert.equal(result, 'hello ahmad')
})
