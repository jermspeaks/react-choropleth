import d3 from 'd3';

var Choropleth = {};
var svgWidth = 960;
var svgHeight = 500;

const quantize = d3.scale.quantize()
  .domain([0, 8891])
  .range(d3.range(5).map(i => `q${i}-9`));

const projection = d3.geo.albersUsa()
  .scale(svgWidth)
  .translate([svgWidth / 2, svgHeight / 2]);
const pathGenerator = d3.geo.path().projection(projection);

Choropleth.enter = selection => {
  var svg = d3.select('svg.choropleth-map');

  var path = selection.append('path')
    .attr('class', d => d.stateInfo.videoViews ? quantize(d.stateInfo.videoViews) : 'q0-9')
    .attr('d', d => pathGenerator(d))

  var tooltip = d3.select('div.choropleth-tooltip')
    .classed('hidden', true);

  path.on('mousemove', d => {
    if (d.stateInfo.videoViews) {
      var mouse = d3.mouse(svg.node()).map(d => parseInt(d, 10));
      tooltip.html(`
        <div class='choropleth-tooltip-text'>
          <span>${d.properties.initials}</span>
        </div>
        <div class='choropleth-tooltip-details'>
          <span>Video Views: ${d.stateInfo.videoViews}</span>
        </div>
      `);

      tooltip.classed('hidden', false)
        .attr('style', `left: ${(mouse[0] + 15)}px; top: ${(mouse[1] - 35)}px`);
    }
  })
  .on('mouseout', d => {
    if (d.stateInfo.videoViews) {
      tooltip.classed('hidden', true);
    }
  });

  selection.append('text')
    .attr('class', 'choropleth-text')
    .attr('x', d => pathGenerator.centroid(d)[0])
    .attr('y', d => pathGenerator.centroid(d)[1])
    .text(d => d.properties.initials)
}

export default Choropleth;
