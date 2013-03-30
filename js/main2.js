var maFips = _.range(25001, 25028, 2);
var cData = 0;

function getCountyData() {
    d3.csv("http://localhost:8000/mit-commuter-data.csv", function(data) {
        var countyData = d3.nest().key(function(d){return d.COUNTY;})
        .rollup(function(d){
            return {
                COUNT:d3.sum(d, function(g){return parseInt(g.COUNT);}),
                AVGDIST:d3.mean(d, function(g){return parseFloat(g.AVGDIST);}),
                MINDIST:d3.min(d, function(g){return parseFloat(g.AVGDIST);}),
                MAXDIST:d3.max(d, function(g){return parseFloat(g.AVGDIST);})
            };
        })
        .entries(data);

        maFips.forEach( function(fips, index, array) {
            var eid = "#" + fips;
            var path = $(eid)[0];
            var bbox = path.getBBox();

            d3.select("svg").append("circle")
                .attr("cx", bbox.x + bbox.width/2)
                .attr("cy", bbox.y + bbox.height/2)
                .attr("r", 300)
                .attr("stroke", "black")
                .attr("stroke-width", "10")
                .attr("fill", "red")
        });
    });
}

$(document).ready( function() {
    getCountyData();
});
