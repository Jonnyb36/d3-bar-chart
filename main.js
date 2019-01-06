
const margin = {top: 30, right: 20, bottom: 30, left: 50},
    w = 1500 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;

const padding = 30;
const barHeightFactor = 0.1;

//Define the div for the chart
const svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

//API data
const api = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
const req=new XMLHttpRequest();
req.open("GET",api,true);
req.send();
req.onload=function(){
    const json=JSON.parse(req.responseText);
    const dataset = json.data;

    const maxValue = d3.max(dataset, d => d[1]);
    const dateStart = new Date(dataset[0][0]);
    const dateEnd = new Date(dataset[dataset.length - 1][0]);

    // Set the ranges
    const x = d3.scaleTime()
        .domain([dateStart, dateEnd])
        .range([padding, w - padding]); 
    const y = d3.scaleLinear()
        .domain([0, maxValue])
        .range([h - padding, padding]);

    // Define the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    

    // Define the bar chart
    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 5) //each column placement
    .attr("y", (d, i) => h - (padding + d[1] * barHeightFactor)) //starts from top left of svg area
    .attr("width", 5) //bar width
    .attr("height", (d, i) => barHeightFactor * d[1])
    .attr("fill","blue")
    .attr("class","bar")
    .attr("data-date", (d,i) => d[0])
    .on("mouseover", function(d) {		
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9);		
                div	.html(d[0] + "<br/>" + d[1])	
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

    // Define the div for the tooltip
    const div = d3.select("body")
    .append("div")	
    .attr("class", "tooltip")
    .attr("id","tooltip")				
    .style("opacity", 0);

};


