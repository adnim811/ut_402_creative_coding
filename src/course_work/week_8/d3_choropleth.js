const d3 = require("d3");
// Note: Any data files (i.e. - csv, json, etc.) must be in the "public" directory
// in order to load the data locally

var w = 1000;
var h = 1000;

var projection = d3
  .geoAlbersUsa()
  .scale(1000)
  .translate([w / 2, h / 2]);

var path = d3.geoPath(projection);

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var color = d3
  .scaleLinear()
  .range(["#feebe2", "#fcc5c0", "#fa9fb5", "#f768a1", "#c51b8a", "#7a0177"]);

d3.csv("/statePopulations.csv").then((csvData) => {
  color.domain([
    0,
    d3.max(csvData, function (d) {
      return d.pop_2014;
    })
  ]);

  d3.json("/usMapData.json").then((jsonData) => {
    csvData.map((csvState) => {
      const populationState = csvState.state;
      const populationAmount = csvState.pop_2014;

      jsonData.features.map((jsonState, index) => {
        const usState = jsonState.properties.NAME;

        if (populationState === usState) {
          return (jsonData.features[index].properties.value = populationAmount);
        } else {
          return null;
        }
      });
    });

    svg
      .selectAll("path")
      .data(jsonData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", function (d) {
        var value = d.properties.value;

        if (value) {
          return color(value);
        } else {
          return "#666666";
        }
      });
  });
});