const service = require('../../services/data-service')
Page({ data: { hotline: service.hotline }, call() { wx.makePhoneCall({ phoneNumber: this.data.hotline.number, fail: () => wx.showModal({ title: '演示号码', content: `热线号码：${this.data.hotline.number}\n开发者工具可能无法真实拨号。`, showCancel: false }) }) } })
