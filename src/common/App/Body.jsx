import React, { Component } from 'react';
import {
  Switch, Route, IndexRoute
} from 'react-router-dom'

import Home from './Home';
import Game from './Game';
import About from './About';
import App     from './App';
import Login   from './Login';
import User    from './User';
import Error   from './Error';
export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    // <Route exact path='/' component={Home} />
    // <Route path='/Game' component={Game} />
    // <Route path='/About' component={About} />
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/user/:accessToken/:refreshToken" component={User} />
        <Route path="/error/:errorMsg" component={Error} />
        <Route path="/game" component={Game} />
      </Switch>
    )
  }

}