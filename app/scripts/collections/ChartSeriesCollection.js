// ChartSeries Collection
// ==============

// Includes file dependencies
define(["jquery", "backbone"], function ($, Backbone) {

    // Nothing special, just a subclass for the naming convenience
    var DataPoint = Backbone.Model.extend({});


	// To get the full series options, the toJSON method can be changed to
	// nest the data pointshigh
	var ChartSeriesCollection = Backbone.Collection.extend({

		model: DataPoint,

		initialize: function (options) {

			this.options = options;
		},

		// Override to nest the data points
		toJSON: function () {

			var options = _.clone(this.options);
			// Nest the data points to match the Highcharts options
			options.data = this;
			return options;
		}
	});

    return ChartSeriesCollection;
});