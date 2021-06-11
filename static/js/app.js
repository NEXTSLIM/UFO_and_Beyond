var layers = {
  twentyTen_sightings: new L.LayerGroup(),
  twentyEleven_sightings: new L.LayerGroup(),
  twentyTwelve_sightings: new L.LayerGroup(),
  twentyThirteen_sightings: new L.LayerGroup(),
  twentyFourteen_sightings: new L.LayerGroup(),
  twentyFifteen_sightings: new L.LayerGroup(),
  twentySixteen_sightings: new L.LayerGroup(),
  twentySeventeen_sightings: new L.LayerGroup(),
  twentyEighteen_sightings: new L.LayerGroup(),
  twentyNineteen_sightings: new L.LayerGroup(),
  twentyTwenty_sightings: new L.LayerGroup(),
};
//Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 2,
  layers: [
    // layers.twentyTen_sightings,
    // layers.twentyEleven_sightings,
    // layers.twentyTwelve_sightings,
    // layers.twentyThirteen_sightings,
    // layers.twentyFourteen_sightings,
    // layers.twentyFifteen_sightings,
    // layers.twentySixteen_sightings,
    // layers.twentySeventeen_sightings,
    // layers.twentyEighteen_sightings,
    // layers.twentyNineteen_sightings,
    layers.twentyTwenty_sightings 
  ]
});
// Create the tile layer that will be the background of our map
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY

}).addTo(myMap);

// var baseMaps = {
//   "Light Map" : lightMap
// };

// Create an overlays object to add to the layer control
var overlays = {
  "2010 Sightings": layers.twentyTen_sightings,
  "2011 Sightings": layers.twentyEleven_sightings,
  "2012 Sightings": layers.twentyTwelve_sightings,
  "2013 Sightings": layers.twentyThirteen_sightings,
  "2014 Sightings": layers.twentyFourteen_sightings,
  "2015 Sightings": layers.twentyFifteen_sightings,
  "2016 Sightings": layers.twentySixteen_sightings,
  "2017 Sightings": layers.twentySeventeen_sightings,
  "2018 Sightings": layers.twentyEighteen_sightings,
  "2019 Sightings": layers.twentyNineteen_sightings,
  "2020 Sightings": layers.twentyTwenty_sightings
};


// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays, {
  collapsed: false
}).addTo(myMap);

// Initialize an object containing icons for each layer group
// var icons = {
//   twentyTen_sightings: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   }),
//   twentyEleven_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "red",
//     shape: "circle"
//   }),
//   twentyTwelve_sightings: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor: "white",
//     markerColor: "blue-dark",
//     shape: "penta"
//   }),
//   twentyThirteen_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "orange",
//     shape: "circle"
//   }),
//   twentyFourteen_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   }),
//   twentyFifteen_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   }),
//   twentySixteen_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   }),
//   twentySeventeen_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   }),
//   twentyEighteen_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   }),
//   twentyNineteen_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   }),
//   twentyTwenty_sightings: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   }),
// };

// read in data and console.log
//d3.json("/ufosightings").then((data) => {
  //console.log(data.length);
    //app.use("/static", express.static('./static/'));
d3.json("/ufosightings",
    function(data){  





// for loop
//var dict = []
//console.log(data.result)
var d = data.result;

for (var i = 0; i < d.length; i++) {
  var sightings = d[i];
  //console.log(sample);
  //   var d = data[i];
  //console.log(d)
    //  dict.push({
    //   dates: d['date'].slice(d['date'].length - 4),
    //   lat: d['city_latitude'],
    //   lon: d['city_longitude']
    // })
    // for (var e=0; e < dict.length; e++) {
      if (sightings.year == '2010') {
        yearLayer = "twentyTen_sightings"
      }
      else if (sightings.year == '2011') {
        yearLayer = "twentyEleven_sightings"
      }
      else if (sightings.year == '2012') {
        yearLayer = "twentyTwelve_sightings"
      }
      else if (sightings.year == '2013') {
        yearLayer = "twentyThirteen_sightings"
      }
      else if (sightings.year == '2014') {
        yearLayer = "twentyFourteen_sightings"
      }
      else if (sightings.year == '2015') {
        yearLayer = "twentyFifteen_sightings"
      }
      else if (sightings.year == '2016') {
        yearLayer = "twentySixteen_sightings"
      }
      else if (sightings.year == '2017') {
        yearLayer = "twentySeventeen_sightings"
      }
      else if (sightings.year == '2018') {
        yearLayer = "twentyEighteen_sightings"
      }
      else if (sightings.year == '2019') {
        yearLayer = "twentyNineteen_sightings"
      }
      else if (sightings.year == '2020') {
        yearLayer = "twentyTwenty_sightings"
      }
      //console.log(sightings.city_latitude)
      if (sightings.city_latitude != 'not available' & sightings.city_longitude != 'not available' & sightings.city_longitude > -60) {
        var newMarker = L.marker(
      [
          parseFloat(sightings.city_longitude),
          parseFloat(sightings.city_latitude)
      ])
        
               
        
        
          
 //newMarker.bindPopup("<h1>" + sightings.city + "</h1> <hr> <h3>Type of Shape:" + sightings.shape + "</h3>")
          newMarker.addTo(layers[yearLayer]);
          newMarker.bindPopup(`<h3> City: ${sightings.city} </h3> <hr> <h4>Date: ${sightings.date} </h4> <hr> <h6>More Info: ${sightings.report_link}</h6>`)    
}
        // else if (newMarker._latlng.lat < -60) {
          
        //    var others = L.marker(
        //     [
        //         parseFloat(newMarker._latlng.lng),
        //         parseFloat(newMarker._latlng.lat)
        //     ])
        //     others.addTo(layers[yearLayer]);
        //     others.bindPopup(`<h3> City: ${sightings.city} </h3> <hr> <h4>Date: ${sightings.date} </h4> <hr> <h5>City: ${sightings.city}</h5> <hr> <h6>More Info: ${sightings.report_link}</h6>`)
       // } 
}
  }
)
//if(sightings.city_longitude <= -60) {continue}



