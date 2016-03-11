import React, {Component, PropTypes} from 'react';
import ChoroplethMap from './ChoroplethMap';
import ChoroplethLegend from './ChoroplethLegend';

require('normalize.css');
require('styles/App.scss');

class Choropleth extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className='choropleth'>
        <svg
          className='choropleth-map'
          width={this.props.width}
          height={this.props.height}
        >
          <ChoroplethMap data={data} />
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

Choropleth.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
};

Choropleth.defaultProps = {
  width: 960,
  height: 500
};

export default Choropleth;
