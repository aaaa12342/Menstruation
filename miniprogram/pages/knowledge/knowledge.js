const service = require('../../services/data-service')
Page({
  data: { list: service.knowledge, rumors: service.rumors, active: 'all' },
  filter(e) { this.setData({ active: e.currentTarget.dataset.type }) },
  open(e) { wx.navigateTo({ url: `/pages/knowledge-detail/knowledge-detail?id=${e.currentTarget.dataset.id}` }) },
  openRumor(e) { wx.navigateTo({ url: `/pages/knowledge-detail/knowledge-detail?type=rumor&id=${e.currentTarget.dataset.id}` }) }
})
