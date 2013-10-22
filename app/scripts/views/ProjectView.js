// Project View
// =============

// Includes file dependencies
define(["jquery", "backbone", "models/ProjectModel"], function ($, Backbone, ProjectModel) {

    // Extends Backbone.View
    var ProjectView = Backbone.View.extend( {

        // The View Constructor
        initialize: function () {

            this.collection.on("add", this.render, this);
            // this.collection.on("remove", this.removeBook, this);
            // this.collection.on("reset", this.render, this);
        },

        // Renders all of the Project models on the UI
        render: function() {

            // Sets the view's template property
            this.template = _.template( $( "script#projectItems" ).html(), { "collection": this.collection } );

            // Renders the view's template inside of the current listview element
            this.$el.find("ul").html(this.template)
                // Updating lists If you add items to a listview, you'll need to call the refresh() method on it to update the styles and create any nested lists that are added. For example:
                .listview('refresh');

            // Maintains chainability
            return this;
        }

    });

    // Returns the View class
    return ProjectView;
});