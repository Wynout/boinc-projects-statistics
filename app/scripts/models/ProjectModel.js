// Project Model
// ==============

// Includes file dependencies
define(["jquery", "backbone"], function ($, Backbone) {

    // The Model constructor
    var Model = Backbone.Model.extend({

		urlRoot: 'http://bps-api.wynout.nl/projects'
    });

    // Returns the Model class
    return Model;

});