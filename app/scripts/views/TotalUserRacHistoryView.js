/*
|--------------------------------------------------------------------------
| TotalUserRacHistory View     app/scripts/views/TotalUserRacHistoryView.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'models/TotalUserRacHistoryModel'], function ($, Backbone, TotalUserRacHistoryModel) {

    var TotalUserRacHistoryView = Backbone.View.extend( {

        initialize: function () {

            this.collection.on('add', this.render, this);
        },


        render: function() {

            return this;
        }

    });

    return TotalUserRacHistoryView;
});