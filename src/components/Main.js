require('normalize.css');
require('styles/App.scss');

import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import topojson from 'topojson';

// let us = require('../../data/us.json');

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      states: [],
      rateById: d3.map()
    };
  }

  componentWillMount() {
    let usJSONUrl = 'https://gist.githubusercontent.com/jermspeaks/fac1ed95e1728fbd1fbe/raw/c340b4da7131fe687fc7e89bb9630e6dfba9921f/states.json';

    d3.json(usJSONUrl, usData => {
      this.setState({
        states: topojson.feature(usData, usData.objects.states).features
      });
    })
  }

  render() {
    const pathGenerator = d3.geo.path();
    const quantize = d3.scale.quantize()
      .domain([0, 8])
      .range(d3.range(9).map(i => `q${i}-9`));

    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    return (
      <div className="index">
        <svg
          className='choropleth Blues'
          width={this.props.width}
          height={this.props.height}
        >
          <g className='state'>
            {this.state.states.map((state, stateIndex) => {
              const randomInt = getRandomInt(0, 8);
              const pathGenerated = pathGenerator(state);
              return (
                <g key={stateIndex}>
                  <path
                    className={quantize(randomInt)}
                    d={pathGenerated}
                  />
                  <text
                    x={pathGenerator.centroid(state)[0]}
                    y={pathGenerator.centroid(state)[1]}
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    fontSize="10px"
                    fill="black"
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

// x={pathGenerator.centroid(state)[0]}
// y={pathGenerator.centroid(state)[1]}


AppComponent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

AppComponent.defaultProps = {
  width: 960,
  height: 500
};

export default AppComponent;
