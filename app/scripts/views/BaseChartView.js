/*
|--------------------------------------------------------------------------
| Base Chart View                        app/scripts/views/BaseChartView.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone'], function ($, Backbone) {


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
        isReflowed: false,

        options: {
            page: {
                title: 'Page Title'
            },

            chart:{
                renderTo: null,
                reflow: false, // Manually reflow the chart when window is resized.
                borderRadius: 0,
                events: {
                    load: function (chart) {}
                }
            },

            title: {
                text: '',
                y: 83
            },

            xAxis: [{
            }],

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
                    enableMouseTracking: false,
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
                floating: false,
                y: 0,
                verticalAlign: 'top'
            },

            rangeSelector: {
                // inputPosition: {y: 0},
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
                inputEnabled: true // enabled when chart width >= ?
            }
        },


        initialize: function (options) {

            var self     = this;
            this.options = $.extend(true, this.options, options);
            this.pageId  = this.$el.attr('id');
            this.chartId = this.options.chart.renderTo;

            this.setPageTitle();
            this.bindVents();

            // This event is triggered after the changePage() request has finished loading the page into the DOM and all page transition animations have completed.
            $(document).on('pagechange', function (toPage, options) {

                if (options.toPage.attr('id')===self.pageId) {

                    self.reflow();
                }
            });

            // Triggered on the "fromPage" after the transition animation has completed.
            this.$el.on('pagehide', this.removeSeries.bind(this));
        },


        bindVents: function () {

            App.vent.on(this.pageId + ':showSingle', this.showSingle, this);
            App.vent.on(this.pageId + ':showAll', this.showAll, this);
            App.vent.on('resize' + ':' + this.pageId, this.reflow, this);
        },


        reflow: function () {

            if (this.chart) {

                var viewport = this.getViewportSize();
                this.chart.setSize(viewport.width, viewport.height, false);
                this.isReflowed = true;
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

                self.pagination = response.pagination;

                self.renderAll();
                $.mobile.changePage('#' + self.pageId, {reverse: false, changeHash: true});

            }, function (error) {

                console.log(error);
            });
        },


        renderSingle: function () {

            var project = this.model.get('project');

            if (!this.chart) {

                this.chart = new Highcharts.StockChart(this.options);
            }
            if (this.isReflowed===false) {

                this.reflow();
            }
            this.removeSeries();

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
            if (this.isReflowed===false) {

                this.reflow();
            }
            this.removeSeries();

            _.each(this.collection.models, function (model, index) {

                self.chart.addSeries({
                    name: model.get('project').name,
                    pointStart: model.get('start_timestamp') * 1000,
                    pointInterval: 86400000, // 24*3600*1000
                    data: model.get('rac'),
                }, false);
            });

            this.renderPagination();

            return this;
        },


        renderPagination: function () {

            if (!this.pagination) {

                return;
            }

            var $pagination = this.$el.find('.pagination-buttons'),
                $prev   = $pagination.find('.previous'),
                $next   = $pagination.find('.next'),
                hash    = '#' + Backbone.history.fragment,
                current = this.pagination.currentPage,
                last    = this.pagination.lastPage,
                next, prev;

            next = current + 1;
            next = next>last ? last : next;
            prev = current - 1;
            prev = prev<1 ? 1 : prev;
            $prev.attr('href', hash.replace(/page:([0-9]+)$/, 'page:' + prev));
            $next.attr('href', hash.replace(/page:([0-9]+)$/, 'page:' + next));

            if (current===1) {

                $prev.addClass('ui-disabled');
            } else {

                $prev.removeClass('ui-disabled');
            }
            if (current===last) {

                $next.addClass('ui-disabled');
            } else {

                $next.removeClass('ui-disabled');
            }

        },


        removeSeries: function () {

            while (this.chart.series.length > 0) {

                this.chart.series[0].remove(true);
            }
        },


        getViewportSize: function () {

            var $header      = $.mobile.activePage.find('div[data-role="header"]').first(),
                $footer      = $.mobile.activePage.find('div[data-role="footer"]').first(),
                headerHeight = $header.length>0 ? $header.outerHeight(true) : 0,
                footerHeight = $footer.length>0 ? $footer.outerHeight(true) : 0,
                width        = $.mobile.activePage.outerWidth(true);

            if (App.isDesktop && (window.outerWidth - width)<=20 ) {

                width = window.outerWidth; // need to include width of scrollbar
            }

            return {
                height: $(window).height() - headerHeight - footerHeight,
                width: width
            };
        },


        setPageTitle: function (text) {

            text = !text ? this.options.page.title : text;
            this.$el.find('div[data-role="header"] h1').text(text);
        }

    });


   return BaseChartView;
});