/**
 * interface
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-17 17:03:54
 * @version 1.0.0
 */

define(function(require, exports, module) {
	return {
		'aqiGetCityDataDto': serverIpAddress + '/aqps/mobile/aqiGetCityDataDto.do',
		'aqiGetHistoryDataByCityId': serverIpAddress + '/aqps/mobile/aqiGetHistoryDataByCityId.do',
		'aqiGetChildMonitorsByCityId': serverIpAddress + '/aqps/mobile/aqiGetChildMonitorsByCityId.do',
		'currentIndexBg': {
			'excellent_day': 'citydetail_cellbackground_clear_excellent_day@2x.jpg',
			'excellent_night': 'citydetail_cellbackground_clear_excellent_night@2x.jpg',
			'good_day': 'citydetail_cellbackground_clear_good_day@2x.jpg',
			'good_night': 'citydetail_cellbackground_clear_good_night@2x.jpg',
			'light_day': 'citydetail_cellbackground_clear_light_day@2x.jpg',
			'light_night': 'citydetail_cellbackground_clear_light_night@2x.jpg',
			'moderate_day': 'citydetail_cellbackground_clear_moderate_day@2x.jpg',
			'moderate_night': 'citydetail_cellbackground_clear_moderate_night@2x.jpg',
			'heavy_day': 'citydetail_cellbackground_clear_heavy_day@2x.jpg',
			'heavy_night': 'citydetail_cellbackground_clear_heavy_night@2x.jpg',
			'serious_day': 'citydetail_cellbackground_clear_serious_day@2x.jpg',
			'serious_night': 'citydetail_cellbackground_clear_serious_night@2x.jpg',
			'rain_excellent_day': 'citydetail_cellbackground_rain_excellent_day@2x.jpg',
			'rain_excellent_night': 'citydetail_cellbackground_rain_excellent_night@2x.jpg',
			'rain_good_day': 'citydetail_cellbackground_rain_good_day@2x.jpg',
			'rain_good_night': 'citydetail_cellbackground_rain_good_night@2x.jpg',
			'snow_excellent_day': 'citydetail_cellbackground_snow_excellent_day@2x.jpg',
			'snow_excellent_night': 'citydetail_cellbackground_snow_excellent_night@2x.jpg'
		},
		'weatherIcons': {
			'sunny': 'sunny@3x.png',
			'sunny_cur': 'sunny_h@3x.png',
			'cloudy': 'cloudy@3x.png',
			'cloudy_cur': 'cloudy_h@3x.png',
			'rain': 'rain@3x.png',
			'rain_cur': 'rain_h@3x.png',
			'snow': 'snow@3x.png',
			'snow_cur': 'snow_h@3x.png',
			'lighting': 'lighting@3x.png',
			'lighting_cur': 'lighting_h@3x.png'
		},
		'mapIcons': {
			'excellent': 'aqi1@3x.png',
			'good': 'aqi2@3x.png',
			'light': 'aqi3@3x.png',
			'moderate': 'aqi4@3x.png',
			'heavy': 'aqi5@3x.png',
			'serious': 'aqi6@3x.png',
			'nodata': 'aqi0@3x.png'
		},
		'advice': {
			'breath_good': {
				'text': '畅快呼吸',
				'icon': '1-1@3x.png'
			},
			'breath_bad': {
				'text': '佩戴口罩',
				'icon': '1-2@3x.png'
			},
			'moving_good': {
				'text': '室外运动',
				'icon': '2-1@3x.png'
			},
			'moving_bad': {
				'text': '室内锻炼',
				'icon': '2-2@3x.png'
			},
			'rain_good': {
				'text': '无需雨具',
				'icon': '3-1@3x.png'
			},
			'rain_bad': {
				'text': '携带雨具',
				'icon': '3-2@3x.png'
			},
			'window_good': {
				'text': '开窗通风',
				'icon': '4-1@3x.png'
			},
			'window_bad': {
				'text': '关闭门窗',
				'icon': '4-2@3x.png'
			},
			'air_good': {
				'text': '无需净化',
				'icon': '5-1@3x.png'
			},
			'air_bad': {
				'text': '空气净化',
				'icon': '5-2@3x.png'
			}
		}
	}
});