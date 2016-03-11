import d3 from 'd3';
import topojson from 'topojson';
import {videoViewData} from '../data/videoViewData';
let usData = require('../us.json');

var Choropleth = {};
var svgWidth = 960;
var svgHeight = 500;

function quantize() {
  return d3.scale.quantize()
    .domain([0, 8891])
    .range(d3.range(5).map(i => `q${i}-9`));
}

const projection = d3.geo.albersUsa()
  .scale(svgWidth)
  .translate([svgWidth / 2, svgHeight / 2]);
const pathGenerator = d3.geo.path().projection(projection);

Choropleth.enter = (selection) => {
  var states = topojson.feature(usData, usData.objects.states).features;

  states.map(state => {
    const stateInformation = videoViewData.find(d => d.location === state.properties.initials);
    const videoViewLevel = stateInformation ? stateInformation.videoViews : 0;
    var mapGroup = selection.append('g')

    mapGroup.append('path')
      .attr('class', quantize(videoViewLevel))
      .attr('d', pathGenerator(state));

    mapGroup.append('text')
      .attr('class', 'choropleth-text')
      .attr('x', pathGenerator.centroid(state)[0])
      .attr('y', pathGenerator.centroid(state)[1])
      .text(state.properties.initials)
  });

  selection.call(Choropleth.update);
}

Choropleth.update = (selection) => {

}

Choropleth.exit = () => {

}

export default Choropleth;
