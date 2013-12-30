/*
|--------------------------------------------------------------------------------------
| TeamMemberRac Collection           app/scripts/collections/TeamMemberRacCollection.js
|--------------------------------------------------------------------------------------
*/
define([
	'jquery',
	'backbone',
	'config',
	'models/ActiveTeamMemberRacModel'
], function ($, Backbone, Config, ActiveTeamMemberRacModel) {

	'use strict';

    return Backbone.Collection.extend({

        model: ActiveTeamMemberRacModel,

		url: function () {

			var url = 'http://' + Config.api.domain + '/project/active/team/member/rac/histories';
			return this.id ? url + '/'  + this.id : url;
		},

		parse: function (response, options) {

			this.pagination = response.pagination;
			return response.results;
		}

    });
});