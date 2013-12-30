/*
|---------------------------------------------------------------------------------
| Team Member Rac View        app/scripts/views/teammemberrac/TeamMemberRacView.js
|---------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'views/teammemberrac/TeamMemberRacView',
    'text!templates/teammemberrac/TeamMemberRacView.html'

], function ($, Backbone, TotalRacChartView, teamMemberRacTemplate) {

    'use strict';

    return Backbone.View.extend({

        el: $('#team-member-rac'),

        initialize: function () {

            App.vent.on('teamMemberRac:show', this.show, this);
        },


        show: function (projectId, teamId, userId, page) {

            var self = this;

            var options = {data: {teamid: teamId, userid: userId, page: page}};
            App.Collections.TeamMemberRacCollection.id = projectId;
            App.Collections.TeamMemberRacCollection
                .fetch(options).then(function () {

                    console.log(App.Collections.TeamMemberRacCollection);
                    // App.Views.TotalRac.model = App.Collections.TotalRac.get(id);
                    // $.mobile.changePage('#total-rac', {reverse: false, changeHash: true});

            }, function (error) {

                console.log(error);
            });
        },


        render: function () {

            this.$el.html(teamMemberRacTemplate);
            this.$el.trigger('pagecreate');
            return this;
        }
    });
});