/*
|--------------------------------------------------------------------------------------------
| Default options for zoomable time series chart
|--------------------------------------------------------------------------------------------
*/
define(['highcharts'], function (Highcharts) {

    var defaultOptions = {

            chart: {
                renderTo: 'element-id',
                zoomType: 'x',
                spacingRight: 20
            },


            title: {
                text: 'Chart Title'
            },


            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Pinch the chart to zoom in'
            },


            xAxis: {
                type: 'datetime',
                maxZoom: 14 * 24 * 3600000, // fourteen days
                title: {
                    text: null
                }
            },


            yAxis: {
                title: {
                    text: 'yAxis title'
                }
            },


            tooltip: {
                shared: true
            },


            legend: {
                enabled: false
            },


            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },


            series: [{
                type: 'area',
                name: 'Series name',
                pointInterval: 24 * 3600 * 1000, // defaults to 1 day in milliseconds
                // pointStart: Date.UTC(2006, 0, 01),
                pointStart: null,
                data: []
            }]
        };

    return defaultOptions;
});