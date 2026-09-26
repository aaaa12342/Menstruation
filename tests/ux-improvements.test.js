const assert = require('node:assert/strict')

const cache = new Map()
global.wx = {
  getStorageSync: key => cache.get(key),
  setStorageSync: (key, value) => cache.set(key, structuredClone(value)),
  removeStorageSync: key => cache.delete(key)
}

const bookmarks = require('../miniprogram/services/bookmark-service')
const community = require('../miniprogram/services/community-service')
const content = require('../miniprogram/services/data-service')

bookmarks.clear()
assert.equal(bookmarks.has('knowledge', 'k1'), false)
assert.deepEqual(bookmarks.toggle('knowledge', 'k1'), { saved: true })
assert.equal(bookmarks.has('knowledge', 'k1'), true)
assert.deepEqual(bookmarks.toggle('knowledge', 'k1'), { saved: false })
assert.equal(bookmarks.has('knowledge', 'k1'), false)
assert.match(bookmarks.toggle('invalid', 'k1').error, /无效/)

assert.ok(content.searchKnowledge('卫生巾', 'all').length > 0)
assert.ok(content.searchKnowledge('', '基础知识').every(item => item.category === '基础知识'))
assert.ok(content.searchRumors('经期').length > 0)
assert.equal(content.searchKnowledge('一定找不到的关键词', 'all').length, 0)

community.clearData()
const post = community.submitPost({
  title: '这是我的测试问题',
  body: '这是一段用于验证删除功能的详细描述。'
}).post
assert.ok(post)
assert.equal(community.isMine(post.id), true)
assert.equal(community.submitReport({
  kind: 'post', id: post.id, postId: post.id,
  reason: '其他', snippet: post.title
}).report.status, '待处理')
assert.equal(community.myReports().length, 1)
assert.equal(community.myReports()[0].targetLabel, '帖子')
assert.equal(community.deletePost(post.id), true)
assert.equal(community.postById(post.id), null)
assert.equal(community.myReports().length, 0)
assert.equal(community.deletePost(post.id), false)

bookmarks.clear()
community.clearData()
console.log('Search, bookmarks, report history and post deletion: OK')
