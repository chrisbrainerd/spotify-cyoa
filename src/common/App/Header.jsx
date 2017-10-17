import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Nav } from 'reactbulma';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  render() {
    console.log(this.props.history);
    const loc = this.props.history.location.pathname;
    return (
      <Nav hasShadow id='navbar'>
        <Nav.Left>
          <Nav.Item>
            <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
          </Nav.Item>
          <Link to='/'>
            <Nav.Item 
              tab 
              className={loc == '/' ? 'is-active' : ''} 
              >
              Home
            </Nav.Item>
          </Link>
          <Link to='/Game'>
            <Nav.Item 
              tab 
              className={loc == '/Game' ? 'is-active' : ''} 
              >
              Game
            </Nav.Item>
          </Link>
          <Link to='/About'>
            <Nav.Item 
              tab 
              className={loc == '/About' ? 'is-active' : ''} 
              >
              About
            </Nav.Item>
          </Link>          
        </Nav.Left>
        <Nav.Right>
          <Link to='/logout'><Nav.Item tab>Log out</Nav.Item></Link>
        </Nav.Right>
      </Nav>
    )
  }
}

export default withRouter(Header);