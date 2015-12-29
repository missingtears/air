/**
 * weeklayout
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-19 10:45:51
 * @version 1.0.0
 */

define(function (require, exports, module) {
	var $ = require('jquery');
		// touch = require('zepto-touch');

	exports.init = function(){
		var containerWidth = Math.abs($(window).width());
		var parent = $('.air-temp-weather .container').eq(0);
		var items = $('.air-temp-weather .container > .items');
		$(items).css('width', Math.floor(containerWidth / 5) + 'px');
		var parentWidth = Math.ceil(Math.floor(containerWidth / 5) * items.length);
		var remainWidth = Math.ceil(Math.floor(containerWidth / 5) * (items.length - 5));
		parent.css({
			'width': parentWidth + 'px',
			// 当 items 为 5的时候，增加2个像素的宽度，使iscroll起效果。
			'padding': '0 1px',
		});
		$('.weatherwrapperscroller').eq(0).css({
			'width': parentWidth + 'px',
			'padding': '0 1px'
		});
		
		// if(items.length > 5){
		// 	//distance();
		// }
		// var ds = 0;
		// function distance(){
	 //        var startPosition, endPosition, deltaX, deltaY, moveLength;

	 //        $(parent).on('touchstart', function (e) {
	 //            var touch = e.touches[0];
	 //            startPosition = {
	 //                x: touch.pageX,
	 //                y: touch.pageY
	 //            }
	 //        });
        	
	 //        $(parent).on('touchmove', function (e) {
	 //            var touch = e.touches[0];
	 //            endPosition = {
	 //                x: touch.pageX,
	 //                y: touch.pageY
	 //            }

	 //            deltaX = endPosition.x - startPosition.x;
	 //            deltaY = endPosition.y - startPosition.y;
	 //            //moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
		// 		//console.log(deltaX + '----' + moveLength + '-----' + deltaY);
		// 		if(deltaX < 0){
		// 			if (Math.abs(ds) >= remainWidth) {
		// 				ds = -remainWidth;
		// 			}
		// 			else{
		// 				ds -= Math.abs(deltaX);
		// 			}
		// 		}
		// 		else{
		// 			if (ds >= 0) {
		// 				ds = 0;
		// 			}
		// 			else{
		// 				ds += Math.abs(deltaX);
		// 			}
		// 		}

		// 		$(this).css('left', ds + 'px');
	 //        });

		// }

	};
});
