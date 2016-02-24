require('normalize.css');
require('styles/App.scss');

import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import topojson from 'topojson';

let usData = require('../us.json');
const videoViewData = [{
    location: 'WA',
    videoViews: 5100
  }, {
    location: 'NV',
    videoViews: 7717
  }, {
    location: 'CA',
    videoViews: 5464
  }, {
    location: 'OR',
    videoViews: 2030
  }, {
    location: 'ID',
    videoViews: 8177
  }, {
    location: 'MT',
    videoViews: 5035
  }, {
    location: 'UT',
    videoViews: 1100
  }, {
    location: 'AZ',
    videoViews: 1357
  }, {
    location: 'WY',
    videoViews: 8801
  }, {
    location: 'CO',
    videoViews: 1100
  }, {
    location: 'PA',
    videoViews: 3283
  }, {
    location: 'AL',
    videoViews: 4698
  }, {
    location: 'SC',
    videoViews: 8727
  }, {
    location: 'GA',
    videoViews: 8527
}];

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      states: [],
      rateById: d3.map()
    };
  }

  componentWillMount() {
    this.setState({
      states: topojson.feature(usData, usData.objects.states).features
    });
  }

  pathGenerator() {
    return d3.geo.path();
  }

  quantize() {
    return d3.scale.quantize()
      .domain([0, 8801])
      .range(d3.range(5).map(i => `q${i}-9`));
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    const pathGenerator = this.pathGenerator();
    const quantize = this.quantize();

    return (
      <div className='choropleth'>
        <svg
          className='choropleth-map'
          width={this.props.width}
          height={this.props.height}
        >
          <g className='state'>
            {this.state.states.map((state, stateIndex) => {
              // const randomInt = this.getRandomInt(0, 8);
              const stateInformation = videoViewData.find(d => d.location === state.properties.initials);
              const videoViewLevel = stateInformation ? stateInformation.videoViews: 0;
              const pathGenerated = pathGenerator(state);
              return (
                <g key={stateIndex}>
                  <path
                    className={quantize(videoViewLevel)}
                    d={pathGenerated}
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
        </svg>
      </div>
    );
  }
}

AppComponent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

AppComponent.defaultProps = {
  width: 960,
  height: 500
};

export default AppComponent;
