function parseWeatherData(data) {
  var max_degree = new Array();
  var min_degree = new Array();

  //json 没有长度(data.forecast_24h.length)，可以遍历
  for (var key in data.forecast_24h) {
    data.forecast_24h[key].sDay = sDay(data.forecast_24h[key].time);
    data.forecast_24h[key].sDate = sDate(data.forecast_24h[key].time);
    //console.log(data.forecast_24h[key].max_degree);
    max_degree.push(data.forecast_24h[key].max_degree);
    min_degree.push(data.forecast_24h[key].min_degree);
  }
  data.max_degree = max_degree;
  data.min_degree = min_degree;

  var p = { "00": "C2", "01": "C9", "02": "C1", "03": "C3", "04": "C3", "05": "C3", "06": "C3", "07": "C3", "08": "C3", "09": "C3", 10: "C3", 11: "C3", 12: "C3", 13: "C4", 14: "C4", 15: "C4", 16: "C4", 17: "C4", 18: "C5", 19: "C3", 20: "C7", 21: "C3", 22: "C3", 23: "C3", 24: "C3", 25: "C3", 26: "C4", 27: "C4", 28: "C4", 29: "C7", 30: "C7", 31: "C7", 53: "C6", 99: "C8", 32: "C5", 49: "C5", 54: "C6", 55: "C6", 56: "C6", 57: "C5", 58: "C5", 301: "C3", 302: "C4" }
  data.l = data.observe.weather_code ? p[data.observe.weather_code] : "C2";

  //return e.weather && e.aqi && e.aqi.aqi>200 && "C7"!==l &&(l="C6"),
  //id:"sec-main",className:"container "+l+" "+(e.isDay?"day":"night")

  return data;
}

//日期转周几
function sDay(str) {
  var result
  var arr_week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");

  var d = new Date(str + ' 00:00:00'); //创建 Date 对象
  var day = d.getDay(); //返回一周中的某一天 (0 ~ 6)
  var now = new Date();
  var t = d - now;

  if (t < -86400000) {
    result = "昨天";
  } else if (t < 0) {
    result = "今天";
  } else if (t < 86400000) {
    result = "明天";
  } else if (t < 172800000) {
    result = "后天";
  } else {
    result = arr_week[day];
  }

  return result;
}
//日期格式化
function sDate(str) {
  //var r = str.substring(5).replace("-", "月") + "日"
  var result = str.substring(5).replace("-", "/")

  return result;
}

//请求数据
function doRequest(that, isTour, city) {
  var apiWeatherUrl;
  var d = new Date().getHours();
  var day = d > 6 && d < 19 ? 'day' : 'night';

  if (isTour) {
    apiWeatherUrl = "https://wis.qq.com/weather/tourist?source=xw&weather_type=observe|rise|air|forecast_24h|alarm|limit|tips&tourist=" + city;
  } else {
    apiWeatherUrl = "https://wis.qq.com/weather/common?source=xw&weather_type=observe|rise|air|forecast_24h|alarm|limit|tips&province=四川&city=" + city + "&county=";
  }
  wx.request({
    url: apiWeatherUrl,
    data: {},
    success: function (res) {
      //console.log(res.data);
      var weatherData = parseWeatherData(res.data.data);
      that.setData({
        weatherData: weatherData,
        loactionOn: 'close',
        handleLocation: city,
        isDay: day
      });
      wx.setStorage({
        key: city,
        data: weatherData
      })
    }
  })

}

//echarts 可视化图表
function setOption(chart, max_degree, min_degree) {
  const option = {
    backgroundColor: "rgba(0,0,0,0.0)",
    color: ["#FCC370", "#94CCF9"],
    xAxis: [{
      type: "category",
      show: !1,
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
}


module.exports = {
  parseWeatherData: parseWeatherData,
  setOption: setOption,
  doRequest: doRequest
}