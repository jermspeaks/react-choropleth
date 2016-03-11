require('normalize.css');
require('styles/App.scss');

import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import topojson from 'topojson';
import {videoViewData} from '../data/videoViewData';

let usData = require('../us.json');

class Choropleth extends Component {
  constructor(props) {
    super();
    this.state = {
      states: [],
      containerWidth: props.width,
      tooltip: {
        enabled: false
      }
    };
  }

  componentWillMount() {
    this.setState({
      states: topojson.feature(usData, usData.objects.states).features
    });
  }

  /**
   * Find Max Value
   * @param  {array} series  Component series
   * @return {number}        Max value of the series
   */
  findMaxValue(series) {
    return series.length > 0 && series.reduce((prev, curr) => curr.value > prev.value ? curr : prev).value;
  }

  pathGenerator() {
    return d3.geo.path();
  }

  quantize() {
    return d3.scale.quantize()
      .domain([0, 8891])
      .range(d3.range(5).map(i => `q${i}-9`));
  }

  generateHeight(width) {
    return width * (25 / 48);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  renderLegend(svgWidth, svgHeight) {
    // Legend Configuration
    const legendWidth = 150;
    const legendHeight = 16;
    const textWidthPaddingOffset = 20;
    const textHeightPaddingOffset = 20;
    const legendLabelHeightOffset = 14;
    const legendTicksHeightOffset = 2;

    return (
      <g className='choropleth-legend'>
        <defs>
          <linearGradient id='gradient'>
            <stop className='choropleth-legend-stop-1' offset='0%'/>
            <stop className='choropleth-legend-stop-2' offset='100%'/>
          </linearGradient>
        </defs>
        <rect
          className='choropleth-legend-rect'
          width={legendWidth}
          height={legendHeight}
          x={svgWidth - (legendWidth + textWidthPaddingOffset)}
          y={svgHeight - (legendHeight + textHeightPaddingOffset)}
        />
        <text
          className='choropleth-legend-text'
          x={svgWidth - (legendWidth + textWidthPaddingOffset)}
          y={svgHeight - (legendHeight + textHeightPaddingOffset + legendLabelHeightOffset)}
        >Video Views</text>
        <text
          className='choropleth-legend-min'
          x={svgWidth - (legendWidth + textWidthPaddingOffset)}
          y={svgHeight - (legendHeight + textHeightPaddingOffset + legendTicksHeightOffset)}
        >0</text>
        <text
          className='choropleth-legend-max'
          x={svgWidth - textWidthPaddingOffset}
          y={svgHeight - (legendHeight + textHeightPaddingOffset + legendTicksHeightOffset)}
        >8891</text>
      </g>
    );
  }

  getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
  }

  getClickPosition(e) {
    var parentPosition = this.getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;

    return {
      x: xPosition,
      y: yPosition
    };
  }

  showTooltip(e, data) {
    var position = this.getClickPosition(e);

    if (data) {
      this.setState({
        tooltip: {
          enabled: true,
          displayName: data.location,
          videoViews: data.videoViews,
          x: position.x,
          y: position.y
        }
      });
    }
  }

  hideTooltip() {
    this.setState({
      tooltip: {
        enabled: false
      }
    });
  }

  render() {
    const quantize = this.quantize();
    const svgWidth = this.refs.choropleth ? this.refs.choropleth.offsetWidth : this.state.containerWidth;
    const svgHeight = this.generateHeight(svgWidth);
    const projection = d3.geo.albersUsa()
      .scale(svgWidth)
      .translate([svgWidth / 2, svgHeight / 2]);
    const pathGenerator = d3.geo.path().projection(projection);

    return (
      <div className='choropleth'>
        <svg
          className='choropleth-map'
          width={this.props.width}
          height={this.props.height}
        >
          <g className='state'>
            {this.state.states.map((state, stateIndex) => {
              const stateInformation = videoViewData.find(d => d.location === state.properties.initials);
              const videoViewLevel = stateInformation ? stateInformation.videoViews: 0;
              return (
                <g key={stateIndex}>
                  <path
                    className={quantize(videoViewLevel)}
                    d={pathGenerator(state)}
                    onMouseOver={e => this.showTooltip(e, stateInformation)}
                    onMouseOut={() => this.hideTooltip()}
                  />
                  <text
                    className='choropleth-text'
                    x={pathGenerator.centroid(state)[0]}
                    y={pathGenerator.centroid(state)[1]}
                  >{state.properties.initials}</text>
                </g>
              )
            })}
          </g>
          {this.state.tooltip.enabled ? (
            <g className='tooltip'>
              <rect
                className='choropleth-tooltip'
                x={this.state.tooltip.x}
                y={this.state.tooltip.y}
              />
              <text x={this.state.tooltip.x} y={this.state.tooltip.y + 20} >{this.state.tooltip.displayName}</text>
              <text x={this.state.tooltip.x} y={this.state.tooltip.y + 36} >{this.state.tooltip.videoViews}</text>
            </g>
          ) : null}
          {this.renderLegend(svgWidth, svgHeight)}
        </svg>
      </div>
    );
  }
}

Choropleth.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

Choropleth.defaultProps = {
  width: 960,
  height: 500
};

export default Choropleth;
