// Mobile Router
// =    ============

// Includes file dependencies
define([ 'jquery',
         'backbone',
         '../models/CategoryModel',
         '../collections/CategoriesCollection',
         '../views/CategoryView',

         '../models/ProjectModel',
         '../collections/ProjectsCollection',
         '../views/ProjectView',

         '../models/TotalUserRacHistoryModel',
         '../collections/TotalUserRacHistoriesCollection',
         '../collections/ChartSeriesCollection',
         '../views/ChartView'
    ],

function ( $, Backbone, CategoryModel, CategoriesCollection, CategoryView, ProjectModel, ProjectsCollection,
    ProjectView, TotalUserRacHistoryModel, TotalUserRacHistoriesCollection, ChartSeriesCollection, ChartView ) {

    // Extends Backbone.Router
    var CategoryRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Animal Category View
            this.animalsView = new CategoryView( { el: '#animals', collection: new CategoriesCollection( [] , { type: 'animals' } ) } );

            // Instantiates a new Colors Category View
            this.colorsView = new CategoryView( { el: '#colors', collection: new CategoriesCollection( [] , { type: 'colors' } ) } );

            // Instantiates a new Vehicles Category View
            this.vehiclesView = new CategoryView( { el: '#vehicles', collection: new CategoriesCollection( [] , { type: 'vehicles' } ) } );


            // Instantiates a new Projects List View
            this.projectsView = new ProjectView({
                el: '#projects',
                collection: new ProjectsCollection()
            });

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },


        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            '': 'projects',
            'projects': 'projects',
            'project/:id': 'project',
            'project/:id/total/user/rac/history': 'totalUserRacHistories',

            // When #category? is on the url, the category method is called
            'category?:type': 'category'

        },


        // Chart
        // http://boinc-projects-statistics.dev/#project/:id/total/user/rac/history
        totalUserRacHistories: function (id) {

            var model      = new TotalUserRacHistoryModel({id: id});
            var view       = new ChartView({id: 'totalUserRacHistoriesGraph', model: model});
            var collection = new TotalUserRacHistoriesCollection([model]);

            var result     = model.fetch().then(function (response) {

            }, function (error) {
                console.log(error);
            });

            $.mobile.changePage( '#totalUserRacHistories' , { reverse: false, changeHash: true } );
        },


        // Home method
        projects: function() {

            // Show's the jQuery Mobile loading icon
            $.mobile.loading( 'show' );

            this.projectsView.collection.fetch().then(function () {

                $.mobile.loading( 'hide' );
                // $(this.el).trigger( 'pagecreate' );
            });

            // Programatically changes to the projects page
            // $.mobile.changePage( '#projects' , { reverse: false, changeHash: true } );

        },


        // Category method that passes in the type that is appended to the url hash
        category: function (type) {

            // Stores the current Category View  inside of the currentView variable
            var currentView = this[ type + 'View' ];

            // If there are no collections in the current Category View
            if(!currentView.collection.length) {

                // Show's the jQuery Mobile loading icon
                $.mobile.loading( 'show' );

                // Fetches the Collection of Category Models for the current Category View
                currentView.collection.fetch().done( function() {

                    // Programatically changes to the current categories page
                    $.mobile.changePage( '#' + type, { reverse: false, changeHash: true } );

                } );

            }

            // If there already collections in the current Category View
            else {

                // Programatically changes to the current categories page
                $.mobile.changePage( '#' + type, { reverse: false, changeHash: true } );

            }
        },


        // Project method
        project: function (id) {

            console.log(id);

            // // Stores the current Category View  inside of the currentView variable
            // var currentView = this[ type + 'View' ];

            // // If there are no collections in the current Category View
            // if(!currentView.collection.length) {

            //     // Show's the jQuery Mobile loading icon
            //     $.mobile.loading( 'show' );

            //     // Fetches the Collection of Category Models for the current Category View
            //     currentView.collection.fetch().done( function() {

            //         // Programatically changes to the current categories page
            //         $.mobile.changePage( '#' + type, { reverse: false, changeHash: true } );

            //     } );

            // }

            // // If there already collections in the current Category View
            // else {

            //     // Programatically changes to the current categories page
            //     $.mobile.changePage( '#' + type, { reverse: false, changeHash: true } );

            // }
        }


    } );

    // Returns the Router class
    return CategoryRouter;

} );