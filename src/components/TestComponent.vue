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
  