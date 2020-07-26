// Inital Map Graph
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
  });

var tile = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
  }).addTo(myMap)


// Inital MPG Graph
var data2 = [
  {
    type: "indicator",
    mode: "gauge+number",
    value: 0.0,
    title: { text: "<b>Average MPG</b>"},
    gauge: {
      bar: { color: "red"},  
    }
  }
];

var layout2 = {
  autosize: true,
  //margin: { t: 0, b: 0  },
};     
Plotly.newPlot('viz-three', data2, layout2);


// Initial Bar Chart
var data = [{
  type: 'bar',
  x: [0,0,0,0,0],
  y: ['model1','model2','model3','model4','model5'],
  orientation: 'h',
  width: .1}];
  
  var layout = {
    autosize: true,
    title: "Average Cost by Make",
    xaxis: { title: "$ Avg. Cost" },
    yaxis: { title: "Models" },
  };
  Plotly.newPlot('viz-two', data, layout);





// Creating and identifying all unique Makes onto the webpage
var uniqueMake = d3.map(myData, function(d){return d["Make"];}).keys();

d3.select("#exampleFormControlSelect1").selectAll("option")
  .data(uniqueMake.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;});



// Event Listener for Make Option
d3.select("#exampleFormControlSelect1").on("change", updateFilters);  
// Event Listener for Model capture
d3.select("#exampleFormControlSelect2").on("change", updateData); 




// Functions for the options
function updateFilters() {
  // Capturing change element on Make
  var changedElement = d3.select(this)
  var elementValue = changedElement.property("value");

  var filteredData = myData;  
  filteredData = filteredData.filter(row => row["Make"] === elementValue);
 
  var uniqueModel = d3.map(filteredData, function(d){return d["Model"];}).keys();
  d3.select("#exampleFormControlSelect2").selectAll("option").remove()
  d3.select("#exampleFormControlSelect2").selectAll("option")
  .exit()
  .data(uniqueModel.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;});
  
  var uniqueYear = d3.map(filteredData, function(d){return d["Year"];}).keys();
  d3.select("#exampleFormControlSelect3").selectAll("option").remove()
  d3.select("#exampleFormControlSelect3").selectAll("option")
  .exit()
  .data(uniqueYear.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;})
 
  updateData()
}; //end function all reactive inside




// After the options have been populated, let us grab the selected ones and update the data
function updateData() {
  // New variable for the function
  var filteredData = myData;  

  // Filter Data by Make
  var makeElement= d3.select("#exampleFormControlSelect1")
  var makeValue = makeElement.property("value");
  var filteredData = filteredData.filter(row => row["Make"] === makeValue);

  // Build the model graph with filteredData
  ModelGraph(filteredData)

  // Filter Data by Model
  var modelElement= d3.select("#exampleFormControlSelect2")
  var modelValue = modelElement.property("value");
  filteredData = filteredData.filter(row => row["Model"] === modelValue)
  
  // Filter Data by Year
  //   var yearElement= d3.select("#exampleFormControlSelect3")
  //   var yearValue = yearElement.property("value");
  //   var finalYear= parseInt(yearValue)
  //   filteredData = filteredData.filter(row => row["Year"] === 2006)
  
  BuildMap(filteredData)

  // capturing all MPG's
  var allMpg= 0
  filteredData.forEach(m => { 
    var currentMpg= m['mpg']
    allMpg += currentMpg})
  console.log(allMpg)
  // Calculating the average MPG
  var averageMpg = allMpg / filteredData.length
  // Giving out MPG graph the new average to produe
  BuildMPG(averageMpg)

  return filteredData

};





// Now that the data has been filtered, let us build our graphs
function BuildMPG(average){
  var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: average,
      title: { text: "<b>Average MPG</b>"},
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];
  
  var layout2 = {
    autosize: true,
    //margin: { t: 0, b: 0  },
  };     

Plotly.newPlot('viz-three', data2, layout2);
}




// Build our Model Graph
function ModelGraph(data){
  // capturing all possible models
  var allModels = d3.map(data, function(d){return d["Model"];}).keys();
  // querying our database for each possible model and capturing the price
  
  averagePrices=[]

  // This can proabably be done with a ,unique( ) function, ask frank to help here/ 
  allModels.forEach(d=> { 
    var newData= data.filter(row => row["Model"] === d)

    allPrices=0

    newData.forEach(d => { 
      var currentprice= d["craigslist_price"]
      allPrices+=currentprice
    });
    // Calculating the average MPG
    var averagePrice = allPrices / newData.length;
    averagePrices.push(averagePrice)

  });

  xValues= averagePrices.slice(0,5)
  yValues= allModels.slice(0,5)
  // Bar chat (thin) for Avg cost by model
  var data = [{
    type: 'bar',
    x: xValues,
    y: yValues,
    orientation: 'h',
    width: .1}];
    
    var layout = {
      autosize: true,
      title: "Average Cost by Make",
      xaxis: { title: "$ Avg. Cost" },
      yaxis: { title: "Models" },
    };
    Plotly.newPlot('viz-two', data, layout);

};



function BuildMap(data) {
  // Map Pins below
    // removes all layers from map (to reset on selection change)
    myMap.eachLayer(function(layer){
      layer.remove();
    });  
    tile.addTo(myMap) // adds the tilelayer back
    myMap.setView([37.0902, -95.7129], 4) // resets the view
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
    // Loop through data
    for (var i = 0; i < data.length; i++) {
    console.log(data[i])
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([data[i]["lat"], data[i]["lng"]])
        .bindPopup("<center><h6>"+data[i]["Make"]+" "+data[i]["Model"]+" "+data[i]["Year"]+"</center></h6><hr><h6><center> $"+d3.format(",")(data[i]["craigslist_price"])+" MPG"+data[i]["mpg"]+"</center></h6>"));
      }  // Add our marker cluster layer to the map
    myMap.addLayer(markers);
}