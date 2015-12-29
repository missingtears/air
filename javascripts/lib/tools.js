/**
 * tools
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-18 15:31:14
 * @version 1.0.0
 */

define(function (require, exports, module) {
	var $ = require('jquery'),
        interface = require('lib/interface');
	return {
        refreshTime: function(distime){
            var seconds = Math.round(distime / 1000);
            if(seconds <= 0){
                result = '0秒前更新';
            }
            else if(seconds > 0 && seconds < 60){
                result = seconds + '秒前更新';
            }
            else if(seconds < 3600){
                result = Math.round(seconds/60) + '分钟前更新';
            }
            else if(seconds/3600 < 24){
                result = Math.round(seconds/3600) + '小时前更新';
            }
            else if(seconds/86400 < 30){
                result = Math.round(seconds/86400) + '天前更新';
            }
            return result;
        },
        parseDate: function(strtime){
            var parts = $.trim(strtime).split(' ');
            var dParts = parts[0].split('-');
            var sParts = parts[1].split(':');
            // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
            return new Date(dParts[0], dParts[1]-1, dParts[2], sParts[0], sParts[1], sParts[2]);
        },
        weekFormat: function(week){
            switch(week){
                case 1:
                    return '一';
                    break;
                case 2:
                    return '二';
                    break;
                case 3:
                    return '三';
                    break;
                case 4:
                    return '四';
                    break;
                case 5:
                    return '五';
                    break;
                case 6:
                    return '六';
                    break;
                default:
                    return '日';
                    break;
            }
        },
        aqiColor: function(type){
            //console.log(type);
        	switch($.trim(type)){
        		case '优':
        			return 'rgba(71, 211, 65, 1)';
        			break;
        		case '良':
                    return 'rgba(212, 210, 0, 1)';
        			break;
        		case '轻度污染':
                    return 'rgba(255, 158, 18, 1)';
        			break;
        		case '中度污染':
                    return 'rgba(234, 68, 68, 1)';
        			break;
        		case '重度污染':
                    return 'rgba(150, 27, 173, 1)';
        			break;
                case '严重污染':
                    return 'rgba(142, 0, 0, 1)';
                    break;
        		default:
                    return 'rgba(229, 227, 237, 100)';
        			break;
        	}
        },
        weatherFormat: function(weather){
            if(weather.indexOf('雨') > 0){
                return 1;
            }
            else if(weather.indexOf('雪') > 0){
                return 2;
            }
            else{
                return 0;
            }
        },
        getWeatherIcon: function(weather, index){
            if(weather.indexOf('晴') >= 0){
                return index == 1 ? interface.weatherIcons.sunny_cur : interface.weatherIcons.sunny;
            }
            else if(weather.indexOf('云') >= 0){
                return index == 1 ? interface.weatherIcons.cloudy_cur : interface.weatherIcons.cloudy;
            }
            else if(weather.indexOf('雨') >= 0){
                return index == 1 ? interface.weatherIcons.rain_cur : interface.weatherIcons.rain;
            }
            else if(weather.indexOf('雷') >= 0){
                return index == 1 ? interface.weatherIcons.lighting_cur : interface.weatherIcons.lighting;
            }
            else if(weather.indexOf('雪') >= 0){
                return index == 1 ? interface.weatherIcons.snow_cur : interface.weatherIcons.snow;
            }
            else{
                return index == 1 ? interface.weatherIcons.sunny_cur : interface.weatherIcons.sunny;
            }
        },
        isDays: function(){
            // get hours of the day in 24Hr format (0-23)
            var hr = (new Date()).getHours();
            if(hr >= 6 && hr <= 18){
                return true;
            }
            else{
                return false;
            }
        },
        getDates: function(index){
            var date = new Date();
            var today = date.getDay();
            var tomorrow2 = new Date(new Date().getTime() + 2 * (24 *  60 * 60 * 1000)).getDay();
            var tomorrow3 = new Date(new Date().getTime() + 3 * (24 *  60 * 60 * 1000)).getDay();
            var tomorrow4 = new Date(new Date().getTime() + 4 * (24 *  60 * 60 * 1000)).getDay();
            if(index == 0){
                return '昨天';
            }
            else if(index == 1){
                return '今天';
            }
            else if(index == 2){
                return '明天';
            }
            else if(index == 3){
                return '星期' + this.weekFormat(tomorrow2);
            }
            else if(index == 4){
                return '星期' + this.weekFormat(tomorrow3);
            }
            else if(index == 5){
                return '星期' + this.weekFormat(tomorrow4);
            }
        },
        getAdvice: function(aqi, weather){
            if(aqi >= 0 && aqi <= 100){
                //1-2级
                return {
                    'breath': interface.advice.breath_good,
                    'moving': (weather.indexOf('雨') >= 0 || weather.indexOf('雪') >= 0 || weather.indexOf('雷') >= 0) ? 
                        interface.advice.moving_bad : 
                        interface.advice.moving_good,
                    'rain': (weather.indexOf('雨') >= 0 || weather.indexOf('雪') >= 0 || weather.indexOf('雷') >= 0) ? 
                        interface.advice.rain_bad : 
                        interface.advice.rain_good,
                    'window': interface.advice.window_good,
                    'air': interface.advice.air_good
                };
            }
            else{
                return {
                    'breath': interface.advice.breath_bad,
                    'moving': interface.advice.moving_bad,
                    'rain': (weather.indexOf('雨') >= 0 || weather.indexOf('雪') >= 0 || weather.indexOf('雷') >= 0) ? 
                        interface.advice.rain_bad : 
                        interface.advice.rain_good,
                    'window': interface.advice.window_bad,
                    'air': interface.advice.air_bad
                };
            }
        }
	};
});