/**
 * iscrollcontrol
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-26 09:45:33
 * @version 1.0.0
 */

define(function (require, exports, module) {

	var $ = require('jquery'),
		IScroll = require('iscroll-probe');

	var indexContainer = null;
	function init(){

		function updatePosition(){
			var y = this.y>>0;
			console.log(this.y>>0);
			if(y > -50){
				indexContainer.refresh();
				indexContainer.scrollBy(0, -50);
				//indexContainer.scrollTo(0, -60);
			}
		}

		function indexLoaded () {
			if(indexContainer){
				indexContainer.refresh();
			}
			else{
				indexContainer = new IScroll('#wrapper', {
					bounceEasing: 'elastic',
					bounceTime: 1200,
					scrollbars: false,
					mouseWheel: true,
					interactiveScrollbars: true,
					shrinkScrollbars: 'scale',
					click: true,
					bounce: true,	// 边界反弹
					fadeScrollbars: true,
					probeType: 3,
					// startY: -50,
					momentum: true	// 允许有惯性滑动
				});
				//indexContainer.on('scroll', updatePosition);
				//indexContainer.on('scrollEnd', updatePosition);
			}
		}

		function weekLoaded(){
			new IScroll('#weatherwrapper', { scrollX: true, scrollY: false, mouseWheel: true });
		}

		function chartLoaded(){
			new IScroll('#chartScroll', { 
            	scrollX: true,
            	scrollY: false, 
            	mouseWheel: true,
            	click: true
            });
		}
		window.addEventListener('load', setTimeout(function () { 
			indexLoaded();
			weekLoaded();
			chartLoaded();
		}, 50), false);

		document.addEventListener('touchmove', function (e) { 
			e.preventDefault();
		}, false);
	};
	function stationsIndex(){

		function updatePosition(){
			//console.log(this.y>>0);
		}

		function indexLoaded () {
			if(indexContainer){
				indexContainer.refresh();
			}
			else{
				indexContainer = new IScroll('#wrapper', {
					//bounceEasing: 'elastic',
					//bounceTime: 1200,
					scrollbars: false,
					mouseWheel: true,
					interactiveScrollbars: true,
					shrinkScrollbars: 'scale',
					click: true,
					bounce: true,	// 边界反弹
					fadeScrollbars: true,
					probeType: 3,
					momentum: true	// 允许有惯性滑动
				});
				indexContainer.on('scroll', updatePosition);
				indexContainer.on('scrollEnd', updatePosition);
			}
		}

		function weekLoaded(){
			new IScroll('#weatherwrapper', { scrollX: true, scrollY: false, mouseWheel: true });
		}

		window.addEventListener('load', setTimeout(function () { 
			indexLoaded();
			weekLoaded();
		}, 50), false);

		document.addEventListener('touchmove', function (e) { 
			e.preventDefault();
		}, false);
	};

	var stationsScroll;
	function stationsScroller(){

		function loaded () {
			if(stationsScroll){
				stationsScroll.refresh();
			}
			else{
				stationsScroll = new IScroll('#stations-scroll-id', { 
					bounceEasing: 'elastic',
					bounceTime: 1200,
					mouseWheel: true,
					click: true 
				});
			}
		}
		loaded();

		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	}

	module.exports = {
		'init': init,
		'stationsIndex': stationsIndex,
		'stationsScroller': stationsScroller
	};
});