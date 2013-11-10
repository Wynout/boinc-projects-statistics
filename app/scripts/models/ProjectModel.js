/*
|--------------------------------------------------------------------------
| Project Model                          app/scripts/models/ProjectModel.js
|--------------------------------------------------------------------------
*/
define([
	'jquery',
	'backbone',
	'config'
], function ($, Backbone, Config) {

    return Backbone.Model.extend({

		urlRoot: 'http://' + Config.api.domain + '/projects'
    });
});