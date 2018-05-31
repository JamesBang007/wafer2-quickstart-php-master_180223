const templateMessageUrl = require('../../config').templateMessageUrl

var app = getApp()

const formData = {
  product: '特斯拉 model 3',
  uname: '李子明',
  tel: '18914725836',
  time: '2018.03.03'
}

Page({
  onLoad: function () {
    this.setData({
      formData
    })
  },

  submitForm: function (e) {
    var self = this
    var form_id = e.detail.formId
    var form_data = e.detail.value
    console.log(form_id);
    self.setData({
      loading: true
    })

    app.getUserOpenId(function (err, openid) {
      console.log(openid);

      if (!err) {
        var tp_data = {
          "touser": openid,
          "template_id": "JZ-drXAp7s_u3NP7AUD-WvyjpWnVJcml1qwXgeuX6lI",
          "page": "pages/index/index",
          "form_id": form_id,
          "data": {
            "keyword1": {
              "value": form_data.product
            },
            "keyword2": {
              "value": form_data.uname
            },
            "keyword3": {
              "value": form_data.tel
            },
            "keyword4": {
              "value": form_data.time
            }
          }
        };
        console.log(tp_data);

        wx.request({
          url: 'https://oudzqn6o.qcloud.la/weapp/TemplateMessage',
          data: {
            appname: 'scly',
            formData: tp_data
          },
          header: {
            'content-type': 'application/json'
            //'content-type': 'application/x-www-form-urlencoded'            
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            //console.log('submit form success', res)
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            })
            self.setData({
              loading: false
            })
          },
          fail: function ({ errMsg }) {
            console.log('submit form fail, errMsg is:', errMsg)
          }
        })

      } else {
        console.log('err:', err)
      }
    })

  }

})


