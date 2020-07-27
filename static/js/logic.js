// Map For Craig's List pins
var myMap = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 4
})
var tile = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/satellite-streets-v10',
  accessToken: API_KEY
}).addTo(myMap)

// gauge chart for MPG
var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: 16.9,
      title: { text: "MPG"},
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];
  
  var layout2 = {
    autosize: true,
    };     

Plotly.newPlot('viz-three', data2, layout2);

// Initial Bar Chart
var data = [
  {
    type: "bar",
    x: [0, 0, 0, 0, 0],
    y: ["model1", "model2", "model3", "model4", "model5"],
    orientation: "h",
    width: 0.1,
  },
];

var layout = {
  autosize: true,
  title: "Average Cost",
  xaxis: { title: "$ Avg. Cost" },
};
Plotly.newPlot("viz-two", data, layout);

var uniqueMake = d3.map(myData, function(d){return d["Make"];}).keys();

d3.select("#exampleFormControlSelect1").selectAll("option")
  .data(uniqueMake.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;});

//*****Make Function Starts *************/
function selectedMake() {
  var elementValue = d3.select(this).property("value");
  var filteredData = myData.filter(row => row["Make"] === elementValue);
 
  var uniqueModel = d3.map(filteredData, function(d){return d["Model"];}).keys();
  d3.select("#exampleFormControlSelect2").selectAll("option").remove()
  d3.select("#exampleFormControlSelect2").append("option").text("Select Model")
  d3.select("#exampleFormControlSelect2").selectAll("option")
  .exit()
  .data(uniqueModel.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;});
  
  var uniqueYear = d3.map(filteredData, function(d){return d["Year"];}).keys();
  d3.select("#exampleFormControlSelect3").selectAll("option").remove()
  d3.select("#exampleFormControlSelect3").append("option").text("Select Year")
  d3.select("#exampleFormControlSelect3").selectAll("option")
  .exit()
  .data(uniqueYear.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;})

  console.log(filteredData) 
  
  // Map Pins below
  // removes all layers from map (to reset on selection change)
  myMap.eachLayer(function(layer){
    layer.remove();
  });  
  tile.addTo(myMap) // adds the tilelayer back
  myMap.setView([37.0902, -95.7129], 4) // resets the view
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < filteredData.length; i++) {
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([filteredData[i]["lat"], filteredData[i]["lng"]])
      .bindPopup("<center><h6>"+filteredData[i]["Make"]+" "+filteredData[i]["Model"]+" "+filteredData[i]["Year"]+"</center></h6><hr><h6><center> $"+d3.format(",")(filteredData[i]["craigslist_price"])+" MPG"+filteredData[i]["mpg"]+"</center></h6>"));
    }  // Add our marker cluster layer to the map      
  myMap.addLayer(markers);

  // capturing Average MPG's
  var total = 0;
  for(var i = 0; i < filteredData.length; i++) {
      total += filteredData[i]["mpg"];
  }
  // Calculating the average MPG
  var averageMpg = total / filteredData.length;
  var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: averageMpg,
      title: { text: `Avg. MPG<br>${elementValue}`},
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];
  Plotly.newPlot('viz-three', data2, layout2);

  // Build our Model Graph  
  var averagePrices = [];

  // This can proabably be done with a ,unique( ) function, ask frank to help here/
  uniqueModel.forEach((d) => {
    var newData = filteredData.filter((row) => row["Model"] === d);
    //console.log("New Data: ", newData);
  var allPrices = 0;

    newData.forEach((d) => {
      var currentprice = d["craigslist_price"];
      allPrices += currentprice;
    });
    // Calculating the average MPG
    var averagePrice = allPrices / newData.length;
    averagePrices.push(averagePrice);
  });

  xValues = averagePrices.slice(0, 5);
  yValues = uniqueModel.slice(0, 5);
  // Bar chat (thin) for Avg cost by model
  var data = [
    {
      type: "bar",
      x: xValues,
      y: yValues,
      orientation: "h",
      width: 0.1,
    },
  ];

  var layout = {
    autosize: true,
    title: `Average Cost - ${elementValue}`,
    xaxis: { title: "$ Avg. Cost" },
    // yaxis: { title: "Models" },
  };
  Plotly.newPlot("viz-two", data, layout);  
} //end function all reactive inside

d3.select("#exampleFormControlSelect1").on("change", selectedMake);  

//*****Model Function Starts *************/
function selectedModel() {
  var elementValue = d3.select(this).property("value");
  var filteredData = myData.filter(row => row["Model"] === elementValue);
      
  var uniqueYear = d3.map(filteredData, function(d){return d["Year"];}).keys();
  d3.select("#exampleFormControlSelect3").selectAll("option").remove()
  d3.select("#exampleFormControlSelect3").append("option").text("Select Year")
  d3.select("#exampleFormControlSelect3").selectAll("option")
  .exit()
  .data(uniqueYear.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;})

  console.log(filteredData) 
  
  // Map Pins below
  // removes all layers from map (to reset on selection change)
  myMap.eachLayer(function(layer){
    layer.remove();
  });  
  tile.addTo(myMap) // adds the tilelayer back
  myMap.setView([37.0902, -95.7129], 4) // resets the view
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < filteredData.length; i++) {
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([filteredData[i]["lat"], filteredData[i]["lng"]])
      .bindPopup("<center><h6>"+filteredData[i]["Make"]+" "+filteredData[i]["Model"]+" "+filteredData[i]["Year"]+"</center></h6><hr><h6><center> $"+d3.format(",")(filteredData[i]["craigslist_price"])+" MPG"+filteredData[i]["mpg"]+"</center></h6>"));
    }  // Add our marker cluster layer to the map      
  myMap.addLayer(markers);

  // capturing Average MPG's
  var total = 0;
  for(var i = 0; i < filteredData.length; i++) {
      total += filteredData[i]["mpg"];
  }
  // Calculating the average MPG
  var averageMpg = total / filteredData.length;
  var makeValue = d3.select("#exampleFormControlSelect1").property("value");
  var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: averageMpg,
      title: { text: `Avg. MPG<br>${makeValue} ${elementValue}`},
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];
  Plotly.newPlot('viz-three', data2, layout2);
} //end function all reactive inside

d3.select("#exampleFormControlSelect2").on("change", selectedModel);

//*****Year Function Starts *************
function selectedYear() {
  var elementValue = d3.select(this).property("value");
  //This conditional exists in case the user selects Make & Year but not Model
  var controlValue =  (d3.select("#exampleFormControlSelect2").property("value") === "Select Model") ?
    d3.select("#exampleFormControlSelect1").property("value"):
    d3.select("#exampleFormControlSelect2").property("value");

  console.log(controlValue)

  //This conditional exists in case the user selects Make & Year but not Model
  var filteredData = (d3.select("#exampleFormControlSelect2").property("value") === "Select Model") ?
    myData.filter(row => row["Make"] === controlValue):
    myData.filter(row => row["Model"] === controlValue);

  console.log(filteredData)
  var mmyData = filteredData.filter(row => row["Year"] === +elementValue);     
  console.log(mmyData)
    
  // Map Pins below
  // removes all layers from map (to reset on selection change)
  myMap.eachLayer(function(layer){
    layer.remove();
  });  
  tile.addTo(myMap) // adds the tilelayer back
  myMap.setView([37.0902, -95.7129], 4) // resets the view
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < mmyData.length; i++) {
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([mmyData[i]["lat"], mmyData[i]["lng"]])
      .bindPopup("<center><h6>"+mmyData[i]["Make"]+" "+mmyData[i]["Model"]+" "+mmyData[i]["Year"]+"</center></h6><hr><h6><center> $"+d3.format(",")(mmyData[i]["craigslist_price"])+" MPG"+mmyData[i]["mpg"]+"</center></h6>"));
    }  // Add our marker cluster layer to the map      
  myMap.addLayer(markers);

  // capturing Average MPG's
  var total = 0;
  for(var i = 0; i < mmyData.length; i++) {
      total += mmyData[i]["mpg"];
  }
  // Calculating the average MPG
  var averageMpg = total / mmyData.length;

  var makeValue = d3.select("#exampleFormControlSelect1").property("value");
  var gaugeText = (d3.select("#exampleFormControlSelect2").property("value") === "Select Model") ?
    `Avg. MPG<br>${elementValue} ${controlValue}`:
    `Avg. MPG<br>${elementValue} ${makeValue} ${controlValue}`
  var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: averageMpg,
      title: gaugeText,
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];
  Plotly.newPlot('viz-three', data2, layout2);
} //end function all reactive inside

d3.select("#exampleFormControlSelect3").on("change", selectedYear);