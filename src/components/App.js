import React, {Component, PropTypes} from 'react';
import ChoroplethMap from './ChoroplethMap';
import ChoroplethLegend from './ChoroplethLegend';

require('normalize.css');
require('styles/App.scss');

class App extends Component {
  render() {
    return (
      <div className='choropleth'>
        <svg
          className='choropleth-map'
          width={this.props.width}
          height={this.props.height}
        >
          <ChoroplethMap />
          <ChoroplethLegend
            svgWidth={this.props.width}
            svgHeight={this.props.height}
            maxValue={8891}
            title='Video Views'
          />
        </svg>
        <div className='choropleth-tooltip' />
      </div>
    );
  }

}

App.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

App.defaultProps = {
  width: 960,
  height: 500
};

export default App;
