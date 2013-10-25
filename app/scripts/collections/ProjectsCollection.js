/*
|--------------------------------------------------------------------------
| Projects Collection         app/scripts/collections/ProjectsCollection.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'models/ProjectModel'], function ($, Backbone, ProjectModel) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        initialize: function( models, options ) {
        },

        // Sets the Collection model property to be a Category Model
        model: ProjectModel,
        url: 'http://bps-api.wynout.nl/projects'
    } );

    return Collection;
});