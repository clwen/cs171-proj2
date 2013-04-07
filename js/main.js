var maFips = _.range(25001, 25028, 2);
var cData = 0;
var fips = 0;

function getCountyData() {
    d3.csv("data/mit-commuter-data.csv", function(data) {
        var countyDataPre = d3.nest().key(function(d){return d.COUNTY;})
        .rollup(function(d){
            return {
                COUNT:d3.sum(d, function(g){return parseInt(g.COUNT);}),
                AVGDIST:d3.mean(d, function(g){return parseFloat(g.DIST);}),
                MINDIST:d3.min(d, function(g){return parseFloat(g.DIST);}),
                MAXDIST:d3.max(d, function(g){return parseFloat(g.DIST);})
            };
        })
        .entries(data);
        var countyData = {};
        for(var i in countyDataPre){
            countyData[countyDataPre[i].key] = {};
            countyData[countyDataPre[i].key].AVGDIST = countyDataPre[i].values.AVGDIST;
            countyData[countyDataPre[i].key].MAXDIST = countyDataPre[i].values.MAXDIST;
            countyData[countyDataPre[i].key].MINDIST = countyDataPre[i].values.MINDIST;
            countyData[countyDataPre[i].key].COUNT = countyDataPre[i].values.COUNT;
        }

        maFips.forEach( function(fips, index, array) {
            var eid = "#" + fips;
            var path = $(eid)[0];
            var bbox = path.getBBox();

            if (countyData[fips] != undefined) {
                var count = countyData[fips].COUNT;

                d3.select("svg").append("circle")
                    .attr("cx", bbox.x + bbox.width/2)
                    .attr("cy", bbox.y + bbox.height/2)
                    .attr("r", Math.sqrt(count) * 10)
                    .attr("stroke", "black")
                    .attr("stroke-width", "10")
                    .attr("fill", "red")
            }
        });

        var lastHighLighted;
        $(".county").click( function() {
            var fips = $(this).attr("id");
            var cid = ".c" + fips;
            // clear last highlighted county
            if (lastHighLighted !== undefined) {
                d3.selectAll(lastHighLighted).transition()
                    .duration(500)
                    .style("fill", "#ff9");
            }
            // highlight current county
            lastHighLighted = cid;
            d3.selectAll(cid).transition()
                .duration(500)
                .style("fill", "#fcc");
        });
    }); // end of d3.csv
}

$(document).ready( function() {
    getCountyData();
});
