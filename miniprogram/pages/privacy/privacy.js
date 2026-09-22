const community = require('../../services/community-service')
Page({
  clearData() {
    wx.showModal({
      title: '删除本机社区数据？',
      content: '这会删除当前设备保存的帖子、回复和未读状态，删除后无法恢复。',
      success(result) {
        if (!result.confirm) return
        community.clearData()
        wx.showToast({ title: '本机数据已删除', icon: 'none' })
      }
    })
  }
})
