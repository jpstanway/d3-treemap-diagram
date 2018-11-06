// API url
const URL = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json';

// retrieve data
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(d3.json(URL));
    }, 300);
});

promise.then((data) => {

    // svg + legend dimensions
    const width = 1080;
    const height = 600;

    // create an object that pairs each platform with a color
    const consoleColors = {
        "3DS": "#5e0106",
        "Wii": "#7e0209",
        "DS": "#bd030c",
        "N64": "#be6166",
        "GBA": "#be9093",
        "SNES": "#FC0411",
        "GB": "#fe8289",
        "NES": "#fec0c4",
        "PS4": "#07002e",
        "PS3": "#67608e",
        "PSP": "#8a80be",
        "PS2": "#13007C",
        "PS": "#c4bfde",
        "XOne": "#436635",
        "X360": "#87CC69",
        "XB": "#e0f2da",
        "PC": "#efefef",
        "2600": "#777777"
    }; 

    // create svg area
    const svg = d3.select('#container')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);     
                  
    // create treemap layout
    const treemap = d3.treemap()
                      .size([width, height]);              

    // create root node
    const root = d3.hierarchy(data)
                   .sum((d) => d.value)
                   .sort((a, b) => b.height - a.height || b.value - a.value);              

    // pass root node into treemap
    treemap(root);

    // create and place a g element for each group of data
    const cell = svg.selectAll('.cell')
                    .data(root.leaves())
                    .enter()
                    .append('g')
                    .attr('class', 'cell')
                    .attr('transform', (d) => `translate(${d.x0}, ${d.y0})`);
    
    // append a rect to each cell and calculate the dimensions                
    cell.append('rect')
        .attr('class', 'tile')
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .style('fill', (d) => consoleColors[d.data.category])
        .style('stroke', 'black');


});