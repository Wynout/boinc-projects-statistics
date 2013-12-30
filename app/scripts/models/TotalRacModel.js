/*
|-------------------------------------------------------------------------------
| TotalRac Model                             app/scripts/models/TotalRacModel.js
|-------------------------------------------------------------------------------
*/
define([
	'jquery',
	'backbone',
	'config'
], function ($, Backbone, Config) {

	'use strict';

    return Backbone.Model.extend({

		urlRoot: 'http://' + Config.api.domain + '/project/total/user/rac/histories',

		parse: function (response, options) {

			return response;
		}
	});
});