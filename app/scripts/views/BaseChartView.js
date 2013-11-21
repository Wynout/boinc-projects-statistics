/*
|--------------------------------------------------------------------------
| Base Chart View                        app/scripts/views/BaseChartView.js
|--------------------------------------------------------------------------
*/
define(['jquery','backbone'], function ($, Backbone) {


    /**
     * Helper extension for accessing methods in the parent object
     * @example this._super('parentMethod')
     * @link http://forrst.com/posts/Backbone_js_super_function-4co
     */
    Backbone.View.prototype._super = function (method) {

        return this.constructor.__super__[method].apply(this, _.rest(arguments));
    };


    /**
     * Base Chart View
     */
    var BaseChartView = Backbone.View.extend({

        // Override the parent constructor
        constructor: function () {

            // Define objects outside prototype chain
            this.collection = {};
            this.model      = {};

            // Call the original constructor
            Backbone.View.apply(this, arguments);
        },


        el: null,
        pageId: null,
        chart: null,
        chartTitle: '',

        options: {
            chart:{
                renderTo: null,
                reflow: false, // Manually reflow the chart when window is resized.
                borderRadius: 0,
                events: {
                    load: function () {}
                }
            },

            title: {
                text: '...',
                y: 45
            },

            yAxis: {
                labels: {
                    // formatter: function () { return this.value;}
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    dataGrouping: {
                        enabled: true
                    }
                }
            },

            tooltip: {
                // Shared Series Tooltip
                // Code Smell Starts here :/
                formatter: function () {

                    var s = '<b>'+ Highcharts.dateFormat('%A, %b %e, %Y', this.x) +'</b>';

                    $.each(this.points, function (i, point) {

                        var number = point.y;

                        if (number >= 1000) {
                            var exponent = Math.log(number) / Math.log(1000),
                                prefix   = ('KMGTPE').charAt(exponent - 1);

                            number = number / Math.pow(1000, Math.floor(exponent));
                            number = +number.toFixed(1) + prefix;
                        }
                        s += '<br/><span style="color:' + point.series.color + '">' + point.series.name + '</span>: ' + number;
                    });
                    return s;
                },
                shared: true
            },

            legend: {
                enabled: true,
                align: 'center',
                floating: true,
                verticalAlign: 'top'
            },

            rangeSelector: {
                buttonTheme: {
                    r: 5
                },
                buttons: [{
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'ytd',
                    text: 'YTD'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false // enabled when chart width >= ?
            }
        },

        initialize: function (options) {

            var self     = this;
            this.options = $.extend(this.options, options);
            this.pageId  = this.$el.attr('id');

            App.vent.on(this.pageId + ':showSingle', this.showSingle, this);
            App.vent.on(this.pageId + ':showAll', this.showAll, this);
            App.vent.on('resize' + ':' + this.pageId, this.reflow, this);

            $(document).on('pagechange', function () {

                self.reflow();
            });

            this.$el.on('pagehide', this.removeSeries.bind(this));
        },


        reflow: function () {

            var viewport;
            if (this.chart) {

                viewport = this.getViewportSize();
                this.chart.setSize(viewport.width, viewport.height, false);
            }
        },


        showSingle: function (projectId) {

            var self      = this;
            this.model.id = projectId;
            this.model.fetch({
                success: function (response) {

                    self.renderSingle();
                    $.mobile.changePage('#' + self.pageId, {reverse: false, changeHash: true});
                }
            }).always(function () {

            });
        },


        showAll: function (page) {

            page = (page===null || page===undefined) ? 1 : page;

            var self = this;

            this.collection.id = page;
            this.collection.fetch({data: {page: page}}).then(function (response) {

                if (response[0]) {
                    response = response[0];
                }

                // self.pagination = response.pagination;

                self.renderAll();
                $.mobile.changePage('#' + self.pageId, {reverse: false, changeHash: true});

            }, function (error) {

                console.log(error);
            });
        },


        renderSingle: function () {

            var self = this,
                project = this.model.get('project');

            this.$el.find('div[data-role="header"] h1').text('Header Text Here');

            if (!this.chart) {

                this.chart = new Highcharts.StockChart(this.options);
            }
            this.reflow();

            this.chart.addSeries({
                name: project.name ,
                pointStart: this.model.get('start_timestamp')*1000,
                pointInterval: 86400000, // 24*3600*1000
                data: this.model.get('rac'),
            }, false);

            return this;
        },


        renderAll: function () {

            var self = this;

            if (!this.chart) {

                this.chart = new Highcharts.StockChart(this.options);
            }
            this.reflow();

            this.$el.find('div[data-role="header"] h1').text('Header Text Here!');

            _.each(this.collection.models, function (model, index) {

                self.chart.addSeries({
                    name: model.get('project').name,
                    pointStart: model.get('start_timestamp') * 1000,
                    pointInterval: 86400000, // 24*3600*1000
                    data: model.get('rac'),
                }, false);
            });

            return this;
        },


        removeSeries: function () {

            while (this.chart.series.length > 0) {

                this.chart.series[0].remove(true);
            }
        },


        getViewportSize: function () {

            var $header      = $.mobile.activePage.find('div[data-role="header"]').first(),
                headerHeight = $header.length>0 ? $header.outerHeight(true) : 0,
                width        = $.mobile.activePage.outerWidth(true);

            if (App.isDesktop && (window.outerWidth - width)<=20 ) {

                width = window.outerWidth; // need to include width of scrollbar
            }

            return {
                height: $(window).height() - headerHeight,
                width: width
            };
        }

    });


   return BaseChartView;
});