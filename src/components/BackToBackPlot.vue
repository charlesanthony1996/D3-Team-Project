<template>
    <h1>Back to back plot</h1>
    <div>
    <svg id="plot"></svg>
    </div>
</template>


<script>
import * as d3 from "d3"

export default{
    name: "BackToBackPlot",
    mounted() {
        this.drawChart()

    },

    methods: {
        drawChart() {
            // margins , width and height -> boxing it in
            const svg = d3.select("#plot")
            const margin = { top: 10, left: 10, right: 10, bottom: 10}
            const width = 560 - margin.left - margin.right
            const height = 560 - margin.top - margin.bottom


            // append the svg to the div
            svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

            console.log("width: ", width)
            console.log("height: ", height)

            console.log(svg)
            // console.log("hello")

            // go through the data here
            d3.csv("../../CO2_emission.csv")
            .then(function(data) {
                // console.log(data)


                // add x axis
                var xaxis = d3.scaleLinear()
                .domain([1990, 2019])
                .range([0 , width])
                svg.append("g")
                




            })
            .catch(function(error) {
                // console.log(error)
            })


        }
    }
}





</script>


<style scoped>


</style>