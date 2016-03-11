import React, {Component, PropTypes} from 'react';
import topojson from 'topojson';
import ChoroplethState from './ChoroplethState';
const usData = require('../us.json');

class ChoroplethMap extends Component {
  constructor() {
    super();
    this.state = {
      states: topojson.feature(usData, usData.objects.states).features
    };
  }

  render() {
    return (
      <g className='choropleth' ref='choropleth'>
        {this.state.states.map((state, stateIndex) => {
          state.stateInfo = this.props.data.find(d => d.location === state.properties.initials) || {};
          return (
            <ChoroplethState
              state={state}
              key={stateIndex}
            />
          );
        })}
      </g>
    );
  }
}

ChoroplethMap.propTypes = {
  data: PropTypes.array.isRequired
};

export default ChoroplethMap;
