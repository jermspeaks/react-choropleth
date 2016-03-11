import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import ChoroplethVisualization from '../visualizations/choropleth';

class ChoroplethState extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // wrap element in d3
    this.d3Node = d3.select(this.refs.state);
    this.d3Node.datum(this.props.state)
      .call(ChoroplethVisualization.enter);
  }

  render() {
    return (
      <g className='state' ref='state' />
    );
  }
}

ChoroplethState.propTypes = {
  state: PropTypes.object.isRequired
};

export default ChoroplethState;
