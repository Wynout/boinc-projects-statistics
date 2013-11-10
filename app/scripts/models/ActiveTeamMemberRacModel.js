/*
|-------------------------------------------------------------------------------
| ActiveTeamMemberRac Model       app/scripts/models/ActiveTeamMemberRacModel.js
|-------------------------------------------------------------------------------
*/
define([
	'jquery',
	'backbone',
	'config'
], function ($, Backbone, Config) {

    return Backbone.Model.extend({

		idAttribute: 'project_id',
		urlRoot: 'http://' + Config.api.domain + '/project/active/team/member/rac/histories'
    });
});