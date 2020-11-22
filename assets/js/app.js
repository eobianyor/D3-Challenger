// @TODO: YOUR CODE HERE!
// Set up chart
// Define SVG area dimensions
// =================================
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
// =================================
var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 80
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
d3.csv("data.csv").then(function (dataSet) {


    // ==============================================================================================

    //     console.log(dataSet)

    //     // Create Scales
    //     //= ============================================
    //     var xLinearScale = d3.scaleLinear()
    //         .domain([0, d3.max(dataSet, d => d.poverty)])
    //         .range([chartHeight, 0]);

    //     var yLinearScale = d3.scaleLinear()
    //         .domain([0, d3.max(dataSet, d => d.obesity)])
    //         .range([chartHeight, 0]);

    //     console.log(xLinearScale)
    //     console.log(yLinearScale)

    //     // Create Axes
    //     // =============================================
    //     var bottomAxis = d3.axisBottom(xLinearScale);
    //     var leftAxis = d3.axisLeft(yLinearScale);

    //     // Append the axes to the chartGroup
    //     // ==============================================
    //     // Add bottomAxis
    //     chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);

    //     // Add leftAxis to the left side of the display
    //     chartGroup.append("g").call(leftAxis);

    //     // Add rightAxis to the right side of the display
    //     // chartGroup.append("g").attr("transform", `translate(${chartWidth}, 0)`).call(rightAxis);


    //     // Set up two line generators and append two SVG paths
    //     // ==============================================
    //     // Line generators for each line
    //     var line1 = d3
    //         .line()
    //         .x(d => xStateScale(d.state))
    //         .y(d => yLinearScale1(d.poverty));

    //     var line2 = d3
    //         .line()
    //         .x(d => xStateScale(d.state))
    //         .y(d => yLinearScale2(d.obesity));


    //     // Append a path for line1
    //     chartGroup.append("path")
    //         .data([dataSet])
    //         .attr("d", line1)
    //         .classed("line green", true);

    //     // Append a path for line2
    //     chartGroup.append("path")
    //         .data([dataSet])
    //         .attr("d", line2)
    //         .classed("line orange", true);


    // }).catch(function (error) {
    //     console.log(error);
    // });

    // ==============================================================================================
    //     console.log(dataSet);

    //     // Cast the hours value to a number for each piece of tvData
    //     dataSet.forEach(function (data) {
    //         data.hours = +data.hours;
    //     });

    //     var barSpacing = 10; // desired space between each bar
    //     var scaleY = 10; // 10x scale on rect height

    //     // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
    //     var barWidth = (chartWidth - (barSpacing * (dataSet.length - 1))) / dataSet.length;

    //     // @TODO
    //     // Create code to build the bar chart using the tvData.
    //     chartGroup.selectAll(".bar")
    //         .data(dataSet)
    //         .enter()
    //         .append("rect")
    //         .classed("bar", true)
    //         .attr("width", d => barWidth)
    //         .attr("height", d => d.hours * scaleY)
    //         .attr("x", (d, i) => i * (barWidth + barSpacing))
    //         .attr("y", d => chartHeight - d.hours * scaleY);
    // }).catch(function (error) {
    //     console.log(error);
    // });
    // ==============================================================================================
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    dataSet.forEach(function (data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(dataSet, d => d.poverty)])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([18, d3.max(dataSet, d => d.obesity)])
        .range([chartHeight, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(dataSet)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("opacity", ".75");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.state}<br>Hair length: ${d.poverty}<br>Hits: ${d.num_hits}`);
        });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function (data) {
        toolTip.show(data, this);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Hair Metal Band Hair Length (inches)");
}).catch(function (error) {
    console.log(error);
});