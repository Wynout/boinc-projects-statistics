/*
|--------------------------------------------------------------------------
| Router                                      app/scripts/routers/router.js
|--------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',

    '../models/ProjectModel',
    '../collections/ProjectsCollection',
    '../views/ProjectView',

    '../models/TotalUserRacHistoryModel',
    '../collections/TotalUserRacHistoriesCollection',
    '../views/ChartView'
    ],

function ($, Backbone, ProjectModel, ProjectsCollection,
    ProjectView, TotalUserRacHistoryModel, TotalUserRacHistoriesCollection, ChartView) {

    var Router = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Projects List View
            this.projectsView = new ProjectView({
                el: '#projects',
                collection: new ProjectsCollection()
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

            var model      = new TotalUserRacHistoryModel({id: id});
            var view       = new ChartView({id: 'totalUserRacHistoriesGraph', model: model});
            var collection = new TotalUserRacHistoriesCollection([model]);

            var result = model.fetch().then(function (response) {

                $.mobile.changePage('#totalUserRacHistories', {reverse: false, changeHash: true});
                view.render();

            }, function (error) {

                console.log(error);
            });
        },


        // Home method
        projects: function() {

            $.mobile.loading( 'show' );

            this.projectsView.collection.fetch().then(function () {

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