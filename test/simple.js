const Engine = require('../lib')

const engine = new Engine({ root: `${__dirname}/fixtures/simple` })

const { test } = require('tap')

test('no-data', assert => {
  assert.plan(1)

  const result = engine.render('no-data')

  assert.equal(result, 'hello world!')
})

test('string-interpolation', assert => {
  assert.plan(1)

  const result = engine.render('with-data', { name: 'ahmad' })

  assert.equal(result, 'hello ahmad')
})

test('string-interpolation missing data', assert => {
  assert.plan(1)

  const result = engine.render('with-data')

  assert.equal(result, 'hello undefined')
})

test('front-matter data', assert => {
  assert.plan(1)

  const result = engine.render('front-matter')

  assert.equal(result, 'hello ahmad')
})

test('front-matter data override', assert => {
  assert.plan(1)

  const result = engine.render('front-matter', { name: 'nicole' })

  assert.equal(result, 'hello nicole')
})
