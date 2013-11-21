/*
|--------------------------------------------------------------------------
|
|--------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'highstock',
    'views/BaseChartView',
    // 'highstock-theme'
    'models/TotalRacModel',
    'collections/TotalRacCollection',
], function ($, Backbone, Highstock, BaseChartView, TotalRacModel, TotalRacCollection) {


    /**
     * Helper extension for accessing methods in the parent object
     * @example this._super('parentMethod')
     * @link http://forrst.com/posts/Backbone_js_super_function-4co
     */
    Backbone.View.prototype._super = function (method) {

        return this.constructor.__super__[method].apply(this, _.rest(arguments));
    };


    var TotalRacChartView = BaseChartView.extend({

        // options, problem extending?
        initialize: function (options) {

            console.log('TotalRacChartView argument options =');
            console.log(options);
            console.log(options.chart.renderTo);

            BaseChartView.prototype.initialize.call(this);

            // this._super('initialize');
            this.options.chart.renderTo = options.chart.renderTo;


            this.model      = new TotalRacModel();
            this.collection = new TotalRacCollection();
            // this._super('initialize', options);

        }

    });



    return TotalRacChartView;

});