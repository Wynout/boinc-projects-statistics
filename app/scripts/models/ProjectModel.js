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

	'use strict';

    return Backbone.Model.extend({

		urlRoot: 'http://' + Config.api.domain + '/projects'
    });
});