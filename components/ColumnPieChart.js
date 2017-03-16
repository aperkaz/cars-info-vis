// columnPieChart file
var columnPieChart;

function renderColumnPieChart(){

  columnPieChart = Highcharts.chart('columnPieChart', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of cars'
            }
        },
        legend: {
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            //pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
            formatter: function() {
                        var s;
                        if (this.point.name) { // the pie chart
                            return false;
                        } else {
                            s = '<b>' + this.key + '</b><br/>'
                             + this.series.name + ':' + this.point.y
                             + '<br/>Total:' + this.point.stackTotal;
                        }
                        return s;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'Gas',
            data: [],
            color: "#99D8C9"
        }, {
            name: 'Diesel',
            data: [],
            color: "#2CA25F"
        }, {
            type: 'pie',
            name: '',
            data: [{
                name: 'Gas',
                y: 0,
                color: "#99D8C9" // Gas color
            }, {
                name: 'Diesel',
                y: 0,
                color: "#2CA25F" // Diesel color
            }],
            center: [75, 89],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: false
        }],
        credits: {
          enabled: false
        },
        exporting: { enabled: false }
    });

}

// columnPieChart methods
function populateColumnPieChart(){
    // render initial chart
    showColumnPieChart();
    renderColumnPieChart();

    // set categories
    carBrands = extractCarBrands(parsedData);
    setColumnPieChartCategories(carBrands);

    // set series
    var carBrandByFuelAggregation = aggregateBrandsByFuel(parsedData, carBrands);
    var gasSerie = [];
    var dieselSerie = [];
    carBrandByFuelAggregation.forEach(function(couple){
        gasSerie.push(couple[0]);
        dieselSerie.push(couple[1]);
    });
    setColumnPieChart_ColumnSeries(gasSerie, dieselSerie);

    // set pie chart
    setColumnPieChart_PieSeries(totalGasCars(gasSerie), totalDieselCars(dieselSerie));
}

function setColumnPieChartCategories(categories) {
    var chart1=$("#columnPieChart").highcharts();
    chart1.xAxis[0].setCategories(categories);
    chart1.redraw();
}

function setColumnPieChart_ColumnSeries(gasSerie, dieselSerie){
  var chart1=$("#columnPieChart").highcharts();
  chart1.series[0].setData(gasSerie);
  chart1.series[1].setData(dieselSerie);
}

function setColumnPieChart_PieSeries(gasTotal, dieselTotal){
  var chart1=$("#columnPieChart").highcharts();
  var tempS1 = chart1.series[2].data[0];
  tempS1.y = gasTotal;
  var tempS2 = chart1.series[2].data[1];
  tempS2.y = dieselTotal;
  var tempS = [];
  tempS.push(tempS1);
  tempS.push(tempS2);
  chart1.series[2].setData(tempS);
  chart1.redraw();
}

function hideColumnPieChart(){
   var columnPieChartWrapper = document.getElementById("columnPieChart");
   columnPieChartWrapper.style.display = 'none';
}

function showColumnPieChart(){
   var columnPieChartWrapper = document.getElementById("columnPieChart");
   columnPieChartWrapper.style.display = 'block';
}
