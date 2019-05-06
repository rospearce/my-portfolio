// create dataset from selection

let random = [0,0,10,20,100,0,40,0,60,10,5,0,0,10,15,80,0,0,30,0,50];
const keys = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];

let arr = {};

function updateArray () {
    for (var i = 0; i < 7; i++) {
        let key = keys[i];

        arr[key] = "[" + random[Math.floor(Math.random() * random.length)] + "," 
        + random[Math.floor(Math.random() * random.length)] + "," 
        + random[Math.floor(Math.random() * random.length)] + "," 
        + random[Math.floor(Math.random() * random.length)] + "," 
        + random[Math.floor(Math.random() * random.length)] + "," 
        + random[Math.floor(Math.random() * random.length)] + "," 
        + random[Math.floor(Math.random() * random.length)] + "]";

    }
}

updateArray();
console.log(arr);

var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = parseInt(d3.select("#line-wrapper").style("width")) - margin3.left - margin3.right,
    height = width - margin3.top - margin3.bottom;

var svg3 = d3.select("#viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




