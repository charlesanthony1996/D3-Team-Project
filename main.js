import * as d3 from 'd3';
import './style.css';

async function drawChart () {
  // testing with sample data first
  // vertical bar plot with translation to the right at 90 degrees
  // const data = [
  //   {name: 'A', value: 10},
  //   {name: 'B', value: 20},
  //   {name: 'C', value: 30},
  //   {name: 'D', value: 40}
  // ];

  const margin = { top: 30, bottom: 50, left: 30, right: 30}

  const width = 560 - margin.left - margin.right
  const height = 560 - margin.top - margin.bottom

  // loading the data
  // await to wait till the file is loaded for processing
  const data = await d3.csv('./data/CO2_emission_wrangled.csv')
  const data2 = await d3.csv("./data/CO2_emission.csv")

  // countries that were selected to have in the y axis at 1990 and 2019 for comparison
  // this is the left bar plot
  // the right one will be the 2019 year version
  // should one from every region be selected?
  // region based or country based?
  const countries = ["United States", "Germany", "Austria", "India", "China", "Nigeria", "Mexico", "United Arab Emirates", "Australia", "Maldives"]

  // the color scale for the countries
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);


  // .data(filteredData)
  // not when the entire data set is needed
  // the x axis should only have the values of 1990 and 2019 for the two plots
  // remember the first left plot is at 1990
  const filteredData = data.filter(d => countries.includes(d.Country_Name) && d.Year === "1990")

  // append the svg object to the body of the page
  var svg = d3.select("#backtobackplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)


  // x axis
  const x = d3.scaleLinear()
  .domain([0, d3.max(filteredData, d => +d.CO2_emission)]).nice()
  // .domain([d3.min(filteredData, d=> +d.CO2_emission), d3.max(filteredData, d => +d.CO2_emission)]).nice()
  // mirroring the x axis along the y axis, the greater values should start at the left most point
  // and should decrease as the move towards the right
  .range([width, 0])


  // console.log(x)


  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    // .call(d3.axisBottom(x).tickFormat(d3.format(".2e")))

  // Y scale and axis
  const y = d3.scaleBand()
  // not data here but filteredData
    // .domain(data.map(d => d.Country_Name)) 
    .domain(filteredData.map(d=> d.Country_Name))
    .range([0, height])
    .padding(.1)

  // this is not needed as the y axis from the second plot is the one being shared with both plots now -> Country 
  // y axis label
  // svg.append("text")
  // // country has to be vertical so rotation is needed
  // // -90 is in the first quadrant area
  // .attr("transform", "rotate(-90)")
  // .attr("y", 0 - margin.left - 70)
  // // position of the x value -> height/2 gives you the midpoint
  // .attr("x", 0 - (height / 2))
  // // increase the spacing from the vertical y axis
  // .attr("dy", "40px")
  // .style("text-anchor", "middle")
  // .text("Country")


  // x axis label
  svg.append("text")
  .attr("transform","translate(" + (width/ 2) + " ," + (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("CO2 Emissions in Metric Tons Per Capita/ MTPC (Per Person) in 1990")

  svg.append("g")
  // moving the y axis to the right end of the plot
    .attr("transform", `translate(${width}, ${0})`)
    .call(d3.axisRight(y))

  // plotting the bars
  svg.selectAll("myRect")
  // check to see whether the data plots
    // .data(data)
    .data(filteredData)
    .enter()
    .append("rect")
    // x position is on the right end of the bar here
    .attr("x", d=> x(+d.CO2_emission))
    .attr("y", d => y(d.Country_Name))
    // where the mirroring takes place
    // this doesnt work
    // .attr("width", d => width - x(+d.CO2_emission))
    .attr("width", d=> width - x(+d.CO2_emission))
    .attr("height", y.bandwidth())
    .attr("fill", d => colorScale(d.Country_Name))

    // todo
    // increase the font of the axis and y axis, numbers are too small
    // plot the second horizontal bar plot to the right for 2019
    // some interaction to switch between the countries and the regions available
    // the y axis label is not needed from the first plot then, remove it
    // both plots share a common y axis

    // testing
  // console.log(svg)

  //  ----------------------------
  // beginning of the second back to back plot

  const margin2 = {top: 30, left: 30, right: 30, bottom: 50}
  
  const width2 = 560 - margin2.left - margin2.right

  const height2 = 560 - margin2.top - margin2.bottom

  // dataset has already been loaded at the top
  // console.log(data)

  // select the countries to plot
  const countries_2 = ["United States", "Germany", "Austria", "India", "China", "Egypt"]

  // the year on the axis for this plot should be 2019
  const filteredData2 = data.filter(d => countries.includes(d.Country_Name) && d.Year === "2019")

  // append the svg object to the div part of the html file
  var svg = d3.select("#backtobackplot2019")
  .append("svg")
  .attr("width", width2 + margin2.left + margin2.right)
  .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
  .attr("transform", `translate(${margin2.left}, ${margin2.top})`)

  // x axis setup for second plot
  const x2 = d3.scaleLinear()
  .domain([0, d3.max(filteredData2, d=> +d.CO2_emission)]).nice()
  .range([0, width2])

  console.log(x2)

  svg.append("g")
  .attr("transform", `translate(0,${height2})`)
  .call(d3.axisBottom(x2))
  // in log format? cos of the log values?
  // check whether the values less than 1 can be plotted with the big ones ranging to about 27 mtpc

  // y scale and axis
  const y2 = d3.scaleBand()
  // .domain(data.map(d=> d.Country_Name))
  .domain(filteredData2.map(d=> d.Country_Name))
  .range([0, height2])
  .padding(0.1)


  // y axis label
  // selected countries here
  // make it change for regions as well if time permits?
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin2.left - 100)
  .attr("x", 0 - (height2/2))
  .attr("dy", "40px")
  .style("text-anchor", "middle")
  .text("Country")




  // x axis label
  svg.append("text")
  .attr("transform", "translate(" + (width/2) + "," + (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("CO2 Emissions in Metric Tons Per Capita/ MTPC (Per Person) in 2019")


  svg.append("g")
  .call(d3.axisLeft(y2))

  // plotting the horizontal bars for the second plot
  svg.selectAll("myRect")
  // check to see whether its wrangled data or the unwrangled dataset
  // .data(data2)
  .data(filteredData2)
  .enter()
  .append("rect")
  .attr("x", x2(0))
  .attr("y", d=> y2(d.Country_Name))
  .attr("width", d => x2(+d.CO2_emission))
  .attr("height", y2.bandwidth())
  .attr("fill", d => colorScale(d.Country_Name))

  // todo
  // second has to be inverted from the y axis to get it into a back to back plot
  // inversion is not yet done
  // correction -> mirror the first plot along the y axis
  // values of all axes are a bit small increase them
  // single number plot with python file. get the stats working there and try to implement it here



  // single number plot begins here
  var totalCO21990 = 0
  var totalCO22019 = 0

  d3.csv("./data/CO2_emission_wrangled.csv").then(function(data) {
    data.forEach(function(d) {
      if(d.Year == "1990")
      {
        totalCO21990 += +d.CO2_emission
      }
      if(d.Year == "2019")
      {
        totalCO22019 += +d.CO2_emission
      }
    })


    var svg = d3.select("#singlenumberplot")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500)

    var circle = svg.append("circle")
    .attr("cx", 250)
    .attr("cy", 190)
    .attr("r", 100)
    .attr("stroke", "grey")
    .attr("stroke-width", 10)
    .attr("fill", "none")

    var text = svg.append("text")
    .attr("x", 250)
    .attr("y", 210)
    .attr("text-anchor", "middle")
    .style("font-size", "50px")


    var yearText = svg.append("text")
    .attr("x", 250)
    .attr("y", 260)
    .attr("text-anchor", "auto")
    .attr("font-size", "200px")


    yearText = svg.append("text")
    .attr("x", 250)
    .attr("y", 80)
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .style("font-style", "italic")
    .style("color", "black")


    var currentYear = 1990
    text.text(totalCO21990.toFixed(2))
    yearText.text(`In ${currentYear}`)

    setInterval(function() {
      if(currentYear == 1990) {
        transition(text, totalCO21990, totalCO22019)
        currentYear = 2019
      }
      else{
        transition(text, totalCO22019, totalCO21990)
        currentYear = 1990
      }
      yearText.text(`In ${currentYear}`)

    }, 5000)
  })


  function transition(textElement, startValue, endValue) {
    textElement.transition()
    .duration(3000)
    .tween("text", function() {
      var interpolator = d3.interpolateNumber(startValue, endValue)
      return function(t) {
        textElement.text(interpolator(t).toFixed(2))
      }
    })
  }
}

drawChart()