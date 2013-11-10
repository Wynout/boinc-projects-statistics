/*
|--------------------------------------------------------------------------
| Projects Collection         app/scripts/collections/ProjectsCollection.js
|--------------------------------------------------------------------------
*/
define([
	'jquery',
	'backbone',
	'config',
	'cachingsync',
	'models/ProjectModel'
], function ($, Backbone, Config, CachingSync, ProjectModel) {

    return Backbone.Collection.extend( {

        model: ProjectModel,
        sync: Backbone.cachingSync(Backbone.sync, 'ProjectsCollection'),
        url: 'http://' + Config.api.domain + '/projects'
    } );
});