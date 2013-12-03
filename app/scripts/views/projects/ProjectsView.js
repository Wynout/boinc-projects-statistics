/*
|--------------------------------------------------------------------------
| Projects View                  app/scripts/views/projects/ProjectsView.js
|--------------------------------------------------------------------------
*/
define([
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'views/projects/ProjectsListView',
    'text!templates/projects/projectsTemplate.html'
], function (doc, $, _,  Backbone, ProjectsListView, projectsTemplate) {

    return Backbone.View.extend({

        el: $('#projects'),


        initialize: function () {

            App.vent.on('projects:showAll', this.showAll, this);
        },


        showSingle: function (projectId) {

            var self = this;
        },


        showAll: function () {

            // App.Collections.Projects.fetch().then(function () {

                // App.Views.Projects.render();
            // });
            this.render();
        },


        render: function () {

            this.$el.html(projectsTemplate);

            var projectsListView = new ProjectsListView({collection: App.Views.Projects.collection});
            projectsListView.render();

            this.$el.trigger('pagecreate');

            return this;
        }
    });
});