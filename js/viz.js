// create dataset from selection

const random = [10,10,25,50,15,40,15,55,10,5,10,10,5,15,35,10,20,30,25,50];
const keys = ["first", "second", "third", "fourth", "fifth", "sixth"];
const colors = ["#51addf", "#c582aa", "#005b9d", "#35a993", "#cc373c", "#f7d783"];

let matrix = [];

function updateMatrix () {

    // clear array
    matrix = [];

    for (var i = 0; i < 6; i++) {
        matrix[i] = [];

        for (var j=0; j<6; j++) {
            let num = random[Math.floor(Math.random() * random.length)];
            if (j !== i) {
                matrix[i].push(num);
            } else {
                matrix[i].push(0);
            }
        }

    }
}

var width = parseInt(d3.select("#viz").style("width")),
    height = width;
    outerRadius = Math.min(width, height) * 0.5 -55
    innerRadius = outerRadius - 20;

var svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height);

var wrapper = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(75)");

var arcs = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var ribbon = d3.ribbon()
    .radius(180);

var color = d3.scaleOrdinal()
    .domain(d3.range(6))
    .range(colors);

function getGradID(d){ 
    return "linkGrad-" + d.source.index + "-" + d.target.index; 
}

updateMatrix();
//console.log(matrix);

var chordGenerator = d3.chord()
    .padAngle(0.1);

// rejoin to data
var chord = chordGenerator(matrix);

// function to reorder chord to avoiding swapping of chords
console.log(chord);

function reorderChord () {
    for (var i=0; i<15; i++) {
        let obj = chord[i];
    
        if (obj.source.index > obj.target.index) {
            let a = obj.source;
            let b = obj.target;
    
            obj.source = b;
            obj.target = a;
        }
    }
}

reorderChord();


var grads = svg.append("defs")
.selectAll("linearGradient")
.data(chord)
.enter()
.append("linearGradient")
.attr("id", getGradID)
.attr("gradientUnits", "userSpaceOnUse")
.attr("x1", function(d, i){ return innerRadius * Math.cos((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
.attr("y1", function(d, i){ return innerRadius * Math.sin((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
.attr("x2", function(d,i){ return innerRadius * Math.cos((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })
.attr("y2", function(d,i){ return innerRadius * Math.sin((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); });

// set the starting color (at 0%)
grads.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", function(d){ return color(d.source.index)});

//set the ending color (at 100%)
grads.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", function(d){ return color(d.target.index)});

// making the ribbons
var chords = d3.select("g")
    .selectAll("path")
    .data(chord)
    .enter()
    .append("path")
    .attr("class", function(d) {
    return "chord chord-" + d.source.index + " chord-" + d.target.index // The first chord allows us to select all of them. The second chord allows us to select each individual one. 
    })
    .style("fill", function(d){ return "url(#" + getGradID(d) + ")"; })
    .attr("d", ribbon);

// making the arcs
var g = wrapper.selectAll("g")
    .data(chord.groups)
    .enter()
    .append("g")
    .attr("class", "group");  


g.append("path")
    .style("fill", function(d){ return color(d.index)})
    // .style("stroke", function(d){ return d3.rgb(color(d.index)).darker(); })
    .attr("class", "arc")
    .attr("d", arcs)
    .style("opacity", 1);

function updateChord() {

    updateMatrix();

    // rejoin to data
    chord = chordGenerator(matrix);
    console.log(chord);
    reorderChord(chord);
    console.log(chord);


    svg.selectAll(".chord")
    .data(chord)
    .transition()
    .duration(2000)
    .attr("d", ribbon);

    svg.selectAll(".arc")
    .data(chord.groups)
    .transition()
    .duration(2000)
    .attr("d", arcs);



    
    // g.selectAll(".group")
    // .data(chord.groups)
    // .selectAll("path")
    // .data(function(d) { return d; })
    // .transition()
    // .duration(500)
    // .attr("d", arcs);

}

updateChord();

setTimeout(function(){ updateChord()}, 3000);




