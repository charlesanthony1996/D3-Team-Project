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
        // two charts in 1990 and 2019
        // y axis -> selected countries
        //  x axis -> emissions in 1990 or 2019
        drawChart() {
            // margins , width and height -> boxing it in
            const svg = d3.select("#plot")
            const margin = { top: 30, left: 80, right: 30, bottom: 30}
            const width = 560 - margin.left - margin.right
            const height = 560 - margin.top - margin.bottom


            // append the svg to the div
            const g = svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

            // console.log("width: ", width)
            // console.log("height: ", height)


            // go through the data here
            d3.csv("../../CO2_emission.csv")
            .then(function(data) {

                // data.forEach(function(d)
                // {
                //     d.year = +d.year;
                //     d.value = +d.value;
                // })
                // console.log(data)

                // parsing the data here
                const parsedData = data.reduce((acc, row) => {
                    for(let year = 1990; year <= 2019; year++)
                    {
                        acc.push({
                            year: year,
                            Country: row["Country Name"],
                            value: +row[year.toString()]
                        })
                    }
                    return acc
                }, [])


                // add x axis
                // x axis should scale Time here
                // var x = d3.scaleTime()
                // .domain([new Date(1990, 0, 1), new Date(2019, 0, 1)])
                // .range([0, width])

                // back to back? will it be horizonatal?
                var x = d3.scaleLinear()
                .domain([1990, 2019])
                .range([0, width])

                
                g.append("g") 
                .attr("transform", "translate(0," + height +  ")")
                .call(d3.axisBottom(x))


                // .selectAll(text)
                // .attr("transform", "translate(-10, 0)rotate(-45)")
                // .style("text-anchor", "end")

                // console.log(x)

                // y axis
                var y = d3.scaleBand()
                .range([0, height])
                .domain(parsedData.map(function(d)
                {
                    return d.Country;
                }
                ))
                .padding(.1)

                g.append("g")
                .call(d3.axisLeft(y))

                // console.log(y)



                // bars
                g.selectAll(".bar")
                .data(parsedData)
                .enter()
                .append("rect")
                .attr("class", "bar")
                // x column
                .attr("x", d => x(d.year))
                // y column from the csv file
                .attr("y", function(d) {
                    return y(d.Country)
                })
                .attr("width", width/ parsedData.length)
                .attr("height", y.bandwidth())
                .attr("fill", "#69b3a2")
                // there should be 




            })
            .catch(function(error) {
                console.log(error)
            })


        }
    }
}





</script>


<style scoped>

</style>