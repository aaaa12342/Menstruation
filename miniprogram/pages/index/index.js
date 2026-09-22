const { carePackage } = require('../../services/data-service')

Page({
  data: { stats: carePackage.stats },
  onShow() { this.setData({ stats: carePackage.stats }) },
  go(e) {
    const url = e.currentTarget.dataset.url
    const tabPages = ['/pages/index/index', '/pages/knowledge/knowledge', '/pages/community/community', '/pages/projects/projects']
    if (tabPages.indexOf(url) > -1) wx.switchTab({ url })
    else wx.navigateTo({ url })
  },
  showNotice() { wx.showModal({ title: '温馨提示', content: '这里提供健康信息与公益资源，不替代医生诊断。如有明显不适，请及时咨询校医或前往正规医院。', showCancel: false }) }
})
