define([
  'jquery',
  'backbone',
  'text!templates/projects/projectsListTemplate.html'
], function ($, Backbone,  projectsListTemplate) {

	var ProjectListView = Backbone.View.extend({

		el: $("#projects-list"),

		render: function () {

			var compiledTemplate = _.template(projectsListTemplate, {collection: this.collection});
			$('#projects-list').html(compiledTemplate);
		}

	});
	return ProjectListView;
});