const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..', 'miniprogram')
const app = JSON.parse(fs.readFileSync(path.join(root, 'app.json'), 'utf8'))

for (const page of app.pages) {
  const base = path.join(root, page)
  for (const extension of ['js', 'wxml', 'wxss']) {
    assert.ok(fs.existsSync(base + '.' + extension), page + '.' + extension + ' missing')
  }
  const js = fs.readFileSync(base + '.js', 'utf8')
  const wxml = fs.readFileSync(base + '.wxml', 'utf8')
  new Function(js)
  for (const match of wxml.matchAll(/(?:bindtap|bindinput)="([^"]+)"/g)) {
    assert.ok(js.includes(match[1] + '('), page + ' missing event handler ' + match[1])
  }
}

console.log('Page wiring and JS syntax: OK')
