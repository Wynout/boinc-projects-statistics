// Projects Collection
// ===================

// Includes file dependencies
define(["jquery", "backbone", "models/ProjectModel"], function ($, Backbone, ProjectModel) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
            // this.type = options.type;

        },

        // Sets the Collection model property to be a Category Model
        model: ProjectModel,
        url: 'http://bps-api.wynout.nl/projects'

    } );

    // Returns the Model class
    return Collection;

} );