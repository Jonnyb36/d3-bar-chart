// !! IMPORTANT README:

/***********
INSTRUCTIONS:
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
console.log(dataset);

const margin = {top: 30, right: 20, bottom: 30, left: 50},
    w = 500 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;

const padding = 30;

const maxValue = d3.max(dataset);

//Define the div for the chart
const svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// Set the ranges
const x = d3.scale.linear()
  //.domain([0, d3.max(dataset, (d) => d[0])])
  .range([padding, w - padding]); //time.scale
const y = d3.scale.linear().range([h - padding, padding]);

// Define the axes
const xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
//const xAxis = d3.axis.bottom(x).ticks(5);

const yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

//const yAxis = d3.axis.left(yScale);

// Define the div for the tooltip
const div = d3.select("body")
  .append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 30)
  .attr("y", (d, i) => h - d * 3)
  .attr("width", 25)
  .attr("height", (d, i) => 3 * d)
  .attr("fill","blue")
  .attr("class","bar")
  .on("mouseover", function(d) {		
              div.transition()		
                  .duration(200)		
                  .style("opacity", .9);		
              div	.html(d)	
                  .style("left", (d3.event.pageX) + "px")		
                  .style("top", (d3.event.pageY - 28) + "px");	
              })
  .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

// Add the X Axis
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

// Add the Y Axis
svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + (h - padding) + ",0)")
  .call(yAxis);