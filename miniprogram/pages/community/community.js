const community = require('../../services/community-service')
Page({
  data: { list: [], view: 'all', unread: 0, emptyText: '' },
  onShow() {
    const next = wx.getStorageSync('jx_community_view')
    if (next) wx.removeStorageSync('jx_community_view')
    this.setData({ view: next || this.data.view || 'all' })
    this.refresh()
  },
  refresh() {
    const view = this.data.view
    const list = community.posts(view).map(post => ({
      ...post,
      answerCount: (post.replies || []).filter(reply => reply.status === '已通过').length,
      unreadCount: (post.replies || []).filter(reply => reply.status === '已通过' && reply.unread).length
    }))
    const unread = community.unreadCount()
    this.setData({ list, unread, emptyText: view === 'mine' ? '你还没有提问' : view === 'notices' ? '目前没有新回复' : '这里还没有帖子' })
    if (unread) wx.setTabBarBadge({ index: 2, text: String(unread) })
    else wx.removeTabBarBadge({ index: 2 })
  },
  switchScope(e) {
    this.setData({ view: e.currentTarget.dataset.view })
    this.refresh()
  },
  open(e) { wx.navigateTo({ url: '/pages/question-detail/question-detail?id=' + e.currentTarget.dataset.id }) },
  ask() { wx.navigateTo({ url: '/pages/question-detail/question-detail?mode=ask' }) },
  reportHistory() { wx.navigateTo({ url: '/pages/report-history/report-history' }) },
  reviewDemo() { wx.navigateTo({ url: '/pages/moderation/moderation' }) }
})
