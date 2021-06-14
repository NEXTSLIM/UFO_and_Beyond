/* renzo UFO code * */

/* UTILITY FUNCTIONS */

function rand(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

var s;

var dataset;
var countryset;
var dataURL = 'scrubbed.csv';
var worldjson = 'world-countries.json';
var key = (d) => d.key;
var parseDate = d3.time.format("%d/%m/%y").parse;

/* MAP */
function createMap(dataset, countryset) {
  var w = window.innerWidth - window.innerWidth*.25;
  var h = window.innerHeight - window.innerHeight*.25;

  var svg = d3.select("#map")
    .attr("width", w)
    .attr("height", h);

   // 2. Define a map projection
  var projection = d3.geo.mercator();
  
  // 3. Define a path generator using the projection
  var path = d3.geo.path()
    .projection(projection);

  // 5. Draw the map using SVG path elements
  var map = svg.append('g');

  //Bind data and create one path per GeoJSON feature
  map.selectAll("path")
    .data(countryset.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style('fill', 'gray');

  /* CITY DATA AS POINTS */
  map.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .style('fill', 'red')
    .style('stroke', 'purple')
    .style('opacity', '0.75')
    .attr('cx', d => projection([d.long, d.lat])[0])
    .attr('cy', d => projection([d.long, d.lat])[1])
    .attr('r', 5)
    .append('title')
      .text(d => `${d.name}: ${d.years} years`)
  
}
