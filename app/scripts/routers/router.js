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
    '../views/totalrac/TotalRacView'
    ],

function (
    $,
    Backbone,
    CachingSync,
    ProjectsCollection,
    ProjectView,
    TotalRacModel,
    TotalRacCollection,
    ActiveTeamMemberRacHistoriesCollection,
    TotalRacView
    ) {


    var Router = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Projects List View
            App.Collections.Projects = new ProjectsCollection();
            App.Collections.TotalRac = new TotalRacCollection();

            App.Models.TotalRac = new TotalRacModel();

            App.Collections.ActiveTeamMemberRacHistories = new ActiveTeamMemberRacHistoriesCollection();
            App.Views.Projects = new ProjectView({collection: App.Collections.Projects});
            App.Views.TotalRac = new TotalRacView();

            $('#total-rac').on('pageshow', function (e, data) {

                App.Views.TotalRac.render();
            });

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },


        // Backbone Routes
        routes: {

            '': 'projects',
            'projects': 'projects',
            'project/:id': 'project',
            // 'project/:id/total/user/rac/history/page:(:page)': 'totalUserRacHistories',
            'project:(:projectId)/total/rac': 'projectTotalRac',
            'projects/total/rac/page:(:page)': 'projectsTotalRac',

            'team/rac/project::projectId/team:(:teamId)/user:(:userId)/page:(:page)': 'teamRac'
        },


        projectTotalRac: function (projectId) {

            App.Models.TotalRac.id = projectId;
            App.Models.TotalRac.fetch({
                success: function () {

                    App.Views.TotalRac.model = App.Models.TotalRac;
                    App.Views.TotalRac.page = null;
                    $.mobile.changePage('#total-rac', {reverse: false, changeHash: true});
                }
            }).always(function () {

            });
        },


        projectsTotalRac: function (page) {

            page = (page===null || page===undefined) ? 1 : page;


            App.Collections.TotalRac.id = page;
            App.Collections.TotalRac.fetch({data: {page: page}}).then(function (response) {

                if (response[0]) {
                    response = response[0];
                }

                App.Views.TotalRac.model = null;
                App.Views.TotalRac.page  = response;
                // App.Views.TotalRac.render();
                $.mobile.changePage('#total-rac', {reverse: false, changeHash: true});

            }, function (error) {

                console.log(error);
            });
        },


        // Chart #team/rac/project:1/team:81/user:13479/page:1
        teamRac: function (projectId, teamId, userId, page) {

            console.log(arguments);
            // You have to specify {add: true} and your pagination arguments in collection.fetch call. It will append to collection instead of reseting its contents.
            // collection.fetch({data: {page: 3}, add: true})
            // Then simply listen to collection's add event and append item to your view.
            // return;

            var options = {data: {teamid: teamId, userid: userId, page: page}};
            App.Collections.ActiveTeamMemberRacHistories.id = projectId;
            App.Collections.ActiveTeamMemberRacHistories
                .fetch(options).then(function () {

                    console.log(App.Collections.ActiveTeamMemberRacHistories);
                // App.Views.TotalRac.model = App.Collections.TotalRac.get(id);
                // $.mobile.changePage('#total-rac', {reverse: false, changeHash: true});

            }, function (error) {

                console.log(error);
            });
        },


        projects: function() {

            App.Collections.Projects.fetch().then(function () {

                App.Views.Projects.render();
            });
        },


        project: function (id) {

            console.log(id);
        }

    });

    return Router;
});