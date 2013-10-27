/*
|--------------------------------------------------------------------------
| Requirejs configuration                               app/scripts/main.js
|--------------------------------------------------------------------------
*/
require.config({

      // 3rd party script alias names (Easier to type 'jquery' than 'vendor/jquery-1.8.2.min')
      paths: {

            // Core Libraries
            'jquery': 'vendor/jquery/jquery',
            'jquerymobile': 'vendor/jquery-mobile/jquery.mobile-1.3.2',
            'underscore': 'vendor/lodash/lodash',
            'backbone': 'vendor/backbone-amd/backbone',
            'highcharts': 'vendor/highcharts/highcharts',
            'burry': 'vendor/backbone-caching-sync/burry',
            'cachingsync': 'vendor/backbone-caching-sync/backbone.cachingsync',
            'highcharts-theme': 'vendor/highcharts/themes/gray'

      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {

            'backbone': {
                  'deps': ['underscore', 'jquery'],
                  'exports': 'Backbone'  //attaches 'Backbone' to the window object
            },
            'highcharts': {
                'exports': 'Highcharts'
            },
            'highcharts-theme': {
                'deps': ['highcharts'],
                'exports': 'Highcharts'
            }
      }
});


(function() {

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {}
    };

    /*window.vent = _.extend({}, Backbone.Events);
    window.template = function(id) {
        return _.template( $('#' + id).html() );
    };*/

})();

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

            $.mobile.changePage.defaults.transition = 'slide';
            $.mobile.changePage.defaults.reverse = true;

            // Change Page on a[data-rel='back'] elements
            var defaults = $.mobile.changePage.defaults;
            $(document).on('click', 'a[data-rel="back"]', function (event) {

                // event.preventDefault();
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
                // window.history.back();
                // return false;
            });
        }
    );


    /*
    |--------------------------------------------------------------------------
    | Swipe                                                 app/scripts/main.js
    |--------------------------------------------------------------------------
    */
    require([ 'jquerymobile' ], function () {

        // Instantiates a new Backbone.js Router
        App.router =  new Router();
        // this.router = new Router();
    });


    /*
    |--------------------------------------------------------------------------
    | Swipe                                                 app/scripts/main.js
    |--------------------------------------------------------------------------
    */
    $(document).on('pageinit', '[data-role="page"]', function () {

        var page = '#' + $(this).attr('id'),
        // Get the filename of the next page that we stored in the data-next attribute
        next = $(this).jqmData('next'),
        // Get the filename of the previous page that we stored in the data-prev attribute
        prev = $(this).jqmData('prev');

        // Check if we did set the data-next attribute
        if (next) {

            // Prefetch the next page
            $.mobile.loadPage(next);
            // Navigate to next page on swipe left
            $(document).on('swipeleft', page, function () {

                $.mobile.changePage(next, {transition: 'slide'});
            });
            // Navigate to next page when the 'next' button is clicked
            $('.control .next', page).on('click', function () {
                $.mobile.changePage(next , {transition: 'slide'});
            });
        }
        // Disable the 'next' button if there is no next page
        else {

            $('.control .next', page).addClass('ui-disabled');
        }
        // The same for the previous page (we set data-dom-cache='true' so there is no need to prefetch)
        if (prev) {

            $(document).on('swiperight', page, function () {

                $.mobile.changePage(prev, { transition: 'slide', reverse: true });
            });
            $('.control .prev', page).on('click', function () {

                $.mobile.changePage(prev, { transition: 'slide', reverse: true });
            });
        }
        else {
           $('.control .prev', page).addClass('ui-disabled');
        }
    });


});