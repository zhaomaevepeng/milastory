// accident trends d3
var data = [
    {
      "year": 2004,
      "accidents": 230
    },
    {
      "year": 2005,
      "accidents": 276
    },
    {
      "year": 2006,
      "accidents": 354
    },
    {
      "year": 2007,
      "accidents": 350
    },
    {
      "year": 2008,
      "accidents": 352
    },
    {
      "year": 2009,
      "accidents": 366
    },
    {"year": 2010,
      "accidents": 357
    },
    {
      "year": 2011,
      "accidents": 357
    },
    {
      "year": 2012,
      "accidents": 367
    },
    {
      "year": 2013,
      "accidents": 398
    },
    {
      "year": 2014,
      "accidents": 425
    },
    {
      "year": 2015,
      "accidents": 467
    },
    {
      "year": 2016,
      "accidents": 408
    },
    {
      "year": 2017,
      "accidents": 364
    },
    {
      "year": 2018,
      "accidents": 398
    },
    {
      "year": 2019,
      "accidents": 389
    },
  ];
  
  // Create SVG and padding for the chart
  
  const svg = d3
    .select("#totalaccident")
    .append("svg")
    .attr("height", 300)
    .attr("width", 600);
  const margin = { top: 0, bottom: 20, left: 30, right: 20 };
  const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;
  const grp = chart
    .append("g")
    .attr("transform", `translate(-${margin.left},-${margin.top})`);
  
  // Create scales
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, dataPoint => dataPoint.accidents)]);
  const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data, dataPoint => dataPoint.year));
  
  const line = d3
    .line()
    .x(dataPoint => xScale(dataPoint.year))
    .y(dataPoint => yScale(dataPoint.accidents));
  
  // Add path
  const path = grp
    .append("path")
    .attr("transform", `translate(${margin.left},0)`)
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 3)
    .attr("d", line);
  
  const pathLength = path.node().getTotalLength();
  // D3 provides lots of transition options, have a play around here:
  // https://github.com/d3/d3-transition
  const transitionPath = d3
    .transition()
    .ease(d3.easeSin)
    .duration(2500);
  
  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .attr("stroke-dashoffset", 0);
  
  // Add the X Axis
  chart
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(data.length));
  // Add the Y Axis
  chart
    .append("g")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));