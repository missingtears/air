/**
 * alipay api
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-11 14:10:02
 * @version 1.0.0
 */

define(function (require, exports, module) {
	var alipay = {
		// 设置标题
		setTitle: function(title){
			document.addEventListener('AlipayJSBridgeReady', function () {
				AlipayJSBridge.call("setTitle", {

				    title: title
				});
			});
		},
		hideOptionMenu: function(){
			document.addEventListener('AlipayJSBridgeReady', function () {
				AlipayJSBridge.call("hideOptionMenu");
			});
		},
		showLoading: function(){
			document.addEventListener('AlipayJSBridgeReady', function () {
				// 显示
				AlipayJSBridge.call('showLoading', {

				     text: '加载中',
				     delay: 1000
				});
			});
		},
		hideLoading: function(){
			document.addEventListener('AlipayJSBridgeReady', function () {
				// 隐藏
				AlipayJSBridge.call('hideLoading');
			});
		},
		pushWindow: function(url){
			document.addEventListener('AlipayJSBridgeReady', function () {
				// 开新窗口
				AlipayJSBridge.call('pushWindow', {

				     url: url//,
				     // param: {
				     //   readTitle: true,
				     //   defaultTitle: true,
				     //   showToolBar: false
				     //   // ...
				     // }
				});
			});
		},
		popWindow: function(url){
			document.addEventListener('AlipayJSBridgeReady', function () {
				// 关闭窗口，可传递参数
				AlipayJSBridge.call('popWindow',{

				    data: {
				    }
				});
			});
		},
		back: function(){
			document.addEventListener('AlipayJSBridgeReady', function () {
				document.addEventListener('back', function (e) {
				    e.preventDefault();
				    // 关闭窗口（别名）
					AlipayJSBridge.call('closeWebview');
				}, false);
			});

		},
		showTitlebar: function(){
			document.addEventListener('AlipayJSBridgeReady', function () {
				// 隐藏标题栏
				AlipayJSBridge.call("showTitlebar");
			});

		},
		alert: function(){
			document.addEventListener('AlipayJSBridgeReady', function () {
				AlipayJSBridge.call('alert', {

				     title: '出错了',
				     message: '无法获取数据，请联系管理员',
				     button: '确定'
				}, function () {

				     console.log('alert dismissed');
				});
			});

		}
	};


	return alipay;
});