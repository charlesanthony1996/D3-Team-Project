<template>
    <div>
      <svg id="d3-svg"></svg>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3";
  
  export default {
    name: "D3Component",
    mounted() {
        // simple mounting to the dom area
      this.drawChart();
    },
    methods: {
        // main function to plot the chart
        // is vuetify added?
      drawChart() {
        const svg = d3.select("#d3-svg"),
          margin = { top: 20, right: 20, bottom: 30, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
  
        svg.attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        const data = [1, 2, 3, 4, 5];
  
        const xScale = d3.scaleLinear()
          .domain([0, d3.max(data)])
          .range([0, width]);
  
        svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d, i) => i * 60)
          .attr("y", d => height - xScale(d))
          .attr("width", 50)
          .attr("height", d => xScale(d))
          .attr("fill", "steelblue");
      },
    },
  };
  </script>
  
  <style scoped>
  #d3-svg {
    width: 100%;
    height: 500px;
  }
  </style>
  