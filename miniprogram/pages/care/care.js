const service = require('../../services/data-service')
Page({ data: { package: service.carePackage }, goApply() { wx.navigateTo({ url: '/pages/care-apply/care-apply' }) }, showStatus() { wx.showModal({ title: '模拟查询', content: '请输入申请编号后可查询。演示中可直接点击“申请关怀包”体验完整流程。', showCancel: false }) } })
