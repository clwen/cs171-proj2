function getCountyData(){
    d3.csv("http://localhost:8000/mit-commuter-data.csv", function(data){
        console.log(data);
        var countyData = d3.nest().key(function(d){return d.COUNTY;})
        .rollup(function(d){
            return {
                COUNT:d3.sum(d, function(g){return g.COUNT;}),
                AVGDIST:d3.mean(d, function(g){return g.AVGDIST;}),
                MINDIST:d3.min(d, function(g){return g.AVGDIST;}),
                MAXDIST:d3.max(d, function(g){return g.AVGDIST;})
            };
        })
        .entries(data);

        console.log(countyData);
    });
}

$(document).ready(function(){
    getCountyData();
});