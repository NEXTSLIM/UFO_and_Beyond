 //BLESSINGS
//https://stackoverflow.com/questions/30427623/data-is-undefined-after-importing-from-a-csv-file-with-d3

var pointsdata;
//let dataURL = 'scrubbed.csv';
var svg, map;
var inputValue = null;
var year = [];

function makeMap(geo_data) {

    //fill year array
    for(let i=1949; i<2014; i++){
        year.push(i);
    }

    //capitalize first letter of each word
    //https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-50.php
    function capital_letter(str) {
        str = str.split(" ");

        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }

        return str.join(" ");
    }

    var w = document.querySelector('#map').style.width;
    var h = document.querySelector('#map').style.height;
    
    var tooltip = d3.select("body").append("div") 
        .attr("class", "tooltip")       
        .style("opacity", 0);

    ////////////////////////////////////////////// MAP
    svg = d3.select("map")
        .attr("width", w)
        .attr("height", h)
        .style('border', '1px black solid')
        // https://stackoverflow.com/questions/34700903/d3-zoom-not-working-as-in-example
        .call(d3.behavior.zoom().on("zoom", function () {
            svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
          }))
        .append("g");

    // 2. Define a map projection
    var projection = d3.geo.mercator();

    //let projectionDefaultScale = projection.scale();

    // 3. Define a path generator using the projection
    let path = d3.geo.path()
        .projection(projection);

    // 5. Draw the map using SVG path elements
    map = svg.append('g');

    //Bind data and create one path per GeoJSON feature
    map.selectAll("path")
        .data(geo_data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style('fill', 'aliceblue')
        .style('stroke', 'lightblue');

    //////////////////////////////////////////////////// CSV Parsing
    d3.csv("ufo-refined-1.csv", function(data) {
        return {
            year: parseInt(data.datetime.substring(6)),
            city: data.city,
            state: data.state.toUpperCase(),
            country: data.country.toUpperCase(),
            shape: data.shape,
            lat: parseFloat(data.latitude),
            long: parseFloat(data.longitude),
            comments: data.comments
        };
    },createPoints);

    //////////////////////////////////////////////////// SLIDER
    // when the input range changes update the value 
    d3.select("#timeslide").on("input", function() {
        update(+this.value);
        //console.log(this.value);
    });

    // update the fill of each SVG of class "incident" with value
    function update(value) {
        document.getElementById("range").innerHTML=year[value];
        inputValue = year[value];
        d3.selectAll(".siting")
            .attr("fill", dateMatch)
            .attr("opacity", dateMatchOp)
            .attr("r", dateMatchR);;
    }

    function dateMatch(d) {
        var y = d.year;
        //console.log(inputValue == y);
        if (inputValue == y) {
            //console.log('there was a match');
            this.parentElement.appendChild(this);
            return "darkviolet";
        } else {
            return "mediumturquoise";
        };
    }

    function dateMatchOp(d) {
        var y = d.year;
        if (inputValue == y) {
            //console.log('there was a match in opacity');
            this.parentElement.appendChild(this);
            return ".9";
        } else {
            return "0.2";
        };
    }

    function dateMatchR(d) {
        var y = d.year;
        if (inputValue == y) {
            //console.log('there was a match in opacity');
            this.parentElement.appendChild(this);
            return "2";
        } else {
            return "0.75";
        };
    }

    //Overrides everything so not using
    function initialDate(d){
        var y = d.year;
        if (y == "1949") {
            this.parentElement.appendChild(this);
            return "red";
        } else {
            return "peru";
        };
    }

    //////////////////////////////////////////////////// Create Points
    function createPoints(pointsdata) {
       //console.log(pointsdata);

        var points = svg.append('g');

       map.selectAll("circle")
        .data(pointsdata)
        .enter()
        .append("circle")
        //.style('fill', initialDate)
        .style('opacity', '0.5')
        .attr('cx', d => projection([d.long, d.lat])[0])
        .attr('cy', d => projection([d.long, d.lat])[1])
        .attr('r', .75)
        .attr('class', 'siting')
        .on('mouseover', function(d) {
            d3.select('#currentInfo').text(d.comments);
            d3.select('#currentInfoLoc').text('WHERE: ' + capital_letter(d.city));
            d3.select(this).attr("class","siting hover")
                .attr('r', 3)
                .style('opacity', '0.75');
            tooltip.transition()    
                .duration(200)    
                .style("opacity", .9)
            tooltip.html(capital_letter(d.city) + ', ' + d.state + ', ' + d.country)  
                .style("left", (d3.event.pageX -40) + "px")   
                .style("top", (d3.event.pageY - 45) + "px");  ;
        })
        .on("mouseout", function(d){
            //d3.select('#currentInfo').text("Please hover over a point");
            d3.select(this).attr("class","siting")
                .attr('r', .75)
                .style('opacity', '0.5');
            tooltip.transition()    
                .duration(200)    
                .style("opacity", 0);
        });

        //make small multiple
        //not working
        createpoints(pointsdata);
    }//end of create points
    
}