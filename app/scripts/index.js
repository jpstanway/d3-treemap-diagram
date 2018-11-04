// API url
const gamesURL = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json';

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
    const padding = 30;

    // create svg area
    const svg = d3.select('#container')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);

    // set up x and y scales
    const xScale = d3.scaleLinear()
                     .domain([0, 100])
                     .range([padding, width - padding]);
                     
    const yScale = d3.scaleLinear()
                     .domain([0, 10])
                     .range([padding, height - padding]);                 

    // create rects representing the data
    svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')
       .attr('width', 50)
       .attr('height', 50);
});