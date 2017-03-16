// scatterPlot file
var scatterPlot;

function renderScatterPlot(){

  scatterPlot = Highcharts.chart('scatterPlot', {
         chart: {
             type: 'scatter',
             zoomType: 'xy'
         },
         title: {
             text: 'Risk and Price Relation',
             y: 30
         },
         legend: {
             enabled : false
         },
         xAxis: {
             title: {
                 enabled: true,
                 text: 'Price [$]'
             },
             gridLineWidth: 1,
             startOnTick: true,
             endOnTick: true,
             showLastLabel: true
         },
         yAxis: {
             title: {
                 text: 'Risk per Price Symboling'
             },
             tickInterval: 1,
         },
         plotOptions: {
             scatter: {
                 marker: {
                     radius: 1.8,
                     states: {
                         hover: {
                             enabled: true,
                             lineColor: 'rgb(100,100,100)'
                         }
                     }
                 },
                 states: {
                     hover: {
                         marker: {
                             enabled: false
                         }
                     }
                 }
             }
         },
         tooltip: {
             formatter: function() {
                         var s = '<b>' + this.point.brand + '</b><br/>'
                          + '<br/>Price: ' + this.point.x +" $"
                          + '<br/>Risk symboling: ' + this.point.y;

                         return s;
             }
         },
         series: [{
             name: 'Cars',
             cursor: 'pointer',
             events: {
               click: function (event) {
                 setParallelCoordinatesSerie(event.point.index);
               }
             },
             data: [],
             color: "d8b365"
         }],
         credits: {
           enabled: false
         },
         exporting: { enabled: false }
   });


}

// scatterPlot methods
function populateScatterPlot(){
    // render initial chart
    showScatterPlot();
    renderScatterPlot();

    // set scatter plot series
    setScatterPlotSerie(riskPriceBrandIndexSerieCreator(parsedData));
}

function setScatterPlotSerie(serieData){
    var chart2=$("#scatterPlot").highcharts();
    chart2.series[0].setData(serieData);
    chart2.redraw();
}


function hideScatterPlot(){
   var scatterPlotWrapper = document.getElementById("scatterPlot");
   scatterPlotWrapper.style.display = 'none';
}

function showScatterPlot(){
   var scatterPlotWrapper = document.getElementById("scatterPlot");
   scatterPlotWrapper.style.display = 'block';
}
