d3.json("/ufosightings",
function(data){
  //console.log(data)})
  var d = data.result;
    //console.log(Ufo_data)
    var shapes = []
    // var dict = []
    for (var i = 0; i < d.length; i++) {
      //Arron to overide any missing in shape
      if (d[i].shape){
        var v = d[i]
        shapes.push(v.shape)
    }}
      console.log(shapes)
    var data_temp = {};
    for (var i=0; i <  shapes.length; i++) {
      data_temp[shapes[i]] = (data_temp[shapes[i]] || 0) +1 ;
    }
  


   sortable = [];
  for (var shape in data_temp) {
    sortable.push([shape, data_temp[shape]]);
  }
  console.log(sortable)


  sortable.sort(function(a, b) {
      return a[1] - b[1];
  });

  var n = 10;
  sortable = sortable.slice(sortable.length - n,sortable.length)
  console.log(sortable)

  var data = {}
  sortable.forEach(function(item){
      data[item[0]]=item[1]
  })
  console.log(data)

     for (key in data) {
       if (data.hasOwnProperty(key)) {
         var value = data[key];
         if (value < 40) {
           delete data[key]
         }
       }
     }

    //console.log(data)
    var keys = []
    for (var key in data) {
         if (data.hasOwnProperty(key)) {
             keys.push(key)
         }
    }

    //console.log(Object.keys(data).length)
    console.log(keys.length)
    console.log(Object.keys(data).length)

var width = 700
    height = 700
    margin = 100

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
// var data = {a: 9, b: 20, c:30, d:8, e:12, f:3, g:7, h:14}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(keys)
  .range(d3.schemeDark2);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .sort(null) // Do not sort group by size
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// The arc generator
var arc = d3.arc()
  .innerRadius(radius * 0.5)         // This is the size of the donut hole
  .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('allSlices')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

// Add the polylines between chart and labels:
svg
  .selectAll('allPolylines')
  .data(data_ready)
  .enter()
  .append('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      var posA = arc.centroid(d) // line insertion in the slice
      var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
      var posC = outerArc.centroid(d); // Label position = almost the same as posB
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })

// Add the polylines between chart and labels:
svg
  .selectAll('allLabels')
  .data(data_ready)
  .enter()
  .append('text')
    .text( function(d) { return d.data.key } )
    .attr('transform', function(d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
})

