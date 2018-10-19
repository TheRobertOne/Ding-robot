var request = require('request');
var schedule = require('node-schedule');

function scheduleCronstyle(){
    schedule.scheduleJob('0 0 9 * * *', function(){
        request('http://v.juhe.cn/weather/index?cityname=2235&dtype=&format=&key=e0b4645d92d6676912c335816b3e9888', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body)['result'];
                var temp = '现在气温'+result['sk']['temp']+'摄氏度。今天气温在'+result['today']['temperature']+'之间，天气：'+result['today']['weather']+',风力：'+result['today']['wind']+'。穿衣指数：'+result['today']['dressing_advice'];
                var content = {
                    "msgtype": "text",
                    "text": {
                        "content": temp
                    }
                }
                var  options = {
                　　　method: 'post',
                    url: 'https://oapi.dingtalk.com/robot/send?access_token=bc56764d715a56643323a209102b6c1af29a54e2c2be221368c8c8b4cf2f0a5a',
                    json: content,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                };
                        
                request(options, function (err, res, body1) {
                    console.log(options)
                    if (err) {
                        console.log('err', err)
                    }else {
                        console.log('body1', body1);
                    }
                })
            }
        })
    })
}

scheduleCronstyle();