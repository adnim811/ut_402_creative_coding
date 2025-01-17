// Build bar graph
// A scatter plot or line graph might be more appropriate
// 

const d3 = require('d3');

// // Viz margins and dimensions
var margin = { top: 20, right: 20, bottom: 30, left: 80 };
var width = 1500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// // Build SVG "canvas"
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g") // g is an SVG-specific element used to group other SVG elements
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Build X-Axis upper and lower bounds/ranges of values
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.5);

// Build Y-Axis upper and lower bounds/ranges of values
var y = d3.scaleLinear()
          .range([height, 0]);

// Import data from CSV
d3.json("yearlyCO2Measurements.json").then(function(data) {
  data.co2Yearly.forEach(function(d) {
    d.measurement = +d.measurement;
  });

  // Scale the range of the data in the domains
  x.domain(data.co2Yearly.map(function(d) { return d.year; }));
  
  // Instead of starting the y-axis at 0,
  // we start it at the minimum y-value in the dataset
  // so that the trends in the dataset are more apparent
  y.domain([d3.min(data?.co2Yearly, function(d) { return d.measurement }), d3.max(data?.co2Yearly, function(d) { return d.measurement })]);

  svg.selectAll(".bar")
    .data(data?.co2Yearly)
    .enter()
    .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year) })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.measurement); })
      .attr("height", function(d) { return height - y(d.measurement); })

  // Add x-axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  // Add y-axis
  svg.append("g")
   .call(d3.axisLeft(y));

  // Add title to graph
  svg.append("text")
   .attr("x", (width / 2))             
   .attr("y", 0 - (margin.top / 5))
   .attr("text-anchor", "middle")
   .attr("id", "title")
   .text("Atmospheric CO2 (1980-2021)");
});
