require('normalize.css');
require('styles/App.css');

import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import topojson from 'topojson';

// let us = require('../../data/us.json');
// let unemployment = require('../../data/unemployment.tsv');
let yeomanImage = require('../images/yeoman.png');

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      // counties: [],
      states: [],
      rateById: d3.map()
    };
  }

  componentWillMount() {
    // let unemploymentUrl = 'https://gist.githubusercontent.com/pleasetrythisathome/9713092/raw/5cc6f9b62306555ac8a51c89cbc0ba1b8d38649f/unemployment.tsv';
    let usJSONUrl = 'https://gist.githubusercontent.com/jermspeaks/fac1ed95e1728fbd1fbe/raw/ddb7df44c99286b5f1bd2394d20317fd7683c8f8/us.json';
    // d3.tsv(unemploymentUrl, data => {
    //   this.state.rateById.set(data.id, +data.rate);
    // });

    d3.json(usJSONUrl, usData => {
      this.setState({
        // counties: topojson.feature(usData, usData.objects.counties).features,
        state: topojson.feature(usData, usData.objects.states).features
      });
    })
  }

  render() {
    const pathGenerator = d3.geo.path();
    // const quantize = d3.scale.quantize()
    //   .domain([0, 0.15])
    //   .range(d3.range(9).map(i => `q${i}-9`));

    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <svg
          className='choropleth Blues'
          width={this.props.width}
          height={this.props.height}
        >
          <g className='counties'>
            {this.state.states.map((state, stateIndex) => {
              return (
                <path
                  key={stateIndex}
                  className='q7-9'
                  d={pathGenerator(state)}
                />
              )
            })}
          </g>

          {/*<path className='state' d={pathGenerator(this.state.states)}/>*/}
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
