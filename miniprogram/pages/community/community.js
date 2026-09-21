const service = require('../../services/data-service')
Page({ data: { list: service.questions, scope: 'all', input: '' }, switchScope(e) { this.setData({ scope: e.currentTarget.dataset.scope }) }, open(e) { wx.navigateTo({ url: `/pages/question-detail/question-detail?id=${e.currentTarget.dataset.id}` }) }, ask() { wx.navigateTo({ url: '/pages/question-detail/question-detail?mode=ask' }) } })
