//import * as echarts from '../../vendor/ec-canvas/echarts';
//var echarts = require('../../vendor/ec-canvas/echarts.js');

var apiCityWeatherUrl = 'https://wis.qq.com/weather/common?source=xw&weather_type=observe|rise|air|forecast_1h|forecast_24h|index|alarm|limit|tips&province=四川&city=成都&county=';

function parseWeatherData(data) {
    var max_degree = new Array();
    var min_degree = new Array();
    
    //json 没有长度(data.forecast_24h.length)，可以遍历
    for( var key in data.forecast_24h){
        data.forecast_24h[key].sDay = sDay(data.forecast_24h[key].time);
        data.forecast_24h[key].sDate = sDate(data.forecast_24h[key].time);
        //console.log(data.forecast_24h[key].max_degree);
        max_degree.push(data.forecast_24h[key].max_degree);
        min_degree.push(data.forecast_24h[key].min_degree);
    }
    data.max_degree = max_degree;
    data.min_degree = min_degree;
    
    var p = {"00":"C2","01":"C9","02":"C1","03":"C3","04":"C3","05":"C3","06":"C3","07":"C3","08":"C3","09":"C3",10:"C3",11:"C3",12:"C3",13:"C4",14:"C4",15:"C4",16:"C4",17:"C4",18:"C5",19:"C3",20:"C7",21:"C3",22:"C3",23:"C3",24:"C3",25:"C3",26:"C4",27:"C4",28:"C4",29:"C7",30:"C7",31:"C7",53:"C6",99:"C8",32:"C5",49:"C5",54:"C6",55:"C6",56:"C6",57:"C5",58:"C5",301:"C3",302:"C4"}
    data.l = data.observe.weather_code ? p[data.observe.weather_code] : "C2" ;
    
    
    //return e.weather && e.aqi && e.aqi.aqi>200 && "C7"!==l &&(l="C6"),
    //id:"sec-main",className:"container "+l+" "+(e.isDay?"day":"night")
    
    
    return data;
}

//日期转周几
function sDay(str){
    var result
    var arr_week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");

    var d = new Date(str+' 00:00:00'); //创建 Date 对象
    var day = d.getDay(); //返回一周中的某一天 (0 ~ 6)
    var now = new Date();
    var t = d-now;
    
    if( t<-86400000 ){
      result = "昨天";
    }else if( t<0 ){
      result = "今天";
    }else if( t<86400000 ){
      result = "明天";
    }else if( t<172800000 ){
      result = "后天";
    }else{
      result = arr_week[day];
    }
    
    return result;
}
//日期格式化
function sDate(str){
    //var r = str.substring(5).replace("-", "月") + "日"
    var result = str.substring(5).replace("-", "/")

    return result;
}






module.exports = {
    parseWeatherData: parseWeatherData
}