d3.json("http://127.0.0.1:5000/").then(function(car_data, err) {
  if (err) throw err;
  // parse data
  
  car_data.forEach(function(data) {
    console.log(data.Model)


  });  
});

// // Map For craig's Lis Pins
// var myMap = L.map("map", {
//   center: [37.0902, -95.7129],
//   zoom: 4
// })
<<<<<<< HEAD
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: 'mapbox/streets-v11',
//   accessToken: API_KEY
// }).addTo(myMap)

=======
d3.json("http://127.0.0.1:5000/").then(function(car_data, err) {
  if (err) throw err;
  // parse data
  console.log(car_data[0])
  allLats = car_data.map( function(d) { return d["lat"] });
  allLngs = car_data.map( function(d) { return d["lng"] });
  allPrice = car_data.map( function(d) { return d["craigslist_price"] });
  allMake = car_data.map( function(d) { return d["Make"] });
  allModel = car_data.map( function(d) { return d["Model"] });
  allYear = car_data.map( function(d) { return d["Year"] });
  allMPG = car_data.map( function(d) { return d["mpg"] });

  d3.select("#exampleFormControlSelect1").selectAll("option")
    .data(d3.map(car_data, function(d){return d["Make"];}).keys())
    .enter()
    .append("option")
    .text(function(d){return d;})
    .attr("value",function(d){return d;});
  
    d3.select("#exampleFormControlSelect2").selectAll("option")
    .data(d3.map(car_data, function(d){return d["Model"];}).keys())
    .enter()
    .append("option")
    .text(function(d){return d;})
    .attr("value",function(d){return d;});

    d3.select("#exampleFormControlSelect3").selectAll("option")
    .data(d3.map(car_data, function(d){return d["Year"];}).keys())
    .enter()
    .append("option")
    .text(function(d){return d;})
    .attr("value",function(d){return d;});

  // car_data.forEach(function(data) {
  // data.make = data[0];
  // data.healthcare = +data.healthcare;
  // data.smokes = +data.smokes;
  // data.age = +data.age;
  // data.income = +data.income;
  // data.obesity = +data.obesity;
  // data.abbr = data.abbr;
// });  
console.log(allMPG)
});  
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
//   accessToken: API_KEY
// }).addTo(myMap)

// // console.log(API_KEY)
>>>>>>> 928776de1a12746bf952b61ab3995380ca808100

// // Bar chat (thin) for Avg cost by model
// var data = [{
//   type: 'bar',
//   x: [20000, 14000, 23000, 19000, 2000],
//   y: ['Mustang', 'F150', 'Taurus', 'Escape', 'Galaxie'],
//   orientation: 'h',
//   width: .1
// }];
// var layout = {
//   autosize: true,
//   title: "Average Cost by Make",
//   xaxis: { title: "$ Avg. Cost" },
//   yaxis: { title: "Models" },
  
// };
// Plotly.newPlot('viz-two', data, layout);

// // gauge chart for MPG
// var data2 = [
//     {
//       type: "indicator",
//       mode: "gauge+number",
//       value: 16.9,
//       title: { text: "<b>MPG<br>(combined city/hway)</b>"},
//       gauge: {
//         bar: { color: "red"},  
//       }
//     }
//   ];
  
//   var layout2 = {
//     autosize: true,
//     //margin: { t: 0, b: 0  },
//   };          
<<<<<<< HEAD
// Plotly.newPlot('viz-three', data2, layout2);

// });  

function init() {
  var map = d3.select("map");
  var model_price= d3.select("viz-two")
  var mpg= d3.select("viz-three")


  d3.json("http://127.0.0.1:5000/").then(d => {
      var make = d.make;
      // Map For craig's Lis Pins
      var myMap = L.map("map", {
      center: [37.0902, -95.7129],
      zoom: 4})
      
      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: 'mapbox/streets-v11',
        accessToken: API_KEY
      }).addTo(myMap)

      L.marker([39.55, -105.78], {
        draggable: false,
        title:'Test'
      }).addTo(myMap)


  });
}
init();
=======
// Plotly.newPlot('viz-three', data2, layout2);
>>>>>>> 928776de1a12746bf952b61ab3995380ca808100
