const { resolve } = require('path')
const matter = require('gray-matter')

class Engine {
  constructor ({ root, extension, helpers = {}, matter } = {}) {
    this.cache = {}
    this.root = root || process.cwd()
    this.extension = extension || 'jstl'
    this.matter = matter | {}
    this.helpers = {
      ...helpers,
      include: (name, data) => this.render(name, data),
      apply: (name, array) => array.map(item => this.render(name, item)).join('\n')
    }
  }

  compile (literal) {
    return new Function('data', 'fn', `return \`${literal}\``) // eslint-disable-line no-new-func
  }

  load (name) {
    if (!this.cache[name]) {
      const path = resolve(this.root, `${name}.${this.extension}`)
      const { content, data } = matter.read(path, this.matter)

      this.cache[name] = {
        data,
        template: this.compile(content)
      }
    }

    return this.cache[name]
  }

  render (name, templateData) {
    const { data, template } = this.load(name)

    const content = template({ ...data, ...templateData }, this.helpers)

    // apply layout first
    if (data.layout) {
      const layoutData = { ...data, ...templateData, content }
      // remove the processed layout
      delete layoutData.layout
      return this.render(data.layout, layoutData)
    }

    return content.trim()
  }
}

module.exports = Engine
