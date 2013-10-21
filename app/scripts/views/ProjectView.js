// Project View
// =============

// Includes file dependencies
define(["jquery", "backbone", "models/ProjectModel"], function ($, Backbone, ProjectModel) {

    // Extends Backbone.View
    var ProjectView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            this.collection.on( "added", this.render, this );

        },

        // Renders all of the Project models on the UI
        render: function() {

            // Sets the view's template property
            this.template = _.template( $( "script#projectItems" ).html(), { "collection": this.collection } );

            // Renders the view's template inside of the current listview element
            this.$el.find("ul").html(this.template);

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return ProjectView;

} );