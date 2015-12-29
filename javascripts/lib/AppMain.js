/**
 * AppMain
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-11 14:56:22
 * @version 1.0.0
 */

define(function(require, exports, module) {
    var date = new Date().getTime();
    var $ = require('jquery'),
    	Backbone = require('backbone'),
    	_ = require('underscore'),
        interface = require('lib/interface'),
        tools = require('lib/tools'),
        weeklayout = require('lib/weeklayout'),
        chartjs = require('chartjs'),
        alipayApi = require('lib/alipayApi'),
        indexTempView = require('text!template/index/indexTempView.html'),
        indexAqiView = require('text!template/index/indexAqiView.html'),
        indexDataView = require('text!template/index/indexDataView.html');

    // 替换模板标签为{{ etc. }}
    // _.templateSettings = {
    //     interpolate: /\{\{(.+?)\}\}/g
    // };

    var AppMainModel = Backbone.Model.extend({
        initialize: function(){
            // 执行构造代码
        },
        validate: function(attrData){

        },
        defaults: {
        }
    });

    var AppMainModelList = Backbone.Collection.extend({

        initialize: function(){

        },
        model: AppMainModel,
        url: interface.aqiGetCityDataDto,
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
    // 首页视图
    var AppMainTempView = Backbone.View.extend({

        el: '#airTemp',
        template: _.template(indexTempView),
        initialize: function(){
            this.render();
        },

        render: function() {

            vars = {amount:200, data: this.model};
            //var date = new Date();
            var strtime = this.distime(vars.data[0].refreshDateTime);
            var currentDate = this.getCurrentDate();
            var aqiType = vars.data[0].aqiCurrentDto.aqiType;
            var aqiValue = vars.data[0].aqiCurrentDto.aqiValue;
            var currentWeather = vars.data[0].weatherCurrentDto.weather;
            var aqiForcastBgColor = this.getAqiForcastBgColor(vars.data[0].aqiForcastDtos, vars.data[0].weatherForcasts);

            window.hangzhouPointer = {
                'longitude': vars.data[0].aqiCurrentDto.longitude,
                'latitude': vars.data[0].aqiCurrentDto.latitude
            };

            var indexBg = this.getCurrentIndexBg(aqiValue, currentWeather);
            vars.data.push({
                distime: tools.refreshTime(strtime),
                currentdate: currentDate,
                aqiBgColor: tools.aqiColor(aqiType),
                currentIndexBg: indexBg,
                aqiForcast: aqiForcastBgColor,
                advice: tools.getAdvice(aqiValue, currentWeather)
            });

            var html = this.template(vars);
            this.$el.html(html);
            alipayApi.hideLoading();
            // alipayApi.back();
            // alipayApi.showTitlebar();
            weeklayout.init();
            return this;
        },
        getAqiForcastBgColor: function(dto, icons){
            var parentArray = [];
            var dtoArray = [];
            var dateArray = [];
            var weatherIcon = [];
            var date = new Date();
            $.each(icons, function(index){
                var $item = this;
                if($(dto)[index]){
                    dtoArray.push(tools.aqiColor(dto[index].aqiType));
                }
                else{
                    dtoArray.push('rgba(229, 227, 237, 100)');
                }
                dateArray.push(tools.getDates(index));
                weatherIcon.push(tools.getWeatherIcon($item.weather || '', index));
            });
            parentArray.push(dtoArray);
            parentArray.push(dateArray);
            parentArray.push(weatherIcon);
            return parentArray;
        },
        distime: function(time){
            var oldTime = tools.parseDate(time);
            var nowTime = new Date();
            var timeDiff = Math.abs(nowTime.getTime() - oldTime.getTime());
            return timeDiff;
        },
        getCurrentDate: function(){
            var date = new Date();
            // 获取当前月份(0-11,0代表1月)
            var month = date.getMonth();
            // 获取当前日(1-31)
            var day = date.getDate();
            // 获取当前星期X(0-6,0代表星期天)
            var week = tools.weekFormat(date.getDay());
            return '' + (month + 1) + '月' + day + '日 星期' + week + '';
        },
        getCurrentIndexBg: function(value, currentWeather){
            var aqi = Math.abs(value);
            var indexBgUrl = '';
            if(tools.weatherFormat(currentWeather) == 1){
                if(aqi >= 0 && aqi <= 50){
                    indexBgUrl = tools.isDays() ? 
                    interface.currentIndexBg.rain_excellent_day : 
                    interface.currentIndexBg.rain_excellent_night;
                }
                else{
                    indexBgUrl = tools.isDays() ? 
                    interface.currentIndexBg.rain_good_day : 
                    interface.currentIndexBg.rain_good_night;
                }
            }
            else if(tools.weatherFormat(currentWeather) == 2){
                indexBgUrl = tools.isDays() ? 
                interface.currentIndexBg.snow_excellent_day : 
                interface.currentIndexBg.snow_excellent_night;
            }
            else{
                if(aqi >= 0 && aqi <= 50){
                    indexBgUrl = tools.isDays() ? 
                    interface.currentIndexBg.excellent_day : 
                    interface.currentIndexBg.excellent_night;
                }
                else if(aqi >= 51 && aqi <= 100){
                    indexBgUrl = tools.isDays() ? 
                    interface.currentIndexBg.good_day : 
                    interface.currentIndexBg.good_night;
                }
                else if(aqi >= 101 && aqi <= 150){
                    indexBgUrl = tools.isDays() ? 
                    interface.currentIndexBg.light_day : 
                    interface.currentIndexBg.light_night;
                }
                else if(aqi >= 151 && aqi <= 200){
                    indexBgUrl = tools.isDays() ? 
                    interface.currentIndexBg.moderate_day : 
                    interface.currentIndexBg.moderate_night;
                }
                else if(aqi >= 201 && aqi <= 300){
                    indexBgUrl = tools.isDays() ? 
                    interface.currentIndexBg.heavy_day : 
                    interface.currentIndexBg.heavy_night;
                }
                else{
                    indexBgUrl = tools.isDays() ? 
                    interface.currentIndexBg.serious_day : 
                    interface.currentIndexBg.serious_night;
                }
            }
            return indexBgUrl;
        }
    });

    var AppMainAqiView = Backbone.View.extend({

        el: '#aqiTemp',
        template: _.template(indexAqiView),
        initialize: function(){
            this.render();
        },

        render: function() {
            this.showChiefPollutantsBg(vars.data[1].aqiBgColor);
            var html = this.template(vars);
            this.$el.html(html);
            alipayApi.hideLoading();
            this.setTdBgColor();
            return this;
        },
        showChiefPollutantsBg: function(bgColor){
            var bgs = {};
            var bgcolor = [];
            var datas = vars.data[0].aqiCurrentDto.datas;
            var pollutants = this.getChiefPollutants();

            for(var key in datas){
                if(datas.hasOwnProperty(key)){
                    $.each(pollutants, function(){
                        var $this = this;
                        if($.trim($this).indexOf(key) != -1){
                            bgs[key] = {'color': bgColor};
                        }
                        else{
                            if(bgs[key] === undefined){
                                bgs[key] = {'color': ""};
                            }
                        }
                    });
                }
            }
            for(var k in bgs){
                if(bgs.hasOwnProperty(k)){
                    bgcolor.push(bgs[k].color);
                }
            }
            vars.data.push({
                chief: bgcolor
            });
        },
        getChiefPollutants: function(){
            var chiefAry = [];
            var chief = vars.data[0].aqiCurrentDto.chiefPollutants;
            if(chief && chief.indexOf(',') != -1){
                chiefAry = chief.split(',');
                return chiefAry;
            }
            else{
                return $.trim(chief).split();
            }
        },
        setTdBgColor: function(){
            var td = $(this.el).find('.chief');
            $.each(td, function(index){
                var $item = this;
                $($item).css('background-color', vars.data[2].chief[index]);
            });
        }
    });

    var AppMainDataView = Backbone.View.extend({

        el: '#dataTemp',
        templ: _.template(indexDataView),
        initialize: function(){
            // 每次渲染需要在初始化解除事件绑定undelegateEvents()。
            // 注意,在使用iscroll来刷新页面布局时，需要手动将已存在的实例进行refresh()。
            // 否则会出现click事件多次绑定行为。
            // 2015.7.6 by f.ruguo
            this.undelegateEvents();
            this.render();
        },
        render: function() {
            this.$el.html(this.templ());
            this.refreChartContainer();
            this.renderChartJs(vars.data[0].aqiHistoryDatas);
            this.dataTabs();
            return this;
        },
        refreChartContainer: function(){
            var containerWidth = Math.abs($(window).width() - 20);
            $('.chart-container').css('width', containerWidth + 'px');
        },
        dataTabs: function(){
            $('#dataTabs > a').on('click', $.proxy(this.clickFunc, this));
        },
        clickFunc: function(event){
            event.preventDefault();
            var self = this;
            var currentItem = event.target;
            $(currentItem).addClass('current').siblings().removeClass('current');
            if($(currentItem).index() == 0){
                this.renderChartJs(vars.data[0].aqiHistoryDatas);
            }
            else if($(currentItem).index() == 1){
                $.ajax({
                    type: 'GET',
                    url: interface.aqiGetHistoryDataByCityId + '?callback=?',
                    // data to be added to query string:
                    data: { 
                        cityId: currentCityId,
                        factorType: 'pm25',
                        dateType: 'hour'
                    },
                    tryCount : 0,
                    retryLimit : 3,
                    // type of data we are expecting in return:
                    // dataType: 'jsonp',
                    // jsonp: 'callback',
                    //context: $('body'),
                    success: function(data){
                        // Supposing this JSON payload was received:
                        //   {"project": {"id": 42, "html": "<div>..." }}
                        // append the HTML to context object.
                        //this.append(data.project.html)
                        self.renderChartJs(data);
                    },
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus == 'error') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }            
                            return;
                        }
                        if (xhr.status == 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });
            }
            else{
                $.ajax({
                    type: 'GET',
                    url: interface.aqiGetHistoryDataByCityId + '?callback=?',
                    // data to be added to query string:
                    data: { 
                        cityId: currentCityId,
                        factorType: 'o3',
                        dateType: 'hour'
                    },
                    tryCount : 0,
                    retryLimit : 3,
                    // type of data we are expecting in return:
                    // dataType: 'jsonp',
                    // jsonp: 'callback',
                    //context: $('body'),
                    success: function(data){
                        // Supposing this JSON payload was received:
                        //   {"project": {"id": 42, "html": "<div>..." }}
                        // append the HTML to context object.
                        //this.append(data.project.html)
                        self.renderChartJs(data);
                    },
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus == 'error') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }            
                            return;
                        }
                        if (xhr.status == 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });
            }
        },
        renderChartJs: function(chartData){
            var xtime = [];
            var dataValue = [];
            $.each(chartData, function(index, item){
                xtime.push(item.time.split(' ')[1].substr(0, 5));
                dataValue.push(Number(item.value) || 0);
            });
            var data = {
                labels: xtime,
                datasets: [
                    {
                        label: "aqi",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: dataValue
                        //data: [0, 0, 0, 31, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19]
                    }
                ]
            };
            var ctx = document.getElementById("dataChart").getContext("2d");
            // var steps = 3;
            // var max = 500;
            var lineChart = new Chart(ctx).Line(data, {
                scaleBeginAtZero : false,
                // Boolean - Whether to show labels on the scale
                scaleShowLabels: true,
                // Interpolated JS string - can access value
                scaleLabel: "<%=value%>",
                // scaleOverride: true,
                // scaleSteps: steps,
                // scaleStepWidth: Math.ceil(max / steps),
                // scaleStartValue: 0,
                // Boolean - whether or not the chart should be responsive and resize when the browser does.
                responsive: false,
                // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                maintainAspectRatio: true,
                // Boolean - Determines whether to draw tooltips on the canvas or not
                showTooltips: false,
                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines : true,
                //String - Colour of the grid lines
                scaleGridLineColor : "rgba(0,0,0,.05)",
                //Number - Width of the grid lines
                scaleGridLineWidth : 1,
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: false,
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
                //Boolean - Whether the line is curved between points
                bezierCurve : true,
                //Number - Tension of the bezier curve between points
                bezierCurveTension : 0.4,
                //Boolean - Whether to show a dot for each point
                pointDot : true,
                //Number - Radius of each point dot in pixels
                pointDotRadius : 4,
                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth : 1,
                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius : 20,
                //Boolean - Whether to show a stroke for datasets
                datasetStroke : true,
                //Number - Pixel width of dataset stroke
                datasetStrokeWidth : 2,
                //Boolean - Whether to fill the dataset with a colour
                datasetFill : true,
                //String - A legend template
                legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

            });
        }
    });

    module.exports = {
        "AppMainModel": AppMainModel,
        "AppMainModelList": AppMainModelList,
        "AppMainTempView": AppMainTempView,
        "AppMainAqiView": AppMainAqiView,
        "AppMainDataView": AppMainDataView
    }
});