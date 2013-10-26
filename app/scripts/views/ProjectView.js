/*
|--------------------------------------------------------------------------
| Project List View                        app/scripts/views/ProjectView.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'models/ProjectModel'], function ($, Backbone, ProjectModel) {

    var ProjectView = Backbone.View.extend({

        initialize: function () {

            this.collection.on('add', this.render, this);
            // this.collection.on('remove', this.removeBook, this);
            // this.collection.on('reset', this.render, this);
        },

        render: function () {

            this.template = _.template( $( 'script#projectItems' ).html(), { 'collection': this.collection } );

            this.$el.find('ul').html(this.template)
                // Updating lists If you add items to a listview, you'll need to call the refresh() method on it to update the styles and create any nested lists that are added. For example:
                .listview('refresh');

            return this;
        }
    });

    return ProjectView;
});