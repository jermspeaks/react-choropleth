import React, {Component} from 'react';
import Choropleth from './Choropleth';
import {videoViewData} from '../data/videoViewData';

require('normalize.css');
require('styles/App.scss');

class App extends Component {
  render() {
    return (
      <Choropleth data={videoViewData} />
    );
  }
}

export default App;
