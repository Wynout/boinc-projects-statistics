// TotalUserRacHistory Model
// ==============

// Includes file dependencies
define(["jquery", "backbone"], function ($, Backbone) {

    // The Model constructor
    var TotalUserRacHistoryModel = Backbone.Model.extend({

		// urlRoot: 'http://bps-api.wynout.nl/project/total/user/rac/histories',
		urlRoot: 'http://boinc-backend.dev/project/total/user/rac/histories',
    });

    // Returns the Model class
    return TotalUserRacHistoryModel;

});