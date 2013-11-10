/*
|--------------------------------------------------------------------------
| Total Rac View                 app/scripts/views/totalrac/TotalRacView.js
|--------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'views/totalrac/TotalRacChartView',
    'text!templates/totalrac/TotalRacView.html'
], function ($, Backbone, TotalRacChartView, totalRacTemplate) {

    return Backbone.View.extend({

        el: $('#total-rac'),

        initialize: function () {

            App.vent.on('projectTotalRac:showSingle', this.showSingle, this);
            App.vent.on('projectTotalRac:showAll', this.showAll, this);
        },


        showSingle: function (projectId) {

            var self = this;
            App.Models.TotalRac.id = projectId;
            App.Models.TotalRac.fetch({
                success: function () {

                    self.model = App.Models.TotalRac;
                    self.page = null;
                    $.mobile.changePage('#total-rac', {reverse: false, changeHash: true});
                }
            }).always(function () {

            });
        },


        showAll: function (page) {

            page = (page===null || page===undefined) ? 1 : page;

            var self = this;
            App.Collections.TotalRac.id = page;
            App.Collections.TotalRac.fetch({data: {page: page}}).then(function (response) {

                if (response[0]) {
                    response = response[0];
                }

                self.model = null;
                self.page  = response;
                $.mobile.changePage('#total-rac', {reverse: false, changeHash: true});

            }, function (error) {

                console.log(error);
            });
        },


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