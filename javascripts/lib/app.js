/**
 * app
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-11 13:54:53
 * @version 1.0.0
 */

define(function (require, exports, module) {

	var domReady = require('domReady'),
		toptitle = require('lib/toptitle');

	exports.initialize = function(){
		domReady(function(){
			toptitle.init();
			Backbone.history.start();
		});
	};
});