# JS Template Literals Engine

a very basic, and straight to the point Template Engine using JS
Template Literals

[![license][license-img]][license-url]
[![version][npm-img]][npm-url]
[![super linter][super-linter-img]][super-linter-url]
[![test][test-img]][test-url]
[![release][release-img]][release-url]

## Why

[Template
Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
*(also known as "Template strings")* are a familiar and simple to use
method to run embedded expressions and string interpolation, which are
the primary functionality of a Template Engine.

This library wraps template literals with traditional techniques
*(layouts, partials, helpers, etc ...)* to facilitates the usage through
a structured file format (`.jstl`)

## What

Features:

  - Layouts: native support for layouts
  - Partials Support: include files and pass data with ease
  - Fast: Templates are cached by default
  - Extensible: extensible with custom helpers

## How

### Usage

###### `template.jstl`

``` text
hello ${data.name}
```

###### `index.js`

``` js
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine(options)

engine.render('template', { name: 'ahmad' })
```

#### String Interpolation

since templates are parsed as standard JavaScript [Template
Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
the same functionality is expected

Variables are accessible `data` context

<details><summary>Example</summary>

###### `index.js`

```js
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine()

const result = engine.render('template', { name: 'ahmad' })

console.log(result)
```

###### `template.jstl`

```text
Hello ${data.name}
```

###### result

```bash
$ node index.js
Hello ahmad
```
</details>

#### Helper functions

Helpers are essentially functions that can be called within the
template.

All helper functions are available through the `fn` context

<details><summary>Example</summary>

###### `index.js`

```js
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine({
  helpers: { 
    capitalize : str => string[0].toUpperCase() + string.slice(1)
  }
})

const result = engine.render('template', { name: 'ahmad' })

console.log(result)
```

###### `template.jstl`

```text
Hello ${fn.capitalize(data.name)}
```

###### result

```bash
$ node index.js
Hello Ahmad
```
</details>

#### Built-in Helpers

##### `fn.render(templateName, [dataObject])`

Behaves exactly like `Engine.render` by including other template file:
`templateName` inline

##### `fn.apply(templateName, [dataArray])`

enumerates over `dataArray` and applies each item to a newly rendered
instance of `templateName`

<details><summary>Example</summary>

###### `index.js`

```js
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine()

const actors = [
  { name: 'William Hartnell', year: '1963' },
  { name: 'Patrick Troughton', year: '1966' },
  { name: 'Jon Pertwee', year: '1970' },
  { name: 'Tom Baker', year: '1974' },
  { name: 'Peter Davison', year: '1981' },
  { name: 'Colin Baker', year: '1984' },
  { name: 'Sylvester McCoy', year: '1987' },
  { name: 'Paul McGann', year: '1996' },
  { name: 'Christopher Eccleston', year: '2005' },
  { name: 'David Tennant', year: '2005' },
  { name: 'Matt Smith', year: '2010' },
  { name: 'Peter Capaldi', year: '2013' },
  { name: 'Jodie Whittaker', year: '2017' }
]

const result = engine.render('page', { actors })

console.log(result)
```

###### `page.jstl`

```text
${ fn.include('header') }

<h1>List of actors who have played the Doctor</h1>

<ul>
  ${ fn.apply('doctor', data.actors) }
</ul>

${ fn.include('footer') }
```

##### `doctor.jstl`

```text
<li>${data.name} - first appeared in ${data.year}</li>
```

###### result

```text
$ node index.js
<body>

<h1>List of actors who have played the Doctor</h1>

<ul>
<li>William Hartnell - first appeared in 1963</li>
<li>Patrick Troughton - first appeared in 1966</li>
<li>Jon Pertwee - first appeared in 1970</li>
<li>Tom Baker - first appeared in 1974</li>
<li>Peter Davison - first appeared in 1981</li>
<li>Colin Baker - first appeared in 1984</li>
<li>Sylvester McCoy - first appeared in 1987</li>
<li>Paul McGann - first appeared in 1996</li>
<li>Christopher Eccleston - first appeared in 2005</li>
<li>David Tennant - first appeared in 2005</li>
<li>Matt Smith - first appeared in 2010</li>
<li>Peter Capaldi - first appeared in 2013</li>
<li>Jodie Whittaker - first appeared in 2017</li>
</ul>

</body>
```
</details>

#### Front Matter

Every template file can optionally include a front matter block, which
is parsed and included into the `data` context

<details><summary>Example</summary>

###### `index.js`

```js
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine()

const result = engine.render('template')

console.log(result)
```

###### `template.jstl`

```text
---
name: ahmad
---
Hello ${data.name}
```

###### result

```bash
$ node index.js
Hello ahmad
```
</details>

#### Layouts

defining a `layout` property in the Front Matter block of a template
will result in rendering that layout first and including the current
template as content.

Layouts can infinitely cascade, the only limit is your system
resources\!

<details><summary>Example</summary>

###### `index.js`

```js
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine()

const result = engine.render('template', { name: 'ahmad' })

console.log(result)
```

###### `template.jstl`

```text
---
layout: layouts/welcome
---

<h2>${data.name}</h2>
```

###### `layouts/welcome.jstl`

```text
---
layout: layouts/base
---

<h1>Welcome!</h1>

${data.content}
```

###### `layouts/base.jstl`

```text
<html>
  <body>
    ${data.content}
  </body>
</html>
```

###### result

```text
$ node index.js
<html>
  <body>
    <h1>Welcome</h1>
    <h2>ahmad</h2>
  </body>
</html>
```
</details>

## API

#### Constructor `new Engine([optionsObject])`

returns a new instance of the template engine class

| name            | type     | required | default         | description                                                                                                                              |
| --------------- | -------- | -------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **`root`**      | `String` | ✖        | `process.cwd()` | path to look for template files                                                                                                          |
| **`extension`** | `String` | ✖        | `jstl`          | template file extension                                                                                                                  |
| **`helpers`**   | `Object` | ✖        | `{}`            | `key => function` helpers map to pass to templates                                                                                       |
| **`matter`**    | `Object` | ✖        | `{}`            | [Options](https://github.com/jonschlinkert/gray-matter#options) to pass to [`gray-matter`](https://github.com/jonschlinkert/gray-matter) |

###### example:

``` js
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine({
  root: 'templates',
  extension: 'html'
  helpers: {
    capitalize : str => string[0].toUpperCase() + string.slice(1),
    ...
  }
})
```

#### Method: `render(templateName, [dataObject])`

parses the content of the file at `${templateName}.jstl` and passes
`dataObject` to it, returns the processed output string

###### example:

``` js
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine({ root: 'templates' })

engine.render('a-template') // => ./templates/a-template.jstl
engine.render('nested/template', { foo: 'bar' }) // => ./templates/nested/template.jstl
```

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-template-literals-engine

[npm-url]: https://www.npmjs.com/package/@ahmadnassri/template-literals-engine
[npm-img]: https://badgen.net/npm/v/@ahmadnassri/template-literals-engine

[super-linter-url]: https://github.com/ahmadnassri/node-template-literals-engine/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/node-template-literals-engine/workflows/super-linter/badge.svg

[test-url]: https://github.com/ahmadnassri/node-template-literals-engine/actions?query=workflow%3Atest
[test-img]: https://github.com/ahmadnassri/node-template-literals-engine/workflows/test/badge.svg

[release-url]: https://github.com/ahmadnassri/node-template-literals-engine/actions?query=workflow%3Arelease
[release-img]: https://github.com/ahmadnassri/node-template-literals-engine/workflows/release/badge.svg
