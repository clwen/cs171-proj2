var maFips = _.range(25001, 25028, 2);
var cData = 0;

function getCountyData() {
    d3.csv("data/mit-commuter-data.csv", function(data) {
        var countyData = d3.nest().key(function(d){return d.COUNTY;})
        .rollup(function(d){
            return {
                COUNT:d3.sum(d, function(g){return parseInt(g.COUNT);}),
                AVGDIST:d3.mean(d, function(g){return parseFloat(g.DIST);}),
                MINDIST:d3.min(d, function(g){return parseFloat(g.DIST);}),
                MAXDIST:d3.max(d, function(g){return parseFloat(g.DIST);})
            };
        })
        .entries(data);
        var finalData = {};
        for(var i in countyData){
            finalData[countyData[i].key] = {};
            finalData[countyData[i].key].AVGDIST = countyData[i].values.AVGDIST;
            finalData[countyData[i].key].MAXDIST = countyData[i].values.MAXDIST;
            finalData[countyData[i].key].MINDIST = countyData[i].values.MINDIST;
            finalData[countyData[i].key].COUNT = countyData[i].values.COUNT;
        }

        maFips.forEach( function(fips, index, array) {
            var eid = "#" + fips;
            var path = $(eid)[0];
            var bbox = path.getBBox();

            if (finalData[fips] != undefined) {
                var count = finalData[fips].COUNT;

                d3.select("svg").append("circle")
                    .attr("cx", bbox.x + bbox.width/2)
                    .attr("cy", bbox.y + bbox.height/2)
                    .attr("r", Math.sqrt(count) * 10)
                    .attr("stroke", "black")
                    .attr("stroke-width", "10")
                    .attr("fill", "red")
            }
        });
    });
}

$(document).ready( function() {
    getCountyData();
});
