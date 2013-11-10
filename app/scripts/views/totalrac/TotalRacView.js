/*
|--------------------------------------------------------------------------
| Total Rac View                          app/scripts/views/TotalRacView.js
|--------------------------------------------------------------------------
*/
define([
    'domReady!',
    'jquery',
    'backbone',
    'views/totalrac/TotalRacChartView',
    'text!templates/totalrac/TotalRacView.html'
], function (doc, $, Backbone, TotalRacChartView, totalRacTemplate) {

    return Backbone.View.extend({

        el: $('#total-rac'),

        render: function () {

            this.$el.html(totalRacTemplate);

            App.Views.TotalRacChart = new TotalRacChartView({id: 'total-rac-chart'});
            App.Views.TotalRacChart.model = this.model;
            App.Views.TotalRacChart.page  = this.page;

            this.$el.trigger('pagecreate');
            App.Views.TotalRacChart.render();

            return this;
        }
    });
});