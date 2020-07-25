
// d3.json("http://127.0.0.1:5000/").then(function(car_data, err) {
//   if (err) throw err;


  // // parse data
  // allLats = car_data.map( function(d) { return d["lat"] });
  // allLngs = car_data.map( function(d) { return d["lng"] });
  // allPrice = car_data.map( function(d) { return d["craigslist_price"] });
  // allMake = car_data.map( function(d) { return d["Make"] });
  // allModel = car_data.map( function(d) { return d["Model"] });
  // allYear = car_data.map( function(d) { return d["Year"] });
  // allMPG = car_data.map( function(d) { return d["mpg"] });

var filters = {};

function updateFilters() {
  var changedElement = d3.select(this).select("option");
  var elementValue = changedElement.property("value");
  var filterId = changedElement.attr("id");

  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  filterData();
}

function filterData() {
  let filteredData = myData;

  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  return filteredData;
}



var data = filterData();

console.log(data);

d3.select("#exampleFormControlSelect1").on("change", updateFilters);

  uniqueMake = d3.map(myData, function(d){return d["Make"];}).keys();

  d3.select("#exampleFormControlSelect1").selectAll("option")
    .data(uniqueMake.map(d => d))
    .enter()
    .append("option")
    .text(function(d){return d;})
    .attr("value",function(d){return d;});
  
    // d3.select("#exampleFormControlSelect2").selectAll("option")
    // .data(d3.map(car_data, function(d){return d["Model"];}).keys())
    // .enter()
    // .append("option")
    // .text(function(d){return d;})
    // .attr("value",function(d){return d;});

    // d3.select("#exampleFormControlSelect3").selectAll("option")
    // .data(d3.map(car_data, function(d){return d["Year"];}).keys())
    // .enter()
    // .append("option")
    // .text(function(d){return d;})
    // .attr("value",function(d){return d;});
// });  
// });

// console.log(uniqueMake)

// console.log(myData[0]);

// TODO:
// 1) Populate dropdowns and charts.
// 2) Create a function that will filter data via event listener, returns the filtered data repopulate the dropdowns, based off filer data. 



//function filterData()

//console.log(data.make)
// // Map For craig's Lis Pins
// var myMap = L.map("map", {
//   center: [37.0902, -95.7129],
//   zoom: 4
// })
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: 'mapbox/streets-v11',
// //   accessToken: API_KEY
// // }).addTo(myMap)

// // // console.log(API_KEY)

// // // Bar chat (thin) for Avg cost by model
// // var data = [{
// //   type: 'bar',
// //   x: [20000, 14000, 23000, 19000, 2000],
// //   y: ['Mustang', 'F150', 'Taurus', 'Escape', 'Galaxie'],
// //   orientation: 'h',
// //   width: .1
// // }];
// // var layout = {
// //   autosize: true,
// //   title: "Average Cost by Make",
// //   xaxis: { title: "$ Avg. Cost" },
// //   yaxis: { title: "Models" },
  
// // };
// // Plotly.newPlot('viz-two', data, layout);

// // // gauge chart for MPG
// // var data2 = [
// //     {
// //       type: "indicator",
// //       mode: "gauge+number",
// //       value: 16.9,
// //       title: { text: "<b>MPG<br>(combined city/hway)</b>"},
// //       gauge: {
// //         bar: { color: "red"},  
// //       }
// //     }
// //   ];
  
// //   var layout2 = {
// //     autosize: true,
// //     //margin: { t: 0, b: 0  },
// //   };     

// // Plotly.newPlot('viz-three', data2, layout2);


// function init() {
//   var map = d3.select("map");
//   var model_price= d3.select("viz-two")
//   var mpg= d3.select("viz-three")

//   d3.json("http://127.0.0.1:5000/").then(d => {

//   // Map For craig's Lis Pins
//   var myMap = L.map("map", {
//     center: [37.0902, -95.7129],
//     zoom: 4})
    
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: 'mapbox/streets-v11',
//     accessToken: API_KEY
//     }).addTo(myMap)

//     // L.marker([39.55, -105.78], {
//     //   draggable: true,
//     //   title:'Test'}).addTo(myMap)
  

//     // Adding Markers to the map
//     allLats = d.map( function(d) { return d.lat});
//     allLngs = d.map( function(d) { return d.lng });
    
//     displayedLats= allLats.slice(10)
//     displayedLngs= allLngs.slice(10)
    
//     geo_location= displayedLats.map( function(e,i) {
//       return [e,displayedLngs[i]]
//     });


//   // displayedLats.forEach(Lats => { 
//   //   var test= 0,
//   //   console.log(test),
//   //   test+= 1})
// });
// }
// init();

    

  // L.marker([39.55,-105.78], {
  //   draggable: false,
  //   title:'Test'
  // }).addTo(myMap)


