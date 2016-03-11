import React, {Component, PropTypes} from 'react';
import ChoroplethMap from './ChoroplethMap';
import ChoroplethLegend from './ChoroplethLegend';

require('normalize.css');
require('styles/App.scss');

class Choropleth extends Component {
  constructor(props) {
    super();
    this.state = {
      containerWidth: props.width
    };
  }

  /**
   * Find Max Value
   * @param  {array} series  Component series
   * @return {number}        Max value of the series
   */
  findMaxValue(series, key) {
    return series.reduce((prev, curr) => curr[key] > prev[key] ? curr : prev)[key];
  }

  generateHeight(width) {
    return width * (25 / 48);
  }

  render() {
    const { data } = this.props;
    const svgWidth = this.refs.choroplethContainer ? this.refs.choroplethContainer.offsetWidth : this.state.containerWidth;
    const svgHeight = this.generateHeight(svgWidth);

    return (
      <div className='choropleth' ref='choroplethContainer'>
        <svg
          className='choropleth-map'
          width={svgWidth}
          height={svgHeight}
        >
          <ChoroplethMap data={data} />
          <ChoroplethLegend
            svgWidth={svgWidth}
            svgHeight={svgHeight}
            maxValue={this.findMaxValue(data, 'videoViews')}
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
  data: PropTypes.array.isRequired
};

Choropleth.defaultProps = {
  width: 960
};

export default Choropleth;
