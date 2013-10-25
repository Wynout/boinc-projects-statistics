// TotalUserRacHistory Collection
// ===================

// Includes file dependencies
define(["jquery", "backbone", "models/TotalUserRacHistoryModel"], function ($, Backbone, TotalUserRacHistoryModel) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
            // this.type = options.type;

        },

        // Sets the Collection model property to be a Category Model
        model: TotalUserRacHistoryModel,
        // url: 'http://bps-api.wynout.nl/project/total/user/rac/histories'
        url: 'http://boinc-backend.dev/project/total/user/rac/histories'

    } );

    return Collection;
} );