const assert = require('node:assert/strict')

const cache = new Map()
global.wx = {
  getStorageSync: key => cache.get(key),
  setStorageSync: (key, value) => cache.set(key, structuredClone(value)),
  removeStorageSync: key => cache.delete(key)
}

const community = require('../miniprogram/services/community-service')

community.clearData()
const created = community.submitPost({
  title: '想了解经期用品',
  body: '学校里怎样选择合适的经期用品？'
}).post
assert.ok(created)
assert.equal(community.review('post', created.id, created.id, true), true)
assert.equal(community.submitReply(created.id, '可以先查看正规包装和使用说明').ok, true)

const replyQueue = community.queue().find(item => item.kind === 'reply')
assert.ok(replyQueue)
assert.equal(community.review('reply', created.id, replyQueue.id, true), true)
const reply = community.postById(created.id).replies[0]

const report = community.submitReport({
  kind: 'reply', id: reply.id, postId: created.id,
  reason: '不当医疗建议', snippet: reply.text
})
assert.ok(report.report)
assert.match(community.submitReport({
  kind: 'reply', id: reply.id, postId: created.id,
  reason: '不当医疗建议', snippet: reply.text
}).error, /已举报/)

const reportQueue = community.queue().find(item => item.kind === 'report')
assert.ok(reportQueue)
assert.match(reportQueue.text, /不当医疗建议/)
assert.equal(community.review('report', created.id, reportQueue.id, true), true)
assert.equal(community.postById(created.id).replies.some(item => item.id === reply.id), false)

const seed = community.posts('all').find(item => !item.id.startsWith('post-'))
assert.ok(seed)
const seedReport = community.submitReport({
  kind: 'post', id: seed.id, postId: seed.id,
  reason: '其他', snippet: seed.title
}).report
assert.ok(seedReport)
assert.equal(community.review('report', seed.id, seedReport.id, true), true)
assert.equal(community.posts('all').some(item => item.id === seed.id), false)

assert.match(community.submitReport({
  kind: 'post', id: created.id, postId: created.id,
  reason: '无效原因', snippet: created.title
}).error, /有效/)
community.clearData()
assert.equal(community.queue().length, 0)

console.log('Community report and hide flow: OK')
