
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 600 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//import Data
d3.json("/ufosightings",
    function(data){
      var d = data.result; 

      console.log(d)

  var years = new Array();
  data.forEach(element => years.push(element['year']));
  console.log(years);

  result = years.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
  console.log(result);
  const newData = Object.keys(result).map(key => ({ year: parseInt(key), sightings: result[key]}));
  console.log(newData);


  // //    // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(newData, function (d) { return d.year; }))
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(newData, function (d) { return d.sightings; })])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  //
  // Add the line
  svg.append("path")
    .datum(newData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.sightings) })
    )

});


