function onMM(e){
    hideTT();
    var x = e.pageX;
    var y = e.pageY;
    var se = e.srcElement || e.target;
    var content = e.srcElement.getAttribute("title");
    document.getElementById('tooltip').innerHTML = content;
    window.lastX = e.pageX;
    window.lastY = e.pageY;
    setTimeout("showTT();", 0.8 *1000); //Javascript uses milliseconds
}
function showTT(){
    var ttOffset = 8;
    var x = window.lastX + ttOffset;
    var y = window.lastY + ttOffset;
    var tt = document.getElementById('tooltip');
    tt.className = "visible";
    tt.style.position = "absolute";
    tt.style.left = x + "px";
    tt.style.top  = y + "px";
    tt.style.fontSize = "9pt";
    tt.style.zIndex = "3";
}
function hideTT(){
    document.getElementById('tooltip').className="invisible";
}

function renderBarchart(category, datatype, county){
    d3.select("#barchart").remove(); //perhaps add a smoother transition between data
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, 1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
        //.tickFormat(formatPercent);

    var ylabel = "Population";
    var xlabel = category;

    if(datatype=="PERCENT"){
        yAxis.tickFormat(formatPercent);
        ylabel = "Percent of Population";
    }

    var svg = d3.select("#chartarea").append("svg").attr("id", "barchart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.csv("http://localhost:8000/data/mit-commuter-data.csv", function(data){
        var command = "d3.nest()";
        if(county!="ALL"){
            command += ".key(function(d){return d.COUNTY;})";
        }
        // command += ".key(function(d){return d."+category+";})"+
        //     ".rollup(function(d){"+
        //         "return d3.sum(d, function(g){return g.COUNT;});"+
        //     "})"+
        //     ".entries(data);";
        command += ".key(function(d){return d."+category+";})"+
        ".rollup(function(d){"+
            "return {"+
                "COUNT:d3.sum(d, function(g){return g.COUNT;}),"+
                "AVGDIST:d3.mean(d, function(g){return g.AVGDIST;})"+
            "};"+
        "})"+
        ".entries(data);";
        var processedData = eval(command);
        var nestedData = [];
        if(county=="ALL"){
            nestedData = processedData;
        }
        else{
            for(var i in processedData){
                if(processedData[i].key==county){
                    nestedData = processedData[i].values;
                }
            }
        }
        //console.log(nestedData);
        var yvals = "d.values";

        var total = 0;
        for(var i in nestedData){
            total += nestedData[i].values.COUNT;
        }
        //console.log(total);
        for (var i in nestedData){
            nestedData[i].percent = nestedData[i].values.COUNT/total;
            nestedData[i].AVGDIST = nestedData[i].values.AVGDIST;
            tempcount = nestedData[i].values.COUNT;
            delete nestedData[i].values;
            nestedData[i].values = tempcount;
        }

        if(datatype=="PERCENT"){
            yvals = "d.percent";
        }

        x.domain(nestedData.map(function(d) { return d.key; }));
        y.domain([0, d3.max(nestedData, function(d) { return eval(yvals); })]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(ylabel);

      svg.selectAll(".bar")
          .data(nestedData)
        .enter().append("rect").attr("onmousemove","onMM(event);")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.key); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(eval(yvals)); })
          .attr("height", function(d) { return height - y(eval(yvals)); })
            .attr("title", function(d) {return d.key + " : " + eval(yvals) + "<br/>" + "Average Distance to Campus: " + Math.floor(d.AVGDIST) + " km";}); 
            // to allow for information to be shown on mouseover - tooltip!

      d3.select("input").on("change", change);

      function change() {
        var x0 = x.domain(nestedData.sort(this.checked
            ? function(a, b) { return b.values - a.values; }
            : function(a, b) { return d3.ascending(a.key, b.key); })
            .map(function(d) { return d.key; }))
            .copy();

        var transition = svg.transition().duration(750),
            delay = function(d, i) { return i * 50; };

        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function(d) { return x0(d.key); });

        transition.select(".x.axis")
            .call(xAxis)
          .selectAll("g")
            .delay(delay);
        }
    });
}

$(document).ready(function(){
    renderBarchart("AREA", "COUNT", "ALL");
});