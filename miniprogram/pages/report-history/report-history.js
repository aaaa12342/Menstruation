const community = require('../../services/community-service')

Page({
  data: { list: [] },
  onShow() { this.setData({ list: community.myReports() }) }
})
