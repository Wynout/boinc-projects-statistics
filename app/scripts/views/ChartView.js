/*
|--------------------------------------------------------------------------
| TotalUserRacHistory Chart View             app/scripts/views/ChartView.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'highcharts',
    'charts/timeSeriesZoomableDefaultOptions',
    'highcharts-theme'
    ],
function ($, Backbone, Highcharts, DefaultOptions) {

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
                    // text: 'text'
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
            series: [{
                type: 'area',
                name: 'credits',
            }]
        },

        // The View Constructor
        initialize: function (options) {

            this.options = $.extend(true, DefaultOptions, this.customOptions); // DefaultOptions
            this.options.chart.renderTo = this.$el.attr('id');

            // this.collection.on('add', this.render, this)
        },


        // Renders Chart, this refers to the view
        render: function (model) {

            var project = this.model.get('project'),
                title   = 'Sum of User RAC for ' + project.name;

            $('#totalUserRacHistories h1').text(project.name);

            this.options.series[0].pointStart = this.model.get('start_timestamp')*1000;

            if (this.chart===undefined) {

                this.chart = new Highcharts.Chart(this.options);
            }

            this.chart.setTitle({text: title});

            // Assume model-based series
            this.chart.series[0].setData(this.model.get('data'), false);
            this.chart.redraw();
            return this;
        }
    });

    return ChartView;
});