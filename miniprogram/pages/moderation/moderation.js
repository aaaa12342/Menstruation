const community = require('../../services/community-service')

Page({
  data: { queue: [], mine: [] },
  onShow() { this.refresh() },
  refresh() {
    this.setData({ queue: community.queue(), mine: community.posts('mine').filter(post => post.status === '已通过') })
  },
  decide(e) {
    const { kind, postId, id, pass } = e.currentTarget.dataset
    const ok = community.review(kind, postId, id, pass === 'yes')
    wx.showToast({ title: ok ? '审核状态已更新' : '操作失败', icon: 'none' })
    this.refresh()
  },
  demoReply(e) {
    const ok = community.demoReply(e.currentTarget.dataset.id)
    wx.showToast({ title: ok ? '已发送演示回复' : '操作失败', icon: 'none' })
    this.refresh()
  }
})
