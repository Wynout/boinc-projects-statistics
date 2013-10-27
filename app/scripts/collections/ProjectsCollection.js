/*
|--------------------------------------------------------------------------
| Projects Collection         app/scripts/collections/ProjectsCollection.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'cachingsync', 'models/ProjectModel'], function ($, Backbone, CachingSync, ProjectModel) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        initialize: function (models, options) {
        },

        // Sets the Collection model property to be a Category Model
        model: ProjectModel,
        sync: Backbone.cachingSync(Backbone.sync, 'ProjectsCollection', 3600),
        url: 'http://bps-api.wynout.nl/projects'
    } );

    return Collection;
});