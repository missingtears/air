/**
 * refreshContentLayout
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-07-03 19:31:03
 * @version 1.0.0
 */

define(function (require, exports, module) {
	var $ = require('jquery');

	exports.init = function(){

		var headerHeight = Math.abs($('#header').height());
		var wrapperHeight = Math.abs($(window).height() - headerHeight);
		$('#wrapper').css({
			'height': wrapperHeight + 'px',
			'top': headerHeight + 'px'
		});
		$('#fpi-map').css({
			'height': wrapperHeight + 'px',
			'top': headerHeight + 'px'
		});
		$('#fpi-stations').css({
			'height': wrapperHeight + 'px',
			'top': headerHeight + 'px'
		});
	};
});