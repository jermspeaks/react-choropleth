import d3 from 'd3';

var Choropleth = {};
var svgWidth = 960;
var svgHeight = 500;

const quantize = d3.scale.quantize()
  .domain([0, 8891])
  .range(d3.range(5).map(i => `q${i}-9`));

const createTooltip = (title, details) => {
  return `
    <div class='choropleth-tooltip-text'>
      <span>${title}</span>
    </div>
    <div class='choropleth-tooltip-details'>
      <span>${details}</span>
    </div>
  `;
}

const projection = d3.geo.albersUsa()
  .scale(svgWidth)
  .translate([svgWidth / 2, svgHeight / 2]);
const pathGenerator = d3.geo.path().projection(projection);

Choropleth.enter = selection => {
  // Tooltip
  d3.select('div.choropleth-tooltip')
    .classed('hidden', true);

  // State Path
  var path = selection.append('path')
    .attr('class', d => d.stateInfo.videoViews ? quantize(d.stateInfo.videoViews) : 'q0-9')
    .attr('d', d => pathGenerator(d))

  // State Text
  var text = selection.append('text')
    .attr('class', 'choropleth-text')
    .attr('x', d => pathGenerator.centroid(d)[0])
    .attr('y', d => pathGenerator.centroid(d)[1])
    .text(d => d.properties.initials)

  // Event Listeners
  path.on('mousemove',Choropleth.mousemove);
  path.on('mouseout', Choropleth.mouseout);
  text.on('mousemove',Choropleth.mousemove);
  text.on('mouseout', Choropleth.mouseout);
}

Choropleth.mousemove = d => {
  var svg = d3.select('svg.choropleth-map');
  var tooltip = d3.select('div.choropleth-tooltip')
  var mouse = d3.mouse(svg.node()).map(d => parseInt(d, 10));
  var details = d.stateInfo.videoViews ? `Video Views: ${d.stateInfo.videoViews}` : 'Video Views: 0';

  tooltip.html(createTooltip(d.properties.initials, details))
    .classed('hidden', false)
    .attr('style', `left: ${(mouse[0] + 15)}px; top: ${(mouse[1] - 35)}px`);
}

Choropleth.mouseout = () => {
  var tooltip = d3.select('div.choropleth-tooltip')
  tooltip.classed('hidden', true);
}
export default Choropleth;
