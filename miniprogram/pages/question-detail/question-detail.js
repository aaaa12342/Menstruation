const community = require('../../services/community-service')
Page({
  data: {
    mode: 'view', item: {}, title: '', body: '', tag: '其他', scope: '全校广场',
    replyText: '', agreed: false, submitted: false, replies: [], canReply: false, canDelete: false
  },
  onLoad(options) {
    if (options.mode === 'ask') this.setData({ mode: 'ask' })
    else { this.postId = options.id; this.refresh() }
  },
  onShow() { if (this.postId) this.refresh() },
  refresh() {
    const item = community.postById(this.postId)
    if (!item) return
    const replies = (item.replies || (item.answer ? [{ id: 'example', text: item.answer, status: '已通过' }] : []))
      .filter(reply => reply.status === '已通过')
    const canReply = item.status === '已通过' && item.id.indexOf('post-') === 0
    this.setData({ item, replies, canReply, canDelete: community.isMine(item.id) })
    community.markRead(item.id)
  },
  input(e) { this.setData({ [e.currentTarget.dataset.field]: e.detail.value }) },
  selectTag(e) { this.setData({ tag: e.currentTarget.dataset.value }) },
  selectScope(e) { this.setData({ scope: e.currentTarget.dataset.value }) },
  toggleAgreement() { this.setData({ agreed: !this.data.agreed }) },
  submit() {
    if (!this.data.agreed) return wx.showToast({ title: '请先阅读并同意本机保存说明', icon: 'none' })
    const text = this.data.title + ' ' + this.data.body
    const reason = community.screen(text)
    if (reason) return wx.showToast({ title: reason, icon: 'none' })
    if (community.risky(text)) {
      wx.showModal({
        title: '请关注身体信号',
        content: '你描述的情况可能需要专业医疗帮助，请尽快咨询校医或前往正规医院。问题仍可提交审核。',
        showCancel: false,
        success: () => this.savePost()
      })
    } else this.savePost()
  },
  savePost() {
    const result = community.submitPost(this.data)
    if (result.error) return wx.showToast({ title: result.error, icon: 'none' })
    this.setData({ submitted: true })
  },
  reply() {
    const result = community.submitReply(this.postId, this.data.replyText)
    if (result.error) return wx.showToast({ title: result.error, icon: 'none' })
    this.setData({ replyText: '' })
    wx.showModal({ title: '回复已提交', content: '回复将先进入本机审核演示台，通过后才会显示。', showCancel: false })
  },
  report(e) {
    const { kind, id, postId, snippet } = e.currentTarget.dataset
    wx.showActionSheet({
      itemList: community.reportReasons,
      success: result => {
        const submitted = community.submitReport({
          kind, id, postId, snippet, reason: community.reportReasons[result.tapIndex]
        })
        wx.showToast({ title: submitted.error || '举报已提交审核', icon: 'none' })
      }
    })
  },
  deleteOwnPost() {
    wx.showModal({
      title: '删除这条帖子？',
      content: '帖子、回复和关联举报记录会从当前设备删除，删除后无法恢复。',
      success: result => {
        if (!result.confirm) return
        const deleted = community.deletePost(this.postId)
        wx.showToast({ title: deleted ? '帖子已删除' : '删除失败', icon: 'none' })
        if (deleted) {
          community.setNextView('mine')
          wx.switchTab({ url: '/pages/community/community' })
        }
      }
    })
  },
  back() {
    community.setNextView('mine')
    wx.switchTab({ url: '/pages/community/community' })
  },
  privacy() { wx.navigateTo({ url: '/pages/privacy/privacy' }) }
})
