/*
|--------------------------------------------------------------------------
| TotalUserRacHistory Chart View             app/scripts/views/ChartView.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'highcharts', 'charts/timeSeriesZoomableDefaultOptions'],
function ($, Backbone, Highcharts, DefaultOptions) {

    var ChartView = Backbone.View.extend({

        customOptions: {
            chart: {},
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
                    text: 'yAxis title'
                }
            },
            tooltip: {},
            legend: {},
            plotOptions: {},
            series: [{
                type: 'area',
                name: 'Series name',
            }]
        },

        // The View Constructor
        initialize: function (options) {

            this.options = $.extend(true, DefaultOptions, this.customOptions); // DefaultOptions
            this.options.chart.renderTo = this.$el.attr('id');
            this.model.bind('change', this.render, this);
        },


        // Renders Chart, this refers to the view
        render: function (model) {

            // Destroy previous chart
            if (this.Chart) {

                this.Chart.destroy();
            }
            // Assume model-based series
            this.options.series[0].pointStart = this.model.get('start_timestamp')*1000;
            this.options.series[0].data = this.model.get('data');

            this.chart = new Highcharts.Chart(this.options);
            return this;
        }

    });

    return ChartView;
});