var ids = new Array("");

$(document).ready( function() {
    var path = $("#25001")[0];
    console.log(path.getBBox());

    var path = $("#25003")[0];
    console.log(path.getBBox());

    d3.select("svg").append("circle")
        .attr("cx", 12326)
        .attr("cy", 3363)
        .attr("r", 300)
        .attr("stroke", "black")
        .attr("fill", "red")
});
