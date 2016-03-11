import React, {Component} from 'react';
import topojson from 'topojson';
import {videoViewData} from '../data/videoViewData';
import ChoroplethState from './ChoroplethState';
const usData = require('../us.json');

class Choropleth extends Component {
  constructor() {
    super();
    this.state = {
      data: videoViewData,
      states: topojson.feature(usData, usData.objects.states).features
    };
  }

  render() {
    return (
      <g className='state' ref='choropleth'>
        {this.state.states.map((state, stateIndex) => {
          state.stateInfo = this.state.data.find(d => d.location === state.properties.initials) || {};
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

export default Choropleth;
