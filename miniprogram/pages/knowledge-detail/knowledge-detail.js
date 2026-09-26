const service = require('../../services/data-service')
const bookmarks = require('../../services/bookmark-service')
Page({
  data: { item: {}, isRumor: false, favorite: false },
  onLoad(options) {
    const isRumor = options.type === 'rumor'
    const item = isRumor ? service.getRumor(options.id) : service.getKnowledge(options.id)
    this.itemId = item.id
    this.itemType = isRumor ? 'rumor' : 'knowledge'
    this.setData({ item, isRumor })
  },
  onShow() { if (this.itemId) this.setData({ favorite: bookmarks.has(this.itemType, this.itemId) }) },
  toggleFavorite() {
    const result = bookmarks.toggle(this.itemType, this.itemId)
    if (result.error) return wx.showToast({ title: result.error, icon: 'none' })
    this.setData({ favorite: result.saved })
    wx.showToast({ title: result.saved ? '已收藏到本机' : '已取消收藏', icon: 'none' })
  },
  copySource() { if (this.data.item.source) wx.setClipboardData({ data: this.data.item.source.url }) }
})
