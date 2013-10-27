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
    '../views/ProjectView',

    '../collections/TotalUserRacHistoriesCollection',
    '../views/ChartView'
    ],

function ($, Backbone, CachingSync, ProjectsCollection,
    ProjectView, TotalUserRacHistoriesCollection, ChartView) {


    var Router = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Projects List View
            App.Collections.Projects = new ProjectsCollection();
            App.Collections.TotalUserRacHistories = new TotalUserRacHistoriesCollection();
            App.Views.Projects = new ProjectView({el: '#projects', collection: App.Collections.Projects});
            App.Views.TotalUserRacHistories = new ChartView({id: 'totalUserRacHistoriesGraph'});


            $('#totalUserRacHistories').on('pagehide', function (e, data) {

                console.log('pagehide complete!');
            });

            $('#totalUserRacHistories').on('pageshow', function (e, data) {

                console.log('pageshow');
                App.Views.TotalUserRacHistories.render();
            });


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

                App.Views.TotalUserRacHistories.model = App.Collections.TotalUserRacHistories.get(id);
                $.mobile.changePage('#totalUserRacHistories', {reverse: false, changeHash: true});

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