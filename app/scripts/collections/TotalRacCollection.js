/*
|--------------------------------------------------------------------------
| TotalUserRac Collection     app/scripts/collections/TotalRacCollection.js
|--------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'config',
    'cachingsync',
    'models/TotalRacModel'
], function ($, Backbone, Config, CachingSync, TotalRacModel) {

    return Backbone.Collection.extend({

        model: TotalRacModel,
        sync: Backbone.cachingSync(Backbone.sync, 'TotalRacCollection', Config.cachingSync.ttl),
        url: 'http://' + Config.api.domain + '/project/total/user/rac/histories',

        parse: function (response, options) {

            if (response[0]) {

                response = response[0];
            }
			this.pagination = response.pagination;
			return response.results;
		}

    });
});