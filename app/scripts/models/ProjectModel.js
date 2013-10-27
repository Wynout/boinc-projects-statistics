/*
|--------------------------------------------------------------------------
| Project Model                          app/scripts/models/ProjectModel.js
|--------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'cachingsync'], function ($, Backbone, CachingSync) {

    var ProjectModel = Backbone.Model.extend({

		urlRoot: 'http://bps-api.wynout.nl/projects',
		sync: Backbone.cachingSync(Backbone.sync, 'ProjectModel', 3600),
    });
    return ProjectModel;
});