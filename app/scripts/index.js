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
        .attr('height', (d) => d.y1 - d.y0);     
});