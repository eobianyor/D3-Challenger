// @TODO: YOUR CODE HERE!
// Set up chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from the donuts.csv file
// =================================
d3.csv("../data/data.csv").then(function (dataSet) {

    // Create Scales
    //= ============================================
    var xStateScale = d3.scaleLinear()
        .domain(d3.extent(dataSet, d => d.state))
        .range([0, chartWidth]);

    var yLinearScale1 = d3.scaleLinear()
        .domain([0, d3.max(dataSet, d => d.poverty)])
        .range([chartHeight, 0]);

    var yLinearScale2 = d3.scaleLinear()
        .domain([0, d3.max(dataSet, d => d.obesity)])
        .range([chartHeight, 0]);

    // Create Axes
    // =============================================
    var bottomAxis = d3.axisBottom(xStateScale);
    var leftAxis = d3.axisLeft(yLinearScale1);
    var rightAxis = d3.axisRight(yLinearScale2);