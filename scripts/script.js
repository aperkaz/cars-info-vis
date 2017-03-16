var parsedData = [];
var carBrands = [];

// file handler
function handleFileInputClick(){
  var fileInput = document.getElementById('raw-data-input');
  fileInput.value = null;
}

function handleFileInputChange() {
  var fileInput = document.getElementById('raw-data-input');
  parsedData = [];
  readFile(fileInput.files[0]);
}

function readFile( file ){
  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    parsedData = parseData(e.target.result);
    initialRender();
  };
  fileReader.readAsText(file);
  var filePicker = document.getElementById("filePicker");
  filePicker.style.display = 'none';
}

function parseData( rawData ) {
  var parsedData = [];
  rawData.split("\n").forEach(function(line,index){
    if(line.length > 0){
      var arguments = line.split(",");
      if(index != 0) // jump argument row
        parsedData.push(arguments);
    }
  });
  return parsedData;
}

function initialRender(){
  populateColumnPieChart();
  populateScatterPlot();
}
