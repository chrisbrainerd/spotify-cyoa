import React from 'react';

import { syncHistory, routeReducer }     from 'react-router-redux';
import { createHistory } from 'history';

import Header from './Header';
import Body from './Body';

require('./App.scss');

const App = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  )
}

export default App;