/**
 * toptitle
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-11 15:23:12
 * @version 1.0.0
 */

define(function (require, exports, module) {
	var $ = require('jquery'),
		AppRouter = require('lib/AppRouter');


	var appRouter = new AppRouter();
	var items = $('.am-tab .am-tab-item');

	exports.init = function(){
		$(items).on('click', function(e){
            e.preventDefault();
			var id = e.target.id;
			var urlId = id.split('');
			var item = this;
			$(item).attr('data-tab', 'selected').siblings().attr('data-tab', '');
			choseUrl(urlId[urlId.length - 1]);
		});
		function choseUrl(code){
			switch (Number(code)){
				case 1:
					appRouter.navigate('', {trigger: true});
					break;
				case 2:
					appRouter.navigate('maps', {trigger: true});
					break;
				case 3:
					appRouter.navigate('stations', {trigger: true});
					break;
				default:
					appRouter.navigate('', {trigger: true});
					break;
			}
		}
	};

	exports.refreshTopTitle = function(){
		var hash = window.location.hash;
		if(hash.match("#/") == '#/'){
			$(items).eq(0).attr('data-tab', 'selected').siblings().attr('data-tab', '');
		}
		else if(hash.match("#/stations") == '#/stations'){
			$(items).eq(2).attr('data-tab', 'selected').siblings().attr('data-tab', '');
		}
	};

});