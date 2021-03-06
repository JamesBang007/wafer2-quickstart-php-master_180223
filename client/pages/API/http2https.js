// pages/API/http2https.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    requestResult: '',
    canIUseClipboard: wx.canIUse('setClipboardData')
  },

  token: function () {
    util.showBusy('请求中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/http2Https`,
      data: {
        url: 'http://chengdu.gulove.com/api/x.php?catid=11&page=1&pagesize=10'
      },
      login: false,
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  }
  //qita

})


