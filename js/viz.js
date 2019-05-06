// create dataset from selection

const random = [0,0,10,20,100,0,40,0,60,10,5,0,0,10,15,80,0,0,30,0,50];
const keys = ["first", "second", "third", "fourth", "fifth", "sixth"];
const colors = ["#51addf", "#c582aa", "#005b9d", "#35a993", "#cc373c", "#f7d783"];

let arr = [];


function updateArray () {
    for (var i = 0; i < 6; i++) {
        arr[i] = [];

        for (var j=0; j<6; j++) {
            let num = random[Math.floor(Math.random() * random.length)];
            arr[i].push(num);
        }

        // arr[i] = "[" + random[Math.floor(Math.random() * random.length)]  + "," 
        // + random[Math.floor(Math.random() * random.length)] + "," 
        // + random[Math.floor(Math.random() * random.length)]  + "," 
        // + random[Math.floor(Math.random() * random.length)]  + "," 
        // + random[Math.floor(Math.random() * random.length)] + "]";

    }
}

updateArray();

var matrix = Object.values(arr);


// var matrix = [
//     [0, 293, 374, 380, 132, 128], // X
//     [251, 0, 285, 197, 398, 161], // Y
//     [403, 426, 0, 200,  198, 141], // Z
//     [454, 267, 291, 0, 294, 341], // C
//     [200, 665, 403, 326, 0, 286], // B
//     [210, 251, 211, 289, 247, 0] // A
// ];

console.log(arr);
console.log(matrix);

var width = parseInt(d3.select("#viz").style("width")),
    height = width;
    outerRadius = Math.min(width, height) * 0.5 -55
    innerRadius = outerRadius - 20;

var svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height);

var wrapper = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(75)");

var chordGenerator = d3.chord()
    .padAngle(0.1)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

var chord = chordGenerator(matrix);

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
d3.select("g")
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
    .attr("d", arcs)
    .style("opacity", 1);



