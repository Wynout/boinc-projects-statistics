window.App = {

    Stores: {},
    Views: {},
    Charts: {}
};


var customClaroTheme, timeLabelFunction, yLabelFunction;

require([
    'dojo/ready',
    'dojo/sniff', // ua sniffing
    'dojo/on',
    'dojo/date/locale',
    'dojo/dom', // byId
    'dojo/query', // returns a list of DOM nodes based on a CSS selector
    'dojo/dom-style',
    'dojo/dom-attr',

    'dojo/fx',
    'dojo/fx/Toggler',
    'dojo/_base/fx',
    'dojo/_base/array',
    'dojo/_base/window',
    'dojo/topic',
    'dojo/io/script',
    'dojox/mobile',
    'dojox/mobile/compat',
    'dojox/mobile/View',
    'dojox/mobile/RoundRect',
    'dojox/mobile/Button',
    'dojox/mobile/parser',
    'dojo/store/JsonRest',
    'dojo/store/Memory',
    'dojox/charting/Chart',
    'dojox/charting/Theme',
    'dojox/charting/themes/CustomClaro',
    'dojox/charting/axis2d/Default',
    'dojox/charting/plot2d/Columns',
    'dojox/charting/plot2d/Areas',
    'dojox/charting/plot2d/Markers',
    'dojox/charting/plot2d/Grid',
    'dojox/data/CsvStore',
    'dijit/registry',
    'dojo/has!touch?dojox/charting/action2d/TouchZoomAndPan:dojox/charting/action2d/MouseZoomAndPan',
    'dojo/has!touch?dojox/charting/action2d/TouchIndicator:dojox/charting/action2d/MouseIndicator'],
    function(ready, has, on, locale, dom, query, domStyle, domAttr, fx, Toggler, basefx, array, win, topic, Script, mobile, compat, View, RoundRect, Button, parser,
            JsonRest, Memory, Chart, Theme, CustomClaro, Default, Columns, Areas, Markers, Grid, CsvStore, registry, ZoomAndPan, Indicator){

    /**********************/
    var pHeight = 0;
    var pWidth  = 0;
    /**********************/


    var resize = function () {

        var viewGraph = dom.byId('viewGraph');
        if (viewGraph.style.visibility==='hidden' || viewGraph.style.display==='none') {

            return;
        }
        var wsize = mobile.getScreenSize();

        // needed for IE, because was overriden to 0 at some point
        if (has('ie')) {

            dom.byId('newChart').style.width = '100%';
        } else {

            // on Android, the window size is changing a bit when scrolling! (original 64)
            // ignore those resize
            // if (wsize.h>pHeight-64 && wsize.h<pHeight+64) {

            //     return;
            // }

        }
        pHeight = wsize.h;
        pWidth = wsize.w;

        var box = {
            h: wsize.w > wsize.h ? wsize.h - 124 : wsize.h - 196,
            w: wsize.h > wsize.w ? wsize.w - 60 : wsize.w - 70
        };

        App.Charts.TotalUserRac.resize(box);
    };

    /**********************/
    var selectedProject;
    var currentData;
    /**********************/


    var showViewGraph = function () {

        graphToggler.show();

        App.Stores.ProjectTotalRacHistories.get(selectedProject).then(function (items) {

            processData(items);
        });
    };

    var hideViewGraph = function () {

        // graphToggler.hide();
        App.Charts.TotalUserRac
            .removeSeries('Values')
            // .title = ''
            .render();
        registry.byId('viewGrapHead').set('label', '');
    };

    var processData = function (items) {

        var values = [];
        currentData = [];
        var item;

        var project = App.Stores.ProjectsList.get(selectedProject);

        for (var key in items) {

            var value = parseInt(items[key], 10);
            values.push(value);
            currentData.push({timestamp: key, value: value});
        }

        App.Charts.TotalUserRac.addSeries('Values', values, {plot:'default'});
        App.Charts.TotalUserRac.title = 'Total granted credits';
        resize();
        App.Charts.TotalUserRac.render();

        dom.byId('viewGrapHead').set('label', project.name);
    };

    timeLabelFunction = function (text, value, precision) {

        var timestamp;
        value     = value>=currentData.length ? currentData.length - 1 : value;
        timestamp = currentData[value].timestamp;

        return locale.format(new Date(timestamp*1000), {
            selector: 'date',
            formatLength: 'short'
        });
    };

    yLabelFunction = function (text, value, precision) {

        if (value<=1e3) {

            return value;
        }

        if (value>1e3 && value<1e6) {

            return value/1e3 + 'K';
        }
        if (value>=1e6) {

            return value/1e6 + 'M';
        }
    };

    var showRange = function (r) {

        // var chart1 = registry.byId('newChart').chart;

        chart1 = App.Charts.TotalUserRac;

        if(r > 0){
            var middle = currentData.length/2;
            chart1.zoomIn('x', [middle-(r/2), middle+(r/2)]);
        }else{
            chart1.zoomIn('x', []);
        }
    };

    /************************************************************/
    var interactionMode = null;
    var interactor1;
    var interactor2;
    /************************************************************/


    var indicatorFillFunc = function (v1, v2) {
        if (v2) {

            return v2.y>v1.y ? 'green' : 'red';

        } else {

            return '#ff9000';
        }
    };

    var switchMode = function () {

        var label = dom.byId('touchLabelNew');
        label.style.display = '';
        domStyle.set(label, 'opacity', 0);
        basefx.fadeIn({node:'touchLabelNew', duration:300}).play();


        setTimeout(function () {

            label.style.display = 'none';
            }, 2000);

        // var chart = registry.byId('stockChartNew').chart;
        var chart = App.Charts.TotalUserRac;

        if (interactionMode===null){

            // we were in no interaction let's go to indicator mode
            interactionMode = 'indicator';

            if (has('touch')) {

                interactor1 = new ZoomAndPan(chart, 'default', { axis: 'x', enableScroll: false, enableZoom: false});
            } else {

                interactor1 = new ZoomAndPan(chart, 'default', { axis: 'x', enableScroll: false });
            }


            if (has('touch')) {

                interactor2 = new Indicator(chart, 'default', {
                    series: 'Values',
                    dualIndicator: true,
                    font: 'normal normal bold 12pt Helvetica',
                    lineOutline: null,
                    outline: null,
                    markerOutline: null,
                    fillFunc: indicatorFillFunc
                });

            } else {

                interactor2 = new Indicator(chart, 'default', {
                    series: 'Values',
                    font: 'normal normal bold 12pt Helvetica',
                    lineOutline: null,
                    outline: null,
                    markerOutline: null,
                    fillFunc: indicatorFillFunc
                });
            }

            label.innerHTML = 'Data Indicator';

        } else if (interactionMode==='indicator') {

            // we were in indicator mode let's go to zoom mode
            interactionMode = 'zoom';
            interactor1.disconnect();
            interactor2.disconnect();
            interactor1 = has('touch')?new ZoomAndPan(chart, 'default', {axis: 'x', scaleFactor:2}):
                new ZoomAndPan(chart, 'default', {axis: 'x', scaleFactor:2});
            label.innerHTML = 'Zoom & Pan';
        } else {

            // we were in zoom mode let's go to null
            interactionMode = null;
            interactor1.disconnect();
            label.innerHTML = 'No Interaction';
        }
        chart.render();
    };


    var loadProjects = function () {

        return Script.get({

            url: "http://boinc-backend.dev/projects/",
            callbackParamName: "callback",
            timeout: 5000,
            load: function (projects) {

                // console.log('load projects callback, do postprocessing here...');
            },
            error: function (error) {

                var msg = "An unexpected error occurred: " + error;
                alert(msg);
            }
        });
    };


    var populateProjectList = function (projects) {

        var projectList = new dojox.mobile.RoundRectList();
        projectList.placeAt(App.Views.Projects.containerNode);
        projectList.startup();

        array.forEach(projects, function (project, index) {

            var listItem = new dojox.mobile.ListItem({
                icon: "resources/images/boinc32.png",
                label: project.name,
                moveTo: 'viewGraph',
                onClick: function () {
                    selectedProject = project.id;
                }
            });
            domAttr.set(listItem.containerNode, 'data-project-id', project.id);
            listItem.placeAt(projectList.containerNode);
            listItem.startup();
        });
    };


    customClaroTheme = new Theme({
        axis:{
            stroke: { // the axis itself
                color: "rgba(0, 0, 0, 0.5)"
            },
            tick: { // used as a foundation for all ticks
                color: "rgba(0, 0, 0, 0.5)",
                fontColor: "rgba(0, 0, 0, 0.5)"
            }
        },
        series: {
            outline: null
        },
        grid: {
            majorLine: {
                color: "rgba(0, 0, 0, 0.2)"
            }
        },
        indicator: {
            lineStroke:  {width: 1.5, color: "#ff9000"},
            lineOutline: {width: 0.5, color: "white"},
            stroke: null,
            outline: null,
            fontColor: "#ffffff",
            markerFill: Theme.generateGradient({type: "radial", space: "shape", r: 100}, "white", "#ff9000"),
            markerStroke: {width: 1.5, color: "#ff9000"},
            markerOutline:{width: 0.5, color: "white"}
        },
        seriesThemes: [ {stroke: "#1a80a8", fill: "#c7e0e9" }, {stroke: "#6d66b9", fill: "#c9c6e4" } ]
    });


    var bindEvents = function () {

        App.Views.viewGraph.on("BeforeTransitionOut", hideViewGraph);
        App.Views.viewGraph.on("AfterTransitionIn", showViewGraph);

        on(win.global, 'resize', resize);
        on(dom.byId("indicatorModeNew"), "click", switchMode);

        on(query('button.showRange'), 'click', function () {

            var range = parseInt(domAttr.get(this, 'data-show-range'), 10);
            if (isNaN(range)) {

                return;
            }
            showRange(range);
        });


        switchMode();
        topic.subscribe("/dojox/mobile/resizeAll", resize);

    };



    var graphToggler = new Toggler({
        node: "containerViewGraph",
        showFunc: fx.wipeIn,
        hideFunc: fx.wipeOut
    });


    var initialize = function () {

        App.Stores.Projects = new JsonRest({target:"http://boinc-backend.dev/projects/"});
        App.Stores.ProjectTotalRacHistories = new JsonRest({target:"http://boinc-backend.dev/projects/total/user/rac/history/show/"});
        App.Stores.ProjectsList = [];

        App.Views.Projects  = registry.byId('viewProjects');
        App.Views.viewGraph = registry.byId('viewGraph');

        App.Charts.TotalUserRac = new Chart('newChart')
            .setTheme(CustomClaro)
            .addPlot("default", {
                // shadow: {dx: 0, dy: 0},
                tension: 3,
                type: Areas
            })
            .addAxis("x", {
                enableCache: true,
                fixLower: "none",
                fixUpper: "none",
                labelFunc: timeLabelFunction,
                leftBottom: true,
                majorTickStep: 4,
                markers: true,
                microTickStep: 1,
                minorTickStep: 2,
                renderOnAxis: false
            })
            .addAxis("y", {
                fixLower: "major",
                fixUpper: "major",
                labelFunc: yLabelFunction,
                leftBottom: false,
                min: 0,
                vertical: true
            });

        loadProjects().then(function (projects) {

            App.Stores.ProjectsList = new Memory({data: projects});
            populateProjectList(projects);
            bindEvents();

        }, function (error) {

            var msg = "An unexpected error occurred: " + error;
            alert(msg);
        });
    };
    ready(initialize);

});
