/*
|--------------------------------------------------------------------------
| Router                                      app/scripts/routers/router.js
|--------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'cachingsync',

    '../models/ProjectModel',
    '../collections/ProjectsCollection',
    '../views/ProjectView',

    '../models/TotalUserRacHistoryModel',
    '../collections/TotalUserRacHistoriesCollection',
    '../views/ChartView'
    ],

function ($, Backbone, CachingSync, ProjectModel, ProjectsCollection,
    ProjectView, TotalUserRacHistoryModel, TotalUserRacHistoriesCollection, ChartView) {


    var Router = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Projects List View
            App.Collections.Projects = new ProjectsCollection();
            App.Collections.TotalUserRacHistories = new TotalUserRacHistoriesCollection();
            App.Views.Projects = new ProjectView({el: '#projects', collection: App.Collections.Projects});

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },


        // Backbone Routes
        routes: {

            '': 'projects',
            'projects': 'projects',
            'project/:id': 'project',
            'project/:id/total/user/rac/history': 'totalUserRacHistories',
        },


        // Chart #project/:id/total/user/rac/history
        totalUserRacHistories: function (id) {

            App.Collections.TotalUserRacHistories.fetch().then(function () {

                var view  = new ChartView({id: 'totalUserRacHistoriesGraph', model: App.Collections.TotalUserRacHistories.get(id)});

                $.mobile.changePage('#totalUserRacHistories', {reverse: false, changeHash: true});
                view.render();

            }, function (error) {

                console.log(error);
            });
        },


        // Home method
        projects: function() {

            $.mobile.loading( 'show' );

            App.Collections.Projects.fetch().then(function () {

                $.mobile.loading( 'hide' );
            });
        },


        // Project method
        project: function (id) {

            console.log(id);
        }


    });

    return Router;
});