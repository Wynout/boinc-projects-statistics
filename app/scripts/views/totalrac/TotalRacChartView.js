/*
|--------------------------------------------------------------------------
| TotalRac View                  app/scripts/views/totalrac/TotalRacView.js
|--------------------------------------------------------------------------
*/
define([
    'backbone',
    'highstock',
    'highstock-theme'
], function (Backbone, Highstock) {

    var ChartView = Backbone.View.extend({

        model: null,
        page: null,

        options: {
            chart:{

            },

            yAxis: {
                labels: {
                    // formatter: function() {
                    //     return (this.value > 0 ? '+' : '') + this.value + '%';
                    // }
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
                // formatter: function() {
                //     var s = '<b>'+ this.x +'</b>';

                //     $.each(this.points, function(i, point) {
                //         s += '<br/>'+ point.series.name +': '+
                //             point.y +'m';
                //     });

                //     return s;
                // },
                shared: true
            }
        },

        initialize: function (options) {

            // this.options = $.extend(true, DefaultOptions, this.customOptions); // DefaultOptions
            this.options.chart.renderTo = this.$el.attr('id');
        },


        render: function (model) {

            var self = this;

            if (this.chart===undefined) {

                this.chart = new Highcharts.StockChart(this.options);
            }

            while (this.chart.series.length > 0) {

                this.chart.series[0].remove(true);
            }

            var title = '';

            // $('#totalUserRacHistories h1').text('project.name');


            if (!_.isNull(this.model)) {

                var project = this.model.get('project');

                title = 'Total RAC for project ' + project.name;

                this.chart.addSeries({
                    name: project.name ,
                    pointStart: this.model.get('start_timestamp')*1000,
                    pointInterval: 24*3600*1000,
                    data: this.model.get('rac'),
                }, false);


            } else if (!_.isNull(this.page)) {

                title = 'Total RAC for projects';

                _.each(this.page.results, function (result, index) {

                    self.chart.addSeries({
                        name: result.project.name,
                        pointStart: result.start_timestamp*1000,
                        pointInterval: 24*3600*1000,
                        data: result.rac,
                    }, false);
                });
            }

            this.chart.setTitle({text: title});
            this.chart.redraw();
            return this;
        }
    });

    return ChartView;
});