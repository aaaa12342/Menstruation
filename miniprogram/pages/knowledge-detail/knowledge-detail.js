const service = require('../../services/data-service')
Page({
  data: { item: {}, isRumor: false },
  onLoad(options) {
    const isRumor = options.type === 'rumor'
    this.setData({ item: isRumor ? service.getRumor(options.id) : service.getKnowledge(options.id), isRumor })
  },
  copySource() { if (this.data.item.source) wx.setClipboardData({ data: this.data.item.source.url }) }
})
