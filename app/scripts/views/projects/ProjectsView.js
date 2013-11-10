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

        render: function () {

            this.$el.html(projectsTemplate);

            var projectsListView = new ProjectsListView({collection: this.collection});
            projectsListView.render();

            this.$el.trigger('pagecreate');

            return this;
        }
    });
});