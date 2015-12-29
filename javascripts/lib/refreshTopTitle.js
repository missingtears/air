/**
 * refreshTopTitle
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-07-03 19:38:20
 * @version 1.0.0
 */

define(function (require, exports, module) {
	var $ = require('jquery');

	var items = $('.am-tab .am-tab-item');

	exports.init = function(){
		window.onpopstate = function(event) {
			// alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
			// 
			var hash = document.location.hash;
			if(hash.match("#index") == '#index'){
				$(items).eq(0).attr('data-tab', 'selected').siblings().attr('data-tab', '');
			}
			else if(hash.match("#maps") == '#maps'){
				$(items).eq(1).attr('data-tab', 'selected').siblings().attr('data-tab', '');
			}
			else if(hash.match("#stations") == '#stations'){
				$(items).eq(2).attr('data-tab', 'selected').siblings().attr('data-tab', '');
			}
			else{
				$(items).eq(0).attr('data-tab', 'selected').siblings().attr('data-tab', '');
			}
		};
	};

});