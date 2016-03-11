import React, {Component, PropTypes} from 'react';

class ChoroplethLegend extends Component {
  render() {
    const { svgWidth, svgHeight, maxValue, title } = this.props;
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
        >{title}</text>
        <text
          className='choropleth-legend-min'
          x={svgWidth - (legendWidth + textWidthPaddingOffset)}
          y={svgHeight - (legendHeight + textHeightPaddingOffset + legendTicksHeightOffset)}
        >0</text>
        <text
          className='choropleth-legend-max'
          x={svgWidth - textWidthPaddingOffset}
          y={svgHeight - (legendHeight + textHeightPaddingOffset + legendTicksHeightOffset)}
        >{maxValue}</text>
      </g>
    );
  }
}
ChoroplethLegend.propTypes = {
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  title: PropTypes.string
};

ChoroplethLegend.defaultProps = {
  svgWidth: 960,
  svgHeight: 500
};

export default ChoroplethLegend;
