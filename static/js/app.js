//Creating Layers to add to map
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

// Creating map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3,
  layers: [   
    layers.twentyTen_sightings,
    layers.twentyEleven_sightings,
    layers.twentyTwelve_sightings,
    layers.twentyThirteen_sightings,
    layers.twentyFourteen_sightings,
    layers.twentyFifteen_sightings,
    layers.twentySixteen_sightings,
    layers.twentySeventeen_sightings,
    layers.twentyEighteen_sightings,
    layers.twentyNineteen_sightings,
    layers.twentyTwenty_sightings 
  ]
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1Ijoibmlja2t5a2xhdXNuZyIsImEiOiJja3Azc2dqcXQwNnk2Mm9wY2xrcjgycmhhIn0.tsL1GPTGkzrveVwgvP5SPw",
}).addTo(myMap);

// Create an overlays object to add to the layer control
var overlays = {
  "2010 Sightings": L.marker([layers.twentyTen_sightings]),
  "2011 Sightings":  L.marker([layers.twentyEleven_sightings]),
  "2012 Sightings": L.marker([layers.twentyTwelve_sightings]),
  "2013 Sightings": L.marker([layers.twentyThirteen_sightings]),
  "2014 Sightings": L.marker([layers.twentyFourteen_sightings]),
  "2015 Sightings": L.marker([layers.twentyFifteen_sightings]),
  "2016 Sightings": L.marker([layers.twentySixteen_sightings]),
  "2017 Sightings": L.marker([layers.twentySeventeen_sightings]),
  "2018 Sightings": L.marker([layers.twentyEighteen_sightings]),
  "2019 Sightings": L.marker([layers.twentyNineteen_sightings]),
  "2020 Sightings": L.marker([layers.twentyTwenty_sightings])
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays, {
  collapsed: false
}).addTo(myMap);

// Grab the data with d3
d3.json("/ufosightings",
    function(data){  


  //console.log(data);
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  
  // Loop through data
  var d = data.result;
  console.log(d);

  for (var i = 0; i < d.length; i++) {

    //Layers match with years for years
    if (d[i].year == '2010') {
      yearLayer = "twentyTen_sightings"
    }
    else if (d[i].year == '2011') {
      yearLayer = "twentyEleven_sightings"
    }
    else if (d[i].year == '2012') {
      yearLayer = "twentyTwelve_sightings"
    }
    else if (d[i].year == '2013') {
      yearLayer = "twentyThirteen_sightings"
    }
    else if (d[i].year == '2014') {
      yearLayer = "twentyFourteen_sightings"
    }
    else if (d[i].year == '2015') {
      yearLayer = "twentyFifteen_sightings"
    }
    else if (d[i].year == '2016') {
      yearLayer = "twentySixteen_sightings"
    }
    else if (d[i].year == '2017') {
      yearLayer = "twentySeventeen_sightings"
    }
    else if (d[i].year == '2018') {
      yearLayer = "twentyEighteen_sightings"
    }
    else if (d[i].year == '2019') {
      yearLayer = "twentyNineteen_sightings"
    }
    else if (d[i].year == '2020') {
      yearLayer = "twentyTwenty_sightings"
    }
    //End Year Layers 

    // Check for location property
    if (d[i]) {
      // to overide any missing returns in lng lat
      if (d[i].city_longitude && d[i].city_latitude){
      // to fix not available lat lng fixing to Alaska  
      if (d[i].city_latitude != 'not available' & d[i].city_longitude != 'not available' & d[i].city_longitude > -60) {
        
      
      // Add a new marker to the cluster group and bind a pop-up
      // markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
      //add layers to map
      markers.addTo(layers[yearLayer]);

      //ad markers to map
      markers.addLayer(L.marker([d[i].city_longitude, d[i].city_latitude]))
        .bindPopup(`<h3> City: ${d[i].city} </h3> <hr> <h4>Date: ${d[i].text} </h4> <hr> <h6>More Info: ${d[i].report_link}</h6>`);
      }
    //     // Leaflet Icon
    //   var myIcon = L.icon({
    //   iconUrl: 'static/images/ufo.png',
    //   iconSize: [30, 25],
    // iconAnchor: [25, 16]
    //   });

    }}
    
  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers, yearLayer);

}
);

//Error
//https://stackoverflow.com/questions/32031220/leaflet-uncaught-error-invalid-latlng-object-nan-nan

