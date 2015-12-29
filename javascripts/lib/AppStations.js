/**
 * AppStations
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-07-03 10:40:29
 * @version 1.0.0
 */

define(function(require, exports, module) {
	var $ = require('jquery'),
        stationsTempView = require('text!template/stations/stationsView.html'),
        refreshContentLayout = require('lib/refreshContentLayout'),
        iscrollcontrol = require('lib/iscrollcontrol'),
        tools = require('lib/tools'),
        alipayApi = require('lib/alipayApi'),
        interface = require('lib/interface');

    var AppStationsModel = Backbone.Model.extend({
        initialize: function(){
            // 执行构造代码
        },
        validate: function(attrData){

        },
        defaults: {
        }
    });

    var AppStationsModelList = Backbone.Collection.extend({

        initialize: function(){

        },
        model: AppStationsModel,
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

    var AppStationsView = Backbone.View.extend({
    	el: '#fpi-stations',
        // events: {
        //     "click tr": "controlSingleClick"
        // },
        template: _.template(stationsTempView),
        initialize: function(options){
            this.undelegateEvents();
            this.render();
        },
        render: function() {

            this.vars = {amount:200, data: this.model};
            var bgColor = this.getAqiBgColor(this.vars);
            this.vars.bgColor = bgColor;
            //var date = new Date();
            var html = this.template(this.vars);
            this.$el.html(html);
            alipayApi.hideLoading();
            // weeklayout.init();
            refreshContentLayout.init();
            iscrollcontrol.stationsScroller();
            this.dataClick();
            // this.controlSingleClick();
            return this;
        },
        dataClick: function(){
            $('table.stations tr').on('click', $.proxy(this.controlSingleClick, this));
        },
        controlSingleClick: function(){
            var index = $(event.target.parentNode).index();
            if(index == 0){
                return;
            }
            var parent = $(event.target).parents('tr');
            var id = parent.attr("rel");
            var name = parent.children("td:first-child").text();
            // var origin = window.location.origin;
            // var pathname = window.location.pathname;
            // var url = '#index/' + id + '/' + name;
            this.setLocalStorage('hangzhouAirAppId', id);
            this.setLocalStorage('hangzhouAirAppName', name);
            alipayApi.pushWindow("stations.html");
            //alipayApi.pushWindow(origin + pathname + '#index/' + id + '/' + name);
            // window.location.href = '#index/' + id + '/' + name;
        },
        getAqiBgColor: function(vars){
            var bgColor = [];
            var data = vars.data;
            $.each(data, function(index, item){
                var $item = this;
                bgColor.push(tools.aqiColor($item.aqiType));
            });
            return bgColor;
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
        "AppStationsModel": AppStationsModel,
        "AppStationsModelList": AppStationsModelList,
        "AppStationsView": AppStationsView
    }

});