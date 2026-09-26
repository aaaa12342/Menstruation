const service = require('../../services/data-service')
const bookmarks = require('../../services/bookmark-service')
Page({
  data: { list: [], rumors: [], active: 'all', query: '', favoritesOnly: false },
  onShow() { this.refresh() },
  refresh() {
    let list = service.searchKnowledge(this.data.query, this.data.active)
    let rumors = service.searchRumors(this.data.query)
    if (this.data.favoritesOnly) {
      list = list.filter(item => bookmarks.has('knowledge', item.id))
      rumors = rumors.filter(item => bookmarks.has('rumor', item.id))
    }
    this.setData({ list, rumors })
  },
  filter(e) { this.setData({ active: e.currentTarget.dataset.type }, () => this.refresh()) },
  search(e) { this.setData({ query: e.detail.value }, () => this.refresh()) },
  toggleFavorites() { this.setData({ favoritesOnly: !this.data.favoritesOnly }, () => this.refresh()) },
  open(e) { wx.navigateTo({ url: `/pages/knowledge-detail/knowledge-detail?id=${e.currentTarget.dataset.id}` }) },
  openRumor(e) { wx.navigateTo({ url: `/pages/knowledge-detail/knowledge-detail?type=rumor&id=${e.currentTarget.dataset.id}` }) }
})
