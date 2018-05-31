// pages/weather/show.js
var api = require('./api.js');
import * as echarts from '../../vendor/ec-canvas/echarts';

var max_degree = [17, 19, 24, 30, 26, 19, 21, 26];
var min_degree = [11, 15, 20, 15, 18, 16, 19, 22];

//echarts 可视化图表
//function initChart(canvas, width, height) {
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "rgba(0,0,0,0.0)",
    color: ["#FCC370", "#94CCF9"],
    xAxis: [{
      type: "category",
      show: !1,
      //data: s
      data: ['一', '二', '三', '四', '五', '六', '七', '八']
    }],
    yAxis: [{
      type: "value",
      show: !1,
      boundaryGap: ["50%", "50%"],
      scale: !0
    }],
    grid: {
      x: 0,
      y: 0,
      y2: 0,
      height: '136px',
      width: "100%",
      borderWidth: "0px"
    },
    series: [{
      type: "line",
      data: max_degree,
      smooth: !0,
      symbol: "circle",
      symbolSize: 6,
      clipOverflow: !1,
      lineStyle: {
        normal: {
          width: 2
        }
      },
      label: {
        normal: {
          show: !0,
          textStyle: {
            fontSize: "14",
            color: "#434343"
          },
          distance: 10,
          //加符号 °
          formatter: function (t) {
            return 0 == t.dataIndex ? "{first|" + t.data + "\xb0}" : t.data + "\xb0"
          },
          //前一天
          rich: {
            first: {
              fontSize: "14",
              color: "#ccc"
            }
          }
        }
      }
    }, {
      type: "line",
      data: min_degree,
      smooth: !0,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        normal: {
          width: 2
        }
      },
      label: {
        normal: {
          show: !0,
          position: "bottom",
          textStyle: {
            fontSize: "14",
            color: "#434343"
          },
          distance: 10,
          formatter: function (t) {
            return 0 == t.dataIndex ? "{first|" + t.data + "\xb0}" : t.data + "\xb0"
          },
          rich: {
            first: {
              fontSize: "14",
              color: "#ccc"
            }
          }
        }
      }
    }]
  };

  chart.setOption(option);  
  return chart;
}

var apiWeatherUrl = "http://cdn.weather.hao.360.cn/sed_api_weather_info.php?app=guideEngine&fmt=json";
var weather = { "air": { "aqi": 102, "aqi_level": 3, "aqi_name": "轻度污染", "co": "1.1", "no2": "77", "o3": "125", "pm10": "154", "pm2.5": "73", "so2": "12", "update_time": "201804102000" }, "alarm": {}, "forecast_24h": { "0": { "day_weather": "多云", "day_weather_code": "01", "day_weather_short": "多云", "day_wind_direction": "微风", "day_wind_direction_code": "0", "day_wind_power": "3", "day_wind_power_code": "0", "max_degree": "27", "min_degree": "15", "night_weather": "多云", "night_weather_code": "01", "night_weather_short": "多云", "night_wind_direction": "微风", "night_wind_direction_code": "0", "night_wind_power": "3", "night_wind_power_code": "0", "time": "2018-04-09" }, "1": { "day_weather": "多云", "day_weather_code": "01", "day_weather_short": "多云", "day_wind_direction": "微风", "day_wind_direction_code": "0", "day_wind_power": "3", "day_wind_power_code": "0", "max_degree": "27", "min_degree": "17", "night_weather": "阴", "night_weather_code": "02", "night_weather_short": "阴", "night_wind_direction": "微风", "night_wind_direction_code": "0", "night_wind_power": "3", "night_wind_power_code": "0", "time": "2018-04-10" }, "2": { "day_weather": "多云", "day_weather_code": "01", "day_weather_short": "多云", "day_wind_direction": "微风", "day_wind_direction_code": "0", "day_wind_power": "3", "day_wind_power_code": "0", "max_degree": "26", "min_degree": "17", "night_weather": "小雨", "night_weather_code": "07", "night_weather_short": "小雨", "night_wind_direction": "微风", "night_wind_direction_code": "0", "night_wind_power": "3", "night_wind_power_code": "0", "time": "2018-04-11" }, "3": { "day_weather": "小雨", "day_weather_code": "07", "day_weather_short": "小雨", "day_wind_direction": "微风", "day_wind_direction_code": "0", "day_wind_power": "3", "day_wind_power_code": "0", "max_degree": "24", "min_degree": "15", "night_weather": "小雨", "night_weather_code": "07", "night_weather_short": "小雨", "night_wind_direction": "微风", "night_wind_direction_code": "0", "night_wind_power": "3", "night_wind_power_code": "0", "time": "2018-04-12" }, "4": { "day_weather": "小雨", "day_weather_code": "07", "day_weather_short": "小雨", "day_wind_direction": "微风", "day_wind_direction_code": "0", "day_wind_power": "3", "day_wind_power_code": "0", "max_degree": "19", "min_degree": "9", "night_weather": "阴", "night_weather_code": "02", "night_weather_short": "阴", "night_wind_direction": "微风", "night_wind_direction_code": "0", "night_wind_power": "3", "night_wind_power_code": "0", "time": "2018-04-13" }, "5": { "day_weather": "多云", "day_weather_code": "01", "day_weather_short": "多云", "day_wind_direction": "微风", "day_wind_direction_code": "0", "day_wind_power": "3", "day_wind_power_code": "0", "max_degree": "18", "min_degree": "9", "night_weather": "多云", "night_weather_code": "01", "night_weather_short": "多云", "night_wind_direction": "微风", "night_wind_direction_code": "0", "night_wind_power": "3", "night_wind_power_code": "0", "time": "2018-04-14" }, "6": { "day_weather": "多云", "day_weather_code": "01", "day_weather_short": "多云", "day_wind_direction": "微风", "day_wind_direction_code": "0", "day_wind_power": "3", "day_wind_power_code": "0", "max_degree": "21", "min_degree": "9", "night_weather": "多云", "night_weather_code": "01", "night_weather_short": "多云", "night_wind_direction": "微风", "night_wind_direction_code": "0", "night_wind_power": "3", "night_wind_power_code": "0", "time": "2018-04-15" }, "7": { "day_weather": "晴", "day_weather_code": "00", "day_weather_short": "晴", "day_wind_direction": "微风", "day_wind_direction_code": "0", "day_wind_power": "3", "day_wind_power_code": "0", "max_degree": "21", "min_degree": "11", "night_weather": "多云", "night_weather_code": "01", "night_weather_short": "多云", "night_wind_direction": "微风", "night_wind_direction_code": "0", "night_wind_power": "3", "night_wind_power_code": "0", "time": "2018-04-16" } }, "limit": { "tail_number": "2和7", "time": "20180410" }, "observe": { "degree": "24", "humidity": "57", "precipitation": "0", "pressure": "953", "update_time": "201804102020", "weather": "阴", "weather_code": "02", "weather_short": "阴", "wind_direction": "8", "wind_power": "3" }, "rise": { "0": { "sunrise": "06:42", "sunset": "19:28", "time": "20180410" }, "1": { "sunrise": "06:41", "sunset": "19:28", "time": "20180411" }, "2": { "sunrise": "06:40", "sunset": "19:29", "time": "20180412" }, "3": { "sunrise": "06:38", "sunset": "19:30", "time": "20180413" }, "4": { "sunrise": "06:37", "sunset": "19:30", "time": "20180414" }, "5": { "sunrise": "06:36", "sunset": "19:31", "time": "20180415" }, "6": { "sunrise": "06:35", "sunset": "19:31", "time": "20180416" } }, "tips": { "observe": { "0": "天暗下来，你就是阳光~", "1": "现在的温度比较舒适~" } } };

Page({

  /**
   * 页面的初始数据
   */
  data: {
    handleLocation: '四川 成都',
    weatherData: {},
    isDay: 'day',
    voice: false,
    daysShow: false,
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    /*
    wx.request({
      url: apiWeatherUrl,
      data: {
        code: 101270101
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          weatherData: res.data
        })
      }
    })
    */

    var d = new Date().getHours();
    var day = d > 6 && d < 19 ? 'day' : 'night';

    that.setData({
      weatherData: api.parseWeatherData(weather),
      isDay: day,
      daysShow: true
    })

    if(that.data.daysShow){
        console.log(66);
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})