const service = require('../../services/data-service')
Page({ data: { item: {} }, onLoad(options) { this.setData({ item: service.getProject(options.id) }) }, external() { wx.showModal({ title: '参与提示', content: '演示版本将引导你前往项目官方公开渠道，请先核实项目信息与参与方式。', showCancel: false }) } })
