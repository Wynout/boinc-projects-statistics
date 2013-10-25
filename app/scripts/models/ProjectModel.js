// Project Model
// ==============

// Includes file dependencies
define(["jquery", "backbone"], function ($, Backbone) {

    // The Model constructor
    var ProjectModel = Backbone.Model.extend({

		urlRoot: 'http://bps-api.wynout.nl/projects'
    });

    return ProjectModel;
});