var maFips = _.range(25001, 25028, 2);

$(document).ready( function() {
    maFips.forEach( function(fips, index, array) {
        var eid = "#" + fips;
        console.log(eid);

        var path = $(eid)[0];
        var bbox = path.getBBox();
        console.log(bbox.x, bbox.y);

        d3.select("svg").append("circle")
            .attr("cx", bbox.x + bbox.width/2)
            .attr("cy", bbox.y + bbox.height/2)
            .attr("r", 300)
            .attr("stroke", "black")
            .attr("stroke-width", "10")
            .attr("fill", "red")
    });
});
