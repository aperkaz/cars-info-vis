/* Array manipulation and helper class */

var globalObj = (function(){return this}());

function extractCarBrands(parsedData){
  var carCategories = [];
  for(var entry = 0; entry < parsedData.length ; entry++){
    if(carCategories.indexOf(parsedData[entry][2]) === -1){
      carCategories.push(parsedData[entry][2]);
    }
  }
  return carCategories;
}

function aggregateBrandsByFuel(parsedData, carBrands){
    var aggregatedBrandsByFuel = [];
    for(var index = 0; index < carBrands.length ; index++){
      var brandCouple = [];
      //console.log("Brand: ",carBrands[index])
      var gasCars = countGasCars(carBrands[index]);
      //console.log("gas ",gasCars);
      var dieselCars = countDieselCars(carBrands[index]);
      //console.log("diesel ",dieselCars);
      brandCouple.push(gasCars);
      brandCouple.push(dieselCars);
      aggregatedBrandsByFuel.push(brandCouple);
    }
    return aggregatedBrandsByFuel; // [[gasCount, dieselCount],[gasCount, dieselCount],...]
}

function countGasCars(carBrand){
  var gasCars = 0;
  for(var i = 0; i < parsedData.length ; i++){
    if(parsedData[i][2] === carBrand && parsedData[i][3] === "gas"){
      gasCars++;
    }
  }
  return gasCars;
}

function totalGasCars(gasSerie){
  return gasSerie.reduce((a, b) => a + b, 0);
}

function countDieselCars(carBrand){
  var dieselCars = 0;
  for(var i = 0; i < parsedData.length ; i++){
    if(parsedData[i][2] === carBrand && parsedData[i][3] === "diesel"){
      dieselCars++;
    }
  }
  return dieselCars;
}

function totalDieselCars(dieselSerie){
  return dieselSerie.reduce((a, b) => a + b, 0);
}

function riskPriceBrandIndexSerieCreator(parsedData){
  var priceRiskSerie = [];
  parsedData.forEach(function(car, index){
    if(car[0] != null && car[2] != null && car[25] != null){
      var object =  {
          x: 0,
          y: 0,
          brand: "",
          index: -1,
      };
      object.x = Number(car[25]);
      object.y = Number(car[0]);
      object.brand = car[2];
      object.index = index; // 1st row on original dataset -> args !!
      priceRiskSerie.push(object);
    }
  });
  return priceRiskSerie;
}

function carEngineParallelSerie(index){
  var serie = [];
  serie.push(Number(parsedData[index][16])); // engine size
  serie.push(Number(parsedData[index][18])); // bore
  serie.push(Number(parsedData[index][19])); // stroke
  serie.push(Number(parsedData[index][21])); // horse power
  serie.push(Number(parsedData[index][22])); // peak rpm
  serie.push(Number(parsedData[index][20])); // compresion ratio
  return serie;
}

function carEngineAvgValues(){
  var avg = [];
  var engineSize = averageIndex(16); // engine size
  avg.push(engineSize);
  var bore = averageIndex(18); // bore
  avg.push(bore);
  var stroke = averageIndex(19); // stroke
  avg.push(stroke);
  var horsePower = averageIndex(21); // horse power
  avg.push(horsePower);
  var peakRpm = averageIndex(22); // peak rpm
  avg.push(peakRpm);
  var compresionRatio = averageIndex(20); // compresion ratio
  avg.push(compresionRatio);
  return avg;
}

function averageIndex(index){
  var sum = 0;
  var count = 0;
  for(var i = 1 ; i < parsedData.length ; i++){
    if(!isNaN(parsedData[i][index])){
      sum += Number(parsedData[i][index]);
      count++;
    }
  }
  var average = sum / count;
  return average;
}
