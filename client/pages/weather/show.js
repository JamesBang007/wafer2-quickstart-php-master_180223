// pages/weather/show.js
var api = require('./api.js');
import * as echarts from '../../vendor/ec-canvas/echarts';

var setOption = api.setOption;
function setCanvas(that) {

  // 获取组件
  that.ecComponent = that.selectComponent('#mychart-dom-line');

  //初始化图表
  that.ecComponent.init((canvas, width, height) => {
    // 获取组件的 canvas、width、height 后的回调函数
    // 在这里初始化图表
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    setOption(chart, that.data.weatherData.max_degree, that.data.weatherData.min_degree);
    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
    that.chart = chart;
    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
    return chart;
  });

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: true,
    handleLocation: '四川 成都',
    loactionOn: 'close',
    weatherData: {},
    internal: [
      { province: "四川", city: "成都" },
      { province: "四川", city: "自贡" },
      { province: "四川", city: "攀枝花" },
      { province: "四川", city: "泸州" },
      { province: "四川", city: "德阳" },
      { province: "四川", city: "绵阳" },
      { province: "四川", city: "广元" },
      { province: "四川", city: "遂宁" },
      { province: "四川", city: "内江" },
      { province: "四川", city: "乐山" },
      { province: "四川", city: "南充" },
      { province: "四川", city: "眉山" },
    ],
    tourist: [
      ["九寨沟", "九寨沟风景区"],
      ["峨眉山", "峨眉山风景区"],
      ["稻城", "稻城亚丁风景区"]
    ],
    isDay: 'day',
    voice: false,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    api.doRequest(that, false, '成都');
    setTimeout(function () {
      that.setData({
        showLoading: false
      })
      setCanvas(that);
    }, 500);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /*
   * 切换城市
   */
  locationOn: function () {
    //console.log("切换城市");
    this.setData({
      loactionOn: 'show'
    });
  },
  loactionCancel: function () {
    this.setData({
      loactionOn: 'close'
    });
  },
  tapCity: function (e) {
    var that = this;
    //console.log(e.target);
    api.doRequest(that, false, e.target.dataset.city)
    setCanvas(that);
  }


})