const community = require('../../services/community-service')
const bookmarks = require('../../services/bookmark-service')
Page({
  clearData() {
    wx.showModal({
      title: '删除本机演示数据？',
      content: '这会删除当前设备保存的帖子、回复、举报记录、未读状态和科普收藏，删除后无法恢复。',
      success(result) {
        if (!result.confirm) return
        community.clearData()
        bookmarks.clear()
        wx.showToast({ title: '本机数据已删除', icon: 'none' })
      }
    })
  }
})
