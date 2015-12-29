/**
 * r.js build
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-05-26 09:20:15
 * @version 1.0.0
 */

({
    baseUrl: '.',
    //urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		// Jquery should be zepto, probably a better way to do this...
      	//'jquery': RegExp("AppleWebKit/").test(navigator.userAgent) ? '../bower_components/zepto/zepto' : '../bower_components/jquery/dist/jquery',
      	'jquery': '../bower_components/zepto/zepto.min',
		'underscore': '../bower_components/underscore/underscore-min',
		'backbone': '../bower_components/backbone/backbone-min',
		'domReady': '../bower_components/requirejs-domready/domReady',
		//'iscroll': './plugin/iscroll-master/build/iscroll',
		'iscroll-probe': './plugin/iscroll-master/build/iscroll-probe',
		// 'zepto-touch': '../bower_components/zeptotouch/zepto-touch.min',
		'text': '../bower_components/text/text',
		'chartjs': '../bower_components/Chart.js/Chart.min'
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		// 'iscroll': {
		// 	deps: ['jquery'],
		// 	exports: 'IScroll'
		// },
		// 'zepto-touch': ['jquery'],
		'iscroll-probe': {
			deps: ['jquery'],
			exports: 'IScroll'
		}
	},
	// map: {
	// 	'*': {
	// 		'css': '../bower_components/require-css/css' // or whatever the path to require-css is
	// 	}
	// },
    name: "main",
    out: "main-built.js"
})