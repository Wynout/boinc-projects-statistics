/*
|--------------------------------------------------------------------------
| Chart View                                 app/scripts/views/ChartView.js
|--------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'highcharts',
    'charts/timeSeriesZoomableDefaultOptions',
    'highcharts-theme'
], function ($, Backbone, Highcharts, DefaultOptions) {

    var ChartView = Backbone.View.extend({

        customOptions: {
            chart: {
                events: {
                    selection: function (event) {

                        var $chartContainer = $(event.currentTarget.container).parent();

                        if (!event.resetSelection) {

                            $chartContainer.addClass('zoomed-in').removeClass('zoomed-out');

                        } else {

                            $chartContainer.addClass('zoomed-out').removeClass('zoomed-in');
                        }
                    }
                }
            },
            title: {
                text: 'Chart Title'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Pinch the chart to zoom in'
            },
            xAxis: {
                title: {
                    text: 'text'
                }
            },
            yAxis: {
                title: {
                    text: 'Recent average credits'
                }
            },
            tooltip: {},
            legend: {},
            plotOptions: {},
            series: []
        },

        initialize: function (options) {

            this.options = $.extend(true, DefaultOptions, this.customOptions); // DefaultOptions
            this.options.chart.renderTo = this.$el.attr('id');
            // this.collection.on('add', this.render, this)
        },


        render: function (model) {

            var self = this;

            if (this.chart===undefined) {

                this.chart = new Highcharts.Chart(this.options);
            }

            while (this.chart.series.length > 0) {
                this.chart.series[0].remove(true);
            }

            // var project = this.model.get('project'),
                title   = 'Sum of User RAC for ' + 'project.name';

            $('#totalUserRacHistories h1').text('project.name');


            this.chart.setTitle({text: title});

            // Assume collection-based series
            _.each(this.collection.models, function (model, index) {

                var user = model.get('user');
                var team = model.get('team');
                self.chart.addSeries({
                    name: user.name + '@' + team.name,
                    pointStart: model.get('start_timestamp')*1000,
                    pointInterval: 24*3600*1000,
                    data: model.get('rac'),
                    marker: {
                        radius: 2
                    }
                }, false);


            });
            this.chart.redraw();
            return this;
        }
    });

    return ChartView;
});