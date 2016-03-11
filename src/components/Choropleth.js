import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import ChoroplethVisualization from '../visualizations/choropleth';
import reactDOM from 'react-dom';

class Choropleth extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    // wrap element in d3
    this.d3Node = d3.select(this.refs.choropleth);
    this.d3Node.datum(this.props.data)
      .call(ChoroplethVisualization.enter);
  }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.data.update) {
  //     this.d3Node.datum(nextProps.data)
  //       .call(ChoroplethVisualization.update);
  //   }
  //   return true;
  // }
  //
  // componentDidUpate() {
  //   this.d3Node.datum(this.props.data)
  //     .call(ChoroplethVisualization.update);
  // }
  //
  // componentWillUnMount() {
  //
  // }

  render() {
    return (
      <g className='state' ref='choropleth'/>
    );
  }
}

Choropleth.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

Choropleth.defaultProps = {
  width: 960,
  height: 500
};

export default Choropleth;
