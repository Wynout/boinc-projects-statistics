/*
|-------------------------------------------------------------------------------
| TotalUserRacHistory Model       app/scripts/models/TotalUserRacHistoryModel.js
|-------------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'cachingsync'], function ($, Backbone, CachingSync) {

    var TotalUserRacHistoryModel = Backbone.Model.extend({

		urlRoot: 'http://bps-api.wynout.nl/project/total/user/rac/histories',
		sync: Backbone.cachingSync(Backbone.sync, 'TotalUserRacHistoryModel', 3600), // in minutes?

    });

    return TotalUserRacHistoryModel;
});