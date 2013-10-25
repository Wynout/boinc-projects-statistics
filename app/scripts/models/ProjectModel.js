/*
|--------------------------------------------------------------------------
| Project Model                              app/scripts/views/ChartView.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone'], function ($, Backbone) {

    var ProjectModel = Backbone.Model.extend({

		urlRoot: 'http://bps-api.wynout.nl/projects'
    });
    return ProjectModel;
});