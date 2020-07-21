// Map For craig's Lis Pins
var myMap = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 4
})
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/streets-v11',
  accessToken: API_KEY
}).addTo(myMap)

// Bar chat (thin) for Avg cost by model
var data = [{
  type: 'bar',
  x: [20000, 14000, 23000, 19000, 2000],
  y: ['Mustang', 'F150', 'Taurus', 'Escape', 'Galaxie'],
  orientation: 'h',
  width: .1
}];
var layout = {
  autosize: true,
  title: "Average Cost by Make",
  xaxis: { title: "$ Avg. Cost" },
  yaxis: { title: "Models" },
  
};
Plotly.newPlot('viz-two', data, layout);

// gauge chart for MPG
var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: 16.9,
      title: { text: "<b>MPG<br>(combined city/hway)</b>"},
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