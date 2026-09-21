const service = require('../../services/data-service')
Page({ data: { list: service.projects, active: '全部' }, filter(e) { this.setData({ active: e.currentTarget.dataset.category }) }, open(e) { wx.navigateTo({ url: `/pages/project-detail/project-detail?id=${e.currentTarget.dataset.id}` }) } })
