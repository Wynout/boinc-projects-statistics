/*
|--------------------------------------------------------------------------
| Requirejs configuration                               app/scripts/main.js
|--------------------------------------------------------------------------
*/
require.config({

      // 3rd party script alias names
      paths: {

            // App Config
            'config': 'config',
            // Core Libraries
            'text': 'vendor/requirejs/text',
            'domReady': 'vendor/requirejs/domReady',
            'jquery': 'vendor/jquery/jquery',
            'jquerymobile': 'vendor/jquery-mobile/jquery.mobile-1.3.2',
            'underscore': 'vendor/lodash/lodash',
            'backbone': 'vendor/backbone-amd/backbone',
            'burry': 'vendor/backbone-caching-sync/burry',
            'cachingsync': 'vendor/backbone-caching-sync/backbone.cachingsync',
            'energize': 'vendor/energize/energize',
            'highstock': 'vendor/highstock/highstock.src',
            'highstock-theme': 'vendor/highstock/themes/gray'
      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {

            'backbone': {
                  'deps': ['underscore', 'jquery', 'energize'],
                  'exports': 'Backbone'  //attaches 'Backbone' to the window object
            },
            'highstock': {
                'exports': 'Highcharts'
            },
            'highstock-theme': {
                'deps': ['highstock'],
                'exports': 'Highcharts'
            }
      }
});


/*
|--------------------------------------------------------------------------
| Global App Namespacing                                app/scripts/main.js
|--------------------------------------------------------------------------
*/
(function () {

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {},
        vent: {}
    };
})();



/*
|--------------------------------------------------------------------------
| Broadcast Publish Subscribe                           app/scripts/main.js
|--------------------------------------------------------------------------
*/
require(['backbone'], function (Backbone) {

    App.vent = _.extend({}, Backbone.Events);

    $(window).resize(function () {

        clearTimeout(this.id);
        this.id = setTimeout(function () {

            App.vent.trigger('resize:'+$.mobile.activePage.attr('id'));
        }, 300);
    });

});


/*
|--------------------------------------------------------------------------
| jQuery Mobile configuration                           app/scripts/main.js
|--------------------------------------------------------------------------
*/
require(['jquery','backbone','routers/router'], function ($, Backbone, Router) {

    // Set up the 'mobileinit' handler before requiring jQuery Mobile's module
    $(document).on('mobileinit', function () {

            // $.mobile.defaultPageTransition = 'slide';
            // $.mobile.pushStateEnabled = false;
            $.support.cors = true;
            $.mobile.allowCrossDomainPages = true;

            $.mobile.buttonMarkup.hoverDelay = 0;
            // https://github.com/davidcalhoun/energize.js

            // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
            $.mobile.linkBindingEnabled = false;

            // Disabling this will prevent jQuery Mobile from handling hash changes
            $.mobile.hashListeningEnabled = false;

            $.mobile.changePage.defaults.transition = 'slidefade';
            $.mobile.changePage.defaults.reverse    = true;

            // Change Page on a[data-rel='back'] elements
            var defaults = $.mobile.changePage.defaults;
            $(document).on('click', 'a[data-rel="back"]', function (event) {


                var $this = $(this);

                if ($this.attr('data-transition')) {

                    $.mobile.changePage.defaults.transition = $this.attr('data-transition');
                } else {

                    $.mobile.changePage.defaults.transition = defaults.transition;
                }

                if ($this.attr('data-direction')) {

                    $.mobile.changePage.defaults.reverse = $this.attr('data-direction') == 'reverse';
                } else {

                    $.mobile.changePage.defaults.reverse = false;
                }

                $.mobile.changePage($this.attr('href'));
            });

            $(document).on('pagebeforecreate', '[data-role="page"]', function () {

                setTimeout(function () {

                    $.mobile.loading('show');
                }, 0);
            });

            $(document).on('pageshow', '[data-role="page"]', function () {

                setTimeout(function () {

                    $.mobile.loading('hide');
                }, 300);
            });

            App.isDesktop = !('ontouchstart' in window) // works on most browsers
                        || !('onmsgesturechange' in window); // works on ie10

        }
    );


    /*
    |--------------------------------------------------------------------------
    | Instantiates a new Backbone.js Router                 app/scripts/main.js
    |--------------------------------------------------------------------------
    */
    require(['jquerymobile'], function () {

        App.router =  new Router();
    });


    /*
    |--------------------------------------------------------------------------
    | Swipe                                                 app/scripts/main.js
    |--------------------------------------------------------------------------
    */
    // $(document).on('pageinit', '[data-role="page"]', function () {

    //     // do Cache elements
    //     var $this = $(this);


    //     var page = '#' + $this.attr('id'),
    //     // Get the filename of the next page that we stored in the data-next attribute
    //     next = $this.jqmData('next'),
    //     // Get the filename of the previous page that we stored in the data-prev attribute
    //     prev = $this.jqmData('prev');

    //     // Check if we did set the data-next attribute
    //     if (next) {

    //         // Prefetch the next page
    //         $.mobile.loadPage(next);
    //         // Navigate to next page on swipe left
    //         $(document).on('swipeleft', page, function () {

    //             $.mobile.changePage(next, {transition: 'slide'});
    //         });
    //         // Navigate to next page when the 'next' button is clicked
    //         $('.control .next', page).on('click', function () {
    //             $.mobile.changePage(next , {transition: 'slide'});
    //         });
    //     }
    //     // Disable the 'next' button if there is no next page
    //     else {

    //         $('.control .next', page).addClass('ui-disabled');
    //     }
    //     // The same for the previous page (we set data-dom-cache='true' so there is no need to prefetch)
    //     if (prev) {

    //         $(document).on('swiperight', page, function (event) {

    //             if ($this.find('div.zoomed-in').length>0) {

    //                 console.log('div.zoomed-in');
    //                 return false;
    //             }

    //             $.mobile.changePage(prev, {transition: 'slide', reverse: true});
    //         });
    //         $('.control .prev', page).on('click', function () {

    //             $.mobile.changePage(prev, {transition: 'slide', reverse: true});
    //         });
    //     }
    //     else {
    //        $('.control .prev', page).addClass('ui-disabled');
    //     }
    // });


});