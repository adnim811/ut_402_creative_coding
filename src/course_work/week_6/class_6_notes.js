const d3 = require('d3');

// // Viz margins and dimensions
var margin = { top: 20, right: 20, bottom: 30, left: 80 };
var width = 960 - margin.left - margin.right;
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
d3.csv("statePopulations.csv").then(function(data) {
  // rank states by population
  // this creates a shallow "copy" of our original "data" array
  const rankedPopulations = data.sort((a,b) => b.pop_2014 - a.pop_2014);
  data.forEach(function(d) {
    rankedPopulations.forEach(function(ranked, index) {
      if(d.code === ranked.code){
        d.ranking = index + 1
      }
    })
    d.pop_2014 = +d.pop_2014;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.code; }));
  y.domain([0, d3.max(data, function(d) { return d.pop_2014; })]);

  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.code) })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.pop_2014); })
      .attr("height", function(d) { return height - y(d.pop_2014); })
    .append('title')
      .text(function(d) {
        return `Population of ${d.state}: ${d.pop_2014.toLocaleString()}`
      })
    .append('title')
      .text(function(d) {
        return ` - Ranking: #${d.ranking}`
      });
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
   .text("U.S. Populations By State (2014)");
});
