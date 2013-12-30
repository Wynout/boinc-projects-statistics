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
	'models/ProjectModel',
	'bootstrap/Projects'
], function ($, Backbone, Config, CachingSync, ProjectModel, bootstrap) {

    'use strict';

    var ProjectsCollection = Backbone.Collection.extend({

        model: ProjectModel,
        sync: Backbone.cachingSync(Backbone.sync, 'ProjectsCollection'),
        url: 'http://' + Config.api.domain + '/projects',

        initialize: function (options) {

        	this.reset(bootstrap);
        }

    });

    return ProjectsCollection;
});