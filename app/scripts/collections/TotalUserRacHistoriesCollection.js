/*
|-----------------------------------------------------------------------------------------------
| TotalUserRacHistory Collection      app/scripts/collections/TotalUserRacHistoriesCollection.js
|-----------------------------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'cachingsync', 'models/TotalUserRacHistoryModel'], function ($, Backbone, CachingSync, TotalUserRacHistoryModel) {

    var Collection = Backbone.Collection.extend({

        initialize: function (models, options) {
        },

        model: TotalUserRacHistoryModel,
        sync: Backbone.cachingSync(Backbone.sync, 'TotalUserRacHistoryCollection', 60),
        url: 'http://bps-api.wynout.nl/project/total/user/rac/histories'

    });

    return Collection;
});