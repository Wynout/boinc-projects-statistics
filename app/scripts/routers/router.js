/*
|--------------------------------------------------------------------------
| Router                                      app/scripts/routers/router.js
|--------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'cachingsync',
    'highstock-theme',

    '../collections/ProjectsCollection',
    '../views/projects/ProjectsView',

    '../collections/TeamMemberRacCollection',
    '../views/totalrac/TotalRacChartView',
    '../views/teammemberrac/TeamMemberRacView'

], function (
    $,
    Backbone,
    CachingSync,
    HighstockTheme,
    ProjectsCollection,
    ProjectView,
    TeamMemberRacCollection,
    TotalRacView,
    TeamMemberRacView
    ) {


    var Router = Backbone.Router.extend( {

        initialize: function() {

            App.Collections.Projects = new ProjectsCollection();

            App.Collections.TeamMemberRacCollection = new TeamMemberRacCollection();

            App.Views.Projects = new ProjectView({collection: App.Collections.Projects});
            // App.Views.TotalRac = new TotalRacView();
            App.Views.TeamMemberRac = new TeamMemberRacView();

            // Start watching for hashchange events
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

            var pageId = 'project-total-rac';
            if (App.Views.ProjectTotalRac===null || App.Views.ProjectTotalRac===undefined) {

                App.Views.ProjectTotalRac = new TotalRacView({
                    el: $('#' + pageId),
                    chart: {
                        renderTo:'project-total-rac-chart'
                    }
                });
            }
            App.vent.trigger(pageId + ':showSingle', projectId);
        },


        projectsTotalRac: function (page) {

            var pageId = 'project-total-rac';
            if (App.Views.ProjectTotalRac===null || App.Views.ProjectTotalRac===undefined) {

                App.Views.ProjectTotalRac = new TotalRacView({
                    el: $('#' + pageId),
                    chart: {
                        renderTo:'project-total-rac-chart'
                    }
                });
            }
            App.vent.trigger(pageId + ':showAll', page);
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