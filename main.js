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

  const margin = { top: 30, bottom: 30, left: 30, right: 30}

  const width = 460 - margin.left - margin.right
  const height = 460 - margin.top - margin.bottom

  // loading the data
  // await to wait till the file is loaded for processing
  const data = await d3.csv('./data/CO2_emission_wrangled.csv')
  const data2 = await d3.csv("./data/CO2_emission.csv")

  // countries that were selected to have in the y axis at 1990 and 2019 for comparison
  // this is the left bar plot
  // the right one will be the 2019 year version
  // should one from every region be selected?
  // region based or country based?
  const countries = ["United States", "Germany", "Austria", "India", "China", "Egypt"]

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
  .range([0, width])


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


  // y axis label
  svg.append("text")
  // country has to be vertical so rotation is needed
  // -90 is in the first quadrant area
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left - 70)
  // position of the x value -> height/2 gives you the midpoint
  .attr("x", 0 - (height / 2))
  // increase the spacing from the vertical y axis
  .attr("dy", "40px")
  .style("text-anchor", "middle")
  .text("Country")


  // x axis label
  svg.append("text")
  .attr("transform","translate(" + (width/ 2) + " ," + (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("CO2 Emissions in Metric Tons Per Capita/ MTPC (Per Person) in 1990")

  svg.append("g")
    .call(d3.axisLeft(y))

  // plotting the bars
  svg.selectAll("myRect")
  // check to see whether the data plots
    // .data(data)
    .data(filteredData)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", d => y(d.Country_Name))
    .attr("width", d => x(+d.CO2_emission))
    .attr("height", y.bandwidth())
    .attr("fill", "grey")

    // todo
    // increase the font of the axis and y axis, numbers are too small
    // plot the second horizontal bar plot to the right for 2019
    // some interaction to switch between the countries and the regions available

    // testing
  // console.log(svg)

  //  ----------------------------
  // beginning of the second back to back plot

  const margin2 = {top: 30, left: 30, right: 30, bottom: 30}
  
  const width2 = 460 - margin2.left - margin2.right

  const height2 = 460 - margin2.top - margin2.bottom

  // dataset has already been loaded at the top
  // console.log(data)

  // select the countries to plot
  const countries_2 = ["United States", "Germany", "Austria", "India", "China", "Egypt"]

  // the year on the axis for this plot should be 2019
  const filteredData2 = data.filter(d => countries_2.includes(d.Country_Name) && d.Year === "2019")

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
  .attr("transform", `translate(0,${height2}`)
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
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin2.left - 70)
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
  .attr("fill", "grey")

  // todo
  // second has to be inverted from the y axis to get it into a back to back plot

}

drawChart()