
// Helper function to load CSV data
function loadCSV(filename) {
  return new Promise(function (resolve, reject) {
    d3.csv(filename).then(function (data) {
      resolve(data);
    }).catch(function (error) {
      reject(error);
    });
  });
}

d3.csv("names.csv").then(function (data) {
  var uniqueValues = Array.from(new Set(data.map(function (d) { return d['a']; })));

  //uniqueValues = uniqueValues.slice(0, 10); // Limit to the first 10 unique values

  // Create the select2 searchable drop-down
  $("#dropdown").select2({
    data: uniqueValues
  });

  // Event listener for drop-down change
  $("#dropdown").on("change", function () {
    var selectedValue = $(this).val();

    // Load CSV data based on selected value
    loadCSV('Players/' + selectedValue + ".csv").then(function (filteredData) {
      // Clear previous chart
      d3.select("#chart").html("");

      // Define chart dimensions
      var width = 700;
      var height = 500;

      // Define margin
      var margin = { top: 25, right: 20, bottom: 50, left: 200 };

      // Calculate the inner width and height of the chart
      var innerWidth = width - margin.left - margin.right;
      var innerHeight = height - margin.top - margin.bottom;

      // Create SVG element
      var svg = d3.select("#chart")
        .append("svg")
        .attr("width", "100%") // Set the SVG width to 100% of the container
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + margin.top + ")"); // Center the graph horizontally

      // Create x-scale
      var xScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, function (d) { return parseFloat(d.Similarity); })])
        .range([0, innerWidth]);

      // Create y-scale
      var yScale = d3.scaleBand()
        .domain(filteredData.map(function (d) { return d['Player 1']; }))
        .range([0, innerHeight])
        .padding(0.1);

      // Limit y-axis domain to only the values present in the filtered data
      yScale.domain(filteredData.map(function (d) { return d['Player 1']; }));

      // Display the data rows sorted by "Similarity" in descending order
      filteredData.sort(function (a, b) {
        return parseFloat(b.Similarity) - parseFloat(a.Similarity);
      });

      // Limit to the top 20 values
      filteredData = filteredData.slice(0, 20);
      // Create y-scale
      var yScale = d3.scaleBand()
        .domain(filteredData.map(function (d) { return d['Player']; }))
        .range([0, height - 50])
        .padding(0.1);

      // Limit y-axis domain to only the values present in the filtered data
      yScale.domain(filteredData.map(function (d) { return d['Player']; }));

      // Create x-scale
      var xScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, function (d) { return parseFloat(d.Similarity); })])
        .range([0, innerWidth]);

      //Draw the  Chart Label:
      svg
        .append("text")
        .attr("class", "title")
        .attr("x", innerWidth / 2) //positions it at the middle of the width
        .attr("y", -margin.top / 2) //positions it from the top by the margin top
        //.attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Players similar to " + selectedValue);

      // Create bars
      svg.selectAll("rect")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("x", 0) // Move the bars to the left edge of the chart
        .attr("y", function (d) { return yScale(d['Player']); })
        .attr("width", function (d) { return xScale(parseFloat(d.Similarity)); })
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue")
        .on("mouseover", handleMouseOver) // Add mouseover event listener
        .on("mouseout", handleMouseOut); // Add mouseout event listener


      // Create value labels
      svg.selectAll(".value-label")
        .data(filteredData)
        .enter()
        .append("text")
        .attr("class", "value-label")
        .attr("x", function (d) { return xScale(0) + 4; }) // Adjust the x-coordinate to position the labels at the beginning of the bars with a margin of 4mm
        .attr("y", function (d) { return yScale(d['Player']) + yScale.bandwidth() / 2; }) // Position the labels vertically centered within each bar
        .attr("dy", "0.35em") // Adjust the vertical alignment of the labels
        .text(function (d) { return parseFloat(d.Similarity).toFixed(2) + "%"; }) // Display the rounded value of the bar with 2 decimal places followed by a percentage sign
        .attr("text-anchor", "start") // Align the labels to the start (left) of the text
        .attr("fill", "white") // Set the text color to white for better visibility
        .style("font-size", "12px"); // Set the font size to 12 pixels



      // Mouseover event handler
      function handleMouseOver(d) {
        d3.select(this)
          .attr("fill", "orange");
      }

      // Mouseout event handler
      function handleMouseOut(d) {
        d3.select(this)
          .attr("fill", "steelblue");
      }

// Create y-axis

svg.append("g")
  .call(d3.axisLeft(yScale))
  .selectAll("text")
  .attr("class", "y axis")
  .attr("dy", "0.55em") // Adjust the vertical alignment of the labels
  .attr("x", -10) // Move the labels slightly to the left
  .attr("text-anchor", "end") // Align the labels to the end of the tick
  .style("font-size", "10px") // Set the font size to 10 pixels
  .style("cursor", "pointer") // Add cursor pointer to the y-axis labels
  .on("click", function(_, d) { // Modify event binding to access the correct value
    //var labelValue = String(d).slice(0, String(d).indexOf("(")).trim(); // Convert d to a string and extract the value before "("
    
    //var formattedValue = labelValue.substring(labelValue.lastIndexOf('.') + 1); 
    //console.log(formattedValue)
    //var transfermarktUrl = "https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=" + encodeURIComponent(formattedValue); // Construct the URL
    //window.location.href = transfermarktUrl; // Redirect to the specified URL
    //window.open(transfermarktUrl, "_blank"); // Open the specified URL in a new tab
    $("#dropdown").val(d).trigger("change");
  });






    }).catch(function (error) {
      console.log(error);
    });
  });
});
