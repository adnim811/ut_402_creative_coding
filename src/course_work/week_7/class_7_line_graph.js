const d3 = require('d3');

// Set dimensions and margins for the chart
const margin = { top: 70, right: 30, bottom: 40, left: 100 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Like we do with all visualizations,
// create the SVG element and append it to the document "body" element
const svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Set up the x and y scales
const x = d3.scaleTime() // notice that we are using scaleTime here
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);

// load the JSON dataset using "d3.json" (similar to d3.csv)
d3.json("yearlyCO2Measurements.json").then(function(data) { 
  const parseDate = d3.timeParse("%Y");
  data.co2Yearly.forEach(function(d) {
    d.year = parseDate(d.year);
    d.measurement = +d.measurement;
  });
  
  // Define the x and y domains
  x.domain(d3.extent(data.co2Yearly, d => d.year));

  // change min value
  y.domain([325, d3.max(data.co2Yearly, d => d.measurement)]);
  
  // Add the x-axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .style("font-size", "16px")
    .call(d3.axisBottom(x)
      .ticks(d3.timeYear.every(5)) 
      .tickFormat(d3.timeFormat("%Y"))
    ); 

  // Add the y-axis
  svg.append("g")
    .style("font-size", "14px")
    .call(d3.axisLeft(y)
      .ticks(7)
      .tickFormat(d => {
        return `${d}ppm`
      })
    )
    
  // Create the line generator
  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.measurement));
  
  // Add the line path to the SVG element
  svg.append("path")
    .datum(data?.co2Yearly)
    .attr("fill", "none")
    .attr("stroke", "rgb(255, 137, 47)")
    .attr("stroke-width", 2)
    .attr("d", line);
  
    //Add vertical gridlines
  svg.selectAll("xGrid")
    .data(x.ticks().slice(1))
    .join("line")
    .attr("x1", d => x(d))
    .attr("x2", d => x(d))
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "#e0e0e0")
    .attr("stroke-width", .5);
   
  //Add horizontal gridlines
  svg.selectAll("yGrid")
    .data(y.ticks().slice(1))
    .join("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => y(d))
    .attr("y2", d => y(d))
    .attr("stroke", "#e0e0e0")
    .attr("stroke-width", .5)

  // Add title to graph
  svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 5))
    .attr("text-anchor", "middle")
    .attr("id", "title")
    .text("Atmospheric CO2 (1980-2021)");
  
  // Add y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "blue")
    .style("font-family", "sans-serif")
    .text("Total CO₂ (in ppm)");

  // Credit the data source
  svg.append("text")
    .attr("class", "source-credit")
    .attr("x", width - 1125)
    .attr("y", height + margin.bottom - 3)
    .style("font-size", "12px")
    .style("font-family", "sans-serif")
    .text("Source: National Oceanic and Atmospheric Administration + Earth API");
});
