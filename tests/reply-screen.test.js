const assert = require('node:assert/strict')
const cache = new Map()
global.wx = {
  getStorageSync: key => cache.get(key),
  setStorageSync: (key, value) => cache.set(key, structuredClone(value)),
  removeStorageSync: key => cache.delete(key)
}

const service = require('../miniprogram/services/community-service')
const post = service.submitPost({ title: '关于经期用品的疑问', body: '可以分享一些选购时看包装的方法吗？' }).post
assert.ok(post)
assert.equal(service.review('post', post.id, post.id, true), true)
assert.match(service.submitReply(post.id, '建议吃止痛药').error, /用药/)
assert.match(service.submitReply(post.id, '你得了某种疾病').error, /诊断/)
assert.equal(service.submitReply(post.id, '可以查看产品包装和说明').ok, true)
console.log('Reply safety screen: OK')
