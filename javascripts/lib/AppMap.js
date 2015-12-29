/**
 * AppMap
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-07-03 10:40:29
 * @version 1.0.0
 */

define(function(require, exports, module) {
	var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        alipayApi = require('lib/alipayApi'),
        refreshContentLayout = require('lib/refreshContentLayout'),
        interface = require('lib/interface');

    var AppMapModel = Backbone.Model.extend({
        initialize: function(){
            // 执行构造代码
        },
        validate: function(attrData){

        },
        defaults: {
        }
    });

    var AppMapModelList = Backbone.Collection.extend({

        initialize: function(){

        },
        model: AppMapModel,
        url: interface.aqiGetChildMonitorsByCityId,
        sync : function(method, collection, options) {
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
            return Backbone.sync(method, collection, options);
        },
        parse : function(response) {
            return response;
        }
    });

    var vars = null;
    var points = [];
    var hangzhouMap = null;
    var AppMapView = Backbone.View.extend({
    	el: '#fpi-map',
        initialize: function(options){
            this.render(); 
        },
	    /**
	     * @description 设置地图回调函数
	     */
	    render: function() {
	    	var self = this;
	    	vars = {amount:200, data: this.model};
    		window.MapCallback = function(){
                alipayApi.hideLoading();
				hangzhouMap = new BMap.Map("fpi-map");
				if(window.hangzhouPointer){
					hangzhouMap.centerAndZoom(new BMap.Point(window.hangzhouPointer.longitude, window.hangzhouPointer.latitude), 14);
				}
				$.each(vars.data, function(index, item){
					var $item = this;
					self.addMarker($item.longitude, $item.latitude, $item.name, $item.id, $item.aqiValue);
				});
				hangzhouMap.setViewport(points);
    		}

            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://api.map.baidu.com/api?type=quick&ak=2Yq9apo2IFFHL5C0K9Q3G44B&v=1.0&callback=MapCallback";
            document.body.appendChild(script);

            // var mapDom = $('#fpi-map');
            // if(mapDom.children().length == 2){
            //     mapDom.children("div:last-child").hide();
            // }
            // else{
            //     var timeHander = setInterval(function(){
            //         if(mapDom.children().length == 2){
            //             mapDom.children("div:last-child").hide();
            //             clearInterval(timeHander);
            //         }
            //     }, 50);
            // }
            refreshContentLayout.init();
	    },
	    addMarker: function(longitude, latitude, name, id, aqi){
            var self = this;
            var aqiUrl = this.getIcon(aqi);
            var icons = new BMap.Icon("../images/aqi/"+ aqiUrl, new BMap.Size(21, 30), {
                imageSize: new BMap.Size(21, 30)
            });  
			var marker = new BMap.Marker(new BMap.Point(longitude, latitude));	// 创建标注
            marker.setIcon(icons);
            if(name != '千岛湖'){
                points.push(new BMap.Point(longitude, latitude));
            }
            window.itemClick = function(obj){
                self.setLocalStorage('hangzhouAirAppId', obj.rel);
                self.setLocalStorage('hangzhouAirAppName', obj.title);
                alipayApi.pushWindow("stations.html");
            };
			hangzhouMap.addOverlay(marker);
			marker.addEventListener('click', function(){
                var infoWindow = new BMap.InfoWindow('<a class="show-win-cls" title='+ name +' rel='+ id +' onclick="window.itemClick(this)">' + name + '<span>（'+ aqi +'）</span></a>');
				this.openInfoWindow(infoWindow);
                // debugger;
                // setTimeout(self.itemClick(id, name), 2000);
			});
	    },
        getIcon: function(value){
            var aqi = Math.abs(value);
            var mapBgUrl = '';

            if(aqi >= 0 && aqi <= 50){
                mapBgUrl = interface.mapIcons.excellent;
            }
            else if(aqi >= 51 && aqi <= 100){
                mapBgUrl = interface.mapIcons.good;
            }
            else if(aqi >= 101 && aqi <= 150){
                mapBgUrl = interface.mapIcons.light;
            }
            else if(aqi >= 151 && aqi <= 200){
                mapBgUrl = interface.mapIcons.moderate;
            }
            else if(aqi >= 201 && aqi <= 300){
                mapBgUrl = interface.mapIcons.heavy;
            }
            else{
                mapBgUrl = interface.mapIcons.serious;
            }

            return mapBgUrl;
        },
        setLocalStorage: function(key, value){
            if(typeof(Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                localStorage.setItem(key, value);
            } else {
                // Sorry! No Web Storage support..
            }
        }

    });

    module.exports = {
        "AppMapModel": AppMapModel,
        "AppMapModelList": AppMapModelList,
        "AppMapView": AppMapView
    }

});