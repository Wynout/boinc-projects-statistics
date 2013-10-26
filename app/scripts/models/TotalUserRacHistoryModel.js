/*
|-------------------------------------------------------------------------------
| TotalUserRacHistory Model       app/scripts/models/TotalUserRacHistoryModel.js
|-------------------------------------------------------------------------------
*/
define(['jquery', 'backbone'], function ($, Backbone) {

    var TotalUserRacHistoryModel = Backbone.Model.extend({

		urlRoot: 'http://bps-api.wynout.nl/project/total/user/rac/histories'
		// sync: Backbone.cachingSync(Backbone.sync, 'TotalUserRacHistoryModel', 60),

    });

    return TotalUserRacHistoryModel;
});