// // Creating map object
// var myMap = L.map("map", {
//   center: [37, -95],
//   zoom: 5
// });

// // Adding tile layer to the map
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);



d3.json("/ufosightings").then((data) => {
  console.log(data);
  
  //app.use("/static", express.static('./static/'));
});


// Store API query variables
d3.json("/ufosightings",
  function(data){
       console.log(data);
       //app.use("/static", express.static('./static/'));
   });
