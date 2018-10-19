var request = require('request');
var schedule = require('node-schedule');

function scheduleCronstyle(){
    schedule.scheduleJob('0 0 9 * * *', function(){
            request('http://v.juhe.cn/weather/index?cityname=2235&dtype=&format=&key=e0b4645d92d6676912c335816b3e9888', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  var result = JSON.parse(body)['result'];
                  var temp = '现在气温'+result['sk']['temp']+'摄氏度。今天气温在'+result['today']['temperature']+'之间，天气：'+result['today']['weather']+',风力：'+result['today']['wind']+'。穿衣指数：'+result['today']['dressing_advice'];
                  console.log(123, temp)
                }
            })
    }); 
}

scheduleCronstyle();