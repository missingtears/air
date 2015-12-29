/**
 * AppRouter
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-15 19:33:19
 * @version 1.0.0
 */

define(function(require, exports, module) {
    var $ = require('jquery'),
    	_ = require('underscore'),
    	Backbone = require('backbone'),
        refreshTopTitle = require('lib/refreshTopTitle'),
        AppMain = require('lib/AppMain'),
        alipayApi = require('lib/alipayApi'),
        iscrollcontrol = require('lib/iscrollcontrol'),
        AppMainModel = AppMain.AppMainModel,
        AppMainModelList = AppMain.AppMainModelList,
        AppMainTempView = AppMain.AppMainTempView,
        AppMainAqiView = AppMain.AppMainAqiView,
        AppMainDataView = AppMain.AppMainDataView,

        AppMap = require('lib/AppMap'),
        AppMapModel = AppMap.AppMapModel,
        AppMapModelList = AppMap.AppMapModelList,
        AppMapView = AppMap.AppMapView;

        AppStations = require('lib/AppStations'),
        AppStationsModel = AppStations.AppStationsModel,
        AppStationsModelList = AppStations.AppStationsModelList,
        AppStationsView = AppStations.AppStationsView;

    var isLoadMap = false;

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "getIndex",
            "index/:cityIds/:name": "indexStations",
            "maps": "getMaps",
            "stations" : "getStations"
        },

        initialize: function(){
        },
        errorTemplate: function(){
            alipayApi.alert();
        },
        indexStations: function(cityIds, name){
            var self = this;
            alipayApi.hideLoading();
            $('#wrapper').show();
            $('#fpi-map').hide();
            $('#fpi-stations').hide();
            alipayApi.setTitle(name);
            alipayApi.showLoading();
            alipayApi.hideOptionMenu();
            var appMain = new AppMainModelList();
            appMain.fetch({ 
                data: { cityIds: cityIds},
                success : function(collection, response, options) {
                    var appMainTempView = new AppMainTempView({model: response});
                    var appMainAqiView = new AppMainAqiView({model: response});
                    $('#dataTemp').html("");
                    if(appMainTempView && appMainAqiView){
                        iscrollcontrol.stationsIndex();
                        self.loadIndexImage(response);
                    }
                },
                error : function(collection, response, options) {
                    self.errorTemplate();
                },
                // A timeout is the only way to get an error event for JSONP calls!
                timeout : 5000
            });
            // refreshTopTitle.init();
        },

        getIndex: function(codeId){
            var self = this;
            $('#wrapper').show();
            $('#fpi-map').hide();
            $('#fpi-stations').hide();
            //alipayApi.setTitle("杭州空气质量");
            alipayApi.showLoading();
            alipayApi.hideOptionMenu();
            var appMain = new AppMainModelList();
            appMain.fetch({ 
                data: { cityIds: currentCityId},
                success : function(collection, response, options) {
                    var appMainTempView = new AppMainTempView({model: response});
                    var appMainAqiView = new AppMainAqiView({model: response});
                    var appMainDataView = new AppMainDataView({model: response});
                    if(appMainTempView && appMainAqiView && appMainDataView){
                        iscrollcontrol.init();
                        self.loadIndexImage(response);
                    }
                },
                error : function(collection, response, options) {
                    self.errorTemplate();
                },
                // A timeout is the only way to get an error event for JSONP calls!
                timeout : 5000
            });
            refreshTopTitle.init();
        },

        getMaps: function() {
            alipayApi.hideLoading();
            var self = this;
            if(!isLoadMap){
                alipayApi.showLoading();
                self.loadBDMap();
            }
            // if(isLoadMap && $("#fpi-map").html() == ""){
            //     self.fetchMapTemplate();
            // }
            // if(isLoadMap && $("#fpi-map").html() != ""){
            //     self.fetchMapTemplate();
            // }
            $('#wrapper').hide();
            $('#fpi-map').show();
            $('#fpi-stations').hide();
            // refreshTopTitle.init();
            alipayApi.setTitle("杭州空气质量");
        },
        getStations: function(){
            var self = this;
            alipayApi.hideLoading();
            $('#wrapper').hide();
            $('#fpi-map').hide();
            $('#fpi-stations').show();
            alipayApi.showLoading();
            alipayApi.setTitle("杭州空气质量");
            // refreshTopTitle.init();
            var appStations = new AppStationsModelList();
            appStations.fetch({ 
                data: { cityId: currentCityId},
                success : function(collection, response, options) {
                    var appStationsView = new AppStationsView({model: response});
                },
                error : function(collection, response, options) {
                    self.errorTemplate();
                },
                // A timeout is the only way to get an error event for JSONP calls!
                timeout : 5000
            });
        },

        // description 异步载入百度地图
        loadBDMap: function() {
            var self = this;
            self.fetchMapTemplate();
        },
        fetchMapTemplate: function(){
            var self = this;
            var appMap = new AppStationsModelList();
            appMap.fetch({ 
                data: { cityId: currentCityId},
                success : function(collection, response, options) {
                    var appMapView = new AppMapView({model: response});
                    isLoadMap = true;
                },
                error : function(collection, response, options) {
                    self.errorTemplate();
                },
                // A timeout is the only way to get an error event for JSONP calls!
                timeout : 5000
            });
        },
        loadIndexImage: function(response){
            var docWidth = $(window).width();
            var canvas = document.getElementById('indexCanvas');
            var context = canvas.getContext('2d');
            var x = 0;
            var y = 0;
            var width = docWidth;
            var height = 345;
            var imageObj = new Image();
            canvas.width = docWidth;

            imageObj.onload = function() {
                // context.drawImage(imageObj, x, y, width, width * imageObj.height / imageObj.width);
                context.drawImage(imageObj, x, y, width, height);
            };
            imageObj.src = '../images/indexbg/' + response[1].currentIndexBg;
        }
    });

    return AppRouter;
});