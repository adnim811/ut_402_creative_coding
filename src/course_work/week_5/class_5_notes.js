const d3 = require("d3");

// Drawing a rectangle SVG

// d3.select("body")
//   .append("svg")
//   .append("rect")
//   .attr("width", 200)
//   .attr("height", 100)
//   .style("fill", "green");

// d3.select('body')
//   .append('svg')
//   .append('rect')
//   .attr("width", 200)
//   .attr("height", 100)
//   .style("fill", "green")

// Drawing a circle SVG
// d3.select("body")
//   .append("svg")
//     .attr("height", 100)
//     .attr("width", 100)
//   .append("circle")
//     .attr("cx", 50)
//     .attr("cy", 50)
//     .attr("r", 50)
//     .style("fill", "green");

// d3.select("body")
//   .append("svg")
//     .attr("height", 100)
//     .attr("wdith", 100)
//   .append("circle")
//     .attr("cx", 50)
//     .attr("cy", 50)
//     .attr("r", 50)
//     .style("fill", "red")

// Text SVG
// d3.select("body")
//   .append("svg")
//   .attr("width", 250)
//   .attr("height", 50)
//   .append("text")
//   .text("Hello World")
//   .attr("y", 50)
//   .attr("x", 0);

// d3.select("body")
//   .append("svg")
//     .attr("width", 250)
//     .attr("height", 50)
//   .append("text")
//     .text("Hello World")
//     .attr("y", 50)
//     .attr("x", 0)
//     .style("font-size", "40px")
//     .style("font-weight", 600)
//     .style("stroke", "green")

// What element are we selecting?
// What are we appending to that element?
// How are we styling the appended element?

var w = 1000;
var h = 500;
var barPadding = 5;
// var dataset = [2, 52, 34, 14, 27];
var dataset = [5, 10, 15, 20, 30]
// var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// Drawing the bars of our graph
svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * (w / dataset.length)
  })
  .attr("y", function(d, i) {
    return h - d * 10
  })
  .attr("width", w / dataset.length - barPadding)
  .attr("height", function (d) {
    return d * 10
  })
  .attr("fill", function (d) {
    // return "rgb(66," + d * 10 + ", 0)"; // rgb("50, 0, 0")
    if( d >= 0 && d <= 10) {
      return "green"
    } else if (d > 10 && d <= 20) {
      return "blue"
    } else {
      return "purple"
    }
  })
  .style("margin-top", 8)

// // Build the bars
// svg
//   .selectAll("rect")
//   .data(dataset)
//   .enter()
//   .append("rect")
//   .attr("x", function (d, i) {
//     // "d" here refers to each element in the "dataset" (i.e. "5", "10", "15", etc.);
//     return i * (w / dataset.length);
//   })
//   .attr("y", function (d) {
//     return h - d * 10;
//   })
//   .attr("width", w) //w / dataset.length - barPadding)
//   .attr("height", function (d) {
//     return d * 10;
//   })
//   .attr("fill", function (d) {
//     // rgb modes based on data
//     return "rgb(" + d * 10 + ", 0, 0)";
//   //   if (d >= 0 && d < 10) {
//   //     return "green"
//   //   } else if (d >= 10 && d < 20) {
//   //     return "blue"
//   //   } else {
//   //     return "red"
//   //   }
//   });

// Add a label to each column
svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) {
    return d
  })
  .attr("text-anchor", "middle")
  .style("font-size", 50)
  .attr("x", function(datum, index) {
    // console.log('d -->', d);
    // [5, 10, 15, 20, 30].map(d, i) => {

    // }
    // 3 * (1000 / 5) + (1000 / 5 - 5) / 2
    // 3 * (200) + (195) / 2
    // 600 + 97.5
    // 697.5

    return index * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
  })
  .attr("y", function(d) {
    // [5, 10, 15, 20, 30]
    // 500 - 20 * 10
    // 500 - 200 - 5
    // 295
    return h - d * 10 - 5
  })

// // Add a label to each column
// svg
//   .selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text(function (d) {
//     return d;
//   })
//   .attr("text-anchor", "middle")
//   .style("font-size", "34px")
//   .attr("x", function (d, i) {
//     return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
//   })
//   .attr("y", function (d) {
//     return h - d * 10;
//   });