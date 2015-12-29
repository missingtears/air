/**
 * swipe
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-11 13:54:53
 * @version 1.0.0
 */

define(function (require, exports, module) {
    var $ = require('jquery'),
        touch = require('zepto-touch'),
        iScroll = require('iscroll');


    exports.init = function(){
        currentIndex = 0;
        pages = [$('#page1'), $('#page2'), $('#page3')];

        function scrollRight() {

            if (currentIndex === 0) return;
            pages[currentIndex].removeClass('stage-center');
            pages[currentIndex].addClass('stage-right');

            pages[currentIndex - 1].removeClass('stage-left');
            pages[currentIndex - 1].addClass('stage-center');

            currentIndex = currentIndex - 1;

        }

        function scrollLeft() {

            if (currentIndex === pages.length - 1) return;

            pages[currentIndex].removeClass('stage-center');
            pages[currentIndex].addClass('stage-left');

            pages[currentIndex + 1].removeClass('stage-right');
            pages[currentIndex + 1].addClass('stage-center');

            currentIndex = currentIndex + 1;

        }

        $('#container').swipeLeft(scrollLeft);
        $('#container').swipeRight(scrollRight);

        iscroll = new iScroll('wrapper', {hScrollbar: false, vScrollbar: false });
        
    };
});