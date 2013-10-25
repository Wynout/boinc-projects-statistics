/*
|-----------------------------------------------------------------------------------------------
| TotalUserRacHistory Collection      app/scripts/collections/TotalUserRacHistoriesCollection.js
|-----------------------------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'models/TotalUserRacHistoryModel'], function ($, Backbone, TotalUserRacHistoryModel) {

    var Collection = Backbone.Collection.extend({

        initialize: function( models, options ) {
        },


        model: TotalUserRacHistoryModel,
        url: 'http://bps-api.wynout.nl/project/total/user/rac/histories'

    });

    return Collection;
});