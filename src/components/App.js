import React, {Component, PropTypes} from 'react';
import Choropleth from './Choropleth';

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
          <Choropleth />
        </svg>
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
