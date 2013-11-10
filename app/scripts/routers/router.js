/*
|--------------------------------------------------------------------------
| Router                                      app/scripts/routers/router.js
|--------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'cachingsync',

    '../collections/ProjectsCollection',
    '../views/projects/ProjectsView',

    '../models/TotalRacModel',
    '../collections/TotalRacCollection',
    '../collections/TeamMemberRacCollection',
    '../views/totalrac/TotalRacView',
    '../views/teammemberrac/TeamMemberRacView'
], function (
    $,
    Backbone,
    CachingSync,
    ProjectsCollection,
    ProjectView,
    TotalRacModel,
    TotalRacCollection,
    TeamMemberRacCollection,
    TotalRacView,
    TeamMemberRacView
    ) {


    var Router = Backbone.Router.extend( {

        initialize: function() {

            App.Collections.Projects = new ProjectsCollection();
            App.Collections.TotalRac = new TotalRacCollection();
            App.Collections.TeamMemberRacCollection = new TeamMemberRacCollection();

            App.Models.TotalRac = new TotalRacModel();

            App.Views.Projects = new ProjectView({collection: App.Collections.Projects});
            App.Views.TotalRac = new TotalRacView();
            App.Views.TeamMemberRac = new TeamMemberRacView();

            $('#total-rac').on('pageshow', function (e, data) {

                App.Views.TotalRac.render();
            });

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },


        routes: {
            '': 'projects',
            'projects': 'projects',
            'project/:id': 'project',
            'project:(:projectId)/total/rac': 'projectTotalRac',
            'projects/total/rac/page:(:page)': 'projectsTotalRac',
            'team/rac/project::projectId/team:(:teamId)/user:(:userId)/page:(:page)': 'teamMemberRac'
        },


        projectTotalRac: function (projectId) {

            App.vent.trigger('projectTotalRac:showSingle', projectId);
        },


        projectsTotalRac: function (page) {

            App.vent.trigger('projectTotalRac:showAll', page);
        },


        // Chart #team/rac/project:1/team:81/user:13479/page:1
        teamMemberRac: function (projectId, teamId, userId, page) {

            App.vent.trigger('teamMemberRac:show', projectId, teamId, userId, page);
        },


        project: function (id) {

            App.vent.trigger('projects:showSingle');
        },


        projects: function() {

            App.vent.trigger('projects:showAll');
        }

    });

    return Router;
});