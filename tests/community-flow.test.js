const assert = require('node:assert/strict')

const cache = new Map()
global.wx = {
  getStorageSync: key => cache.get(key),
  setStorageSync: (key, value) => cache.set(key, structuredClone(value)),
  removeStorageSync: key => cache.delete(key)
}

const community = require('../miniprogram/services/community-service')
const content = require('../miniprogram/services/data-service')

community.clearData()
assert.equal(content.knowledge.length, 16)
assert.equal(content.rumors.length, 10)
assert.match(community.screen('请加微信号联系我'), /联系方式/)
assert.match(community.screen('联系我 13800138000'), /个人信息/)
assert.equal(community.risky('剧烈疼痛怎么办'), true)
assert.equal(community.screen('剧烈疼痛怎么办'), '')

const created = community.submitPost({
  title: '想了解经期用品',
  body: '学校里怎样选合适的经期用品？',
  tag: '选购',
  scope: '全校广场'
})
assert.ok(created.post)
const id = created.post.id
assert.equal(community.posts('mine')[0].status, '待审核')
assert.equal(community.posts('all').some(post => post.id === id), false)

const pendingPost = community.queue().find(item => item.postId === id)
assert.ok(pendingPost)
assert.equal(community.review('post', id, id, true), true)
assert.equal(community.posts('all')[0].id, id)

assert.equal(community.submitReply(id, '可以查看正规包装和使用说明').ok, true)
assert.equal(community.unreadCount(), 0)
const pendingReply = community.queue().find(item => item.kind === 'reply' && item.postId === id)
assert.ok(pendingReply)
assert.equal(community.review('reply', id, pendingReply.id, true), true)
assert.equal(community.unreadCount(), 1)
assert.equal(community.posts('notices')[0].id, id)

community.markRead(id)
assert.equal(community.unreadCount(), 0)
assert.equal(community.posts('notices').length, 0)
community.clearData()
assert.equal(community.posts('mine').length, 0)

console.log('Community workflow and content counts: OK')
