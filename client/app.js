//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

//阿拉丁统计
var aldstat = require("./utils/ald-stat.js");

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  //复制官方示例 开始
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null,
    token: null
  },
  // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      console.log('微信登录');

      wx.login({
        success: function (data) {
          wx.request({
            url: config.service.openidUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res.data)
              self.globalData.openid = res.data.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })

      // 调用登录接口
      /*
      qcloud.login({
        success(result) {
          if (result) {
            //util.showSuccess('登录成功')
            console.log('登录成功')
            that.setData({
              userInfo: result,
              logged: true
            })
          } else {
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            qcloud.request({
              url: config.service.requestUrl,
              login: true,
              success(result) {
                console.log('登录成功')
                that.setData({
                  userInfo: result.data.data,
                  logged: true
                })
              },

              fail(error) {
                //util.showModel('请求失败', error)
                console.log('请求失败 request fail', error)
              }
            })
          }
        },

        fail(error) {
          util.showModel('登录失败', error)
          console.log('登录失败', error)
        }
      })
      */
      // 调用登录接口 end
    }
  },
  //复制官方示例 结束

  // 获取access_token
  getToken: function (callback) {
    var self = this
    wx.request({
      url: config.service.accessToken,
      data: {
        appname: 'scly'
      },
      success: function (res) {
        console.log('拉取access_token成功', res.data)
        self.globalData.token = res.data.token
        callback(null, self.globalData.token)
      },
      fail: function (res) {
        console.log('拉取access_token失败，将无法正常使用开放接口等服务', res)
        callback(res)
      }
    })
  }


})