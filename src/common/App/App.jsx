import React, { Component } from "react";
import Chooser from './Chooser';
import RelatedArtists from './RelatedArtists';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import cls from "./App.css";
require('./App.css');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello World!",
      loggedIn: false,
      user: {
        display_name: undefined,
        id: undefined,
        email: undefined,
        external_urls: { spotify: undefined },
        href: undefined,
        images: [{ url: undefined }],
      },
      playing: false
    };
  }

  componentDidMount() {
    var params = this.getHashParams();
    var access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;
    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        };
        fetch('https://api.spotify.com/v1/me', fetchOptions).then((response) => response.json())
          .then((data) => {
            const state = { user: data, loggedIn: true, access_token: access_token, refresh_token: refresh_token };
            this.setState(state);
          })
      } else {

      }
    }
  }

  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  updateState = stateObj => {
    this.setState(stateObj);
  }
  render() {
    const { display_name, images, id, email, external_urls, href } = this.state.user;
    const { access_token, playing, startingArtist, currentArtist } = this.state;
    return (
      <MuiThemeProvider>
        <div>
          {!this.state.loggedIn ?
            <div id="login">
              <h1>First, log in to spotify</h1>
              <a href="/login">Log in</a>
            </div>
            :
            <button onClick={() => this.setState({ playing: true })}>Let's go!</button>
          }
          {playing &&
            <Chooser
              updateParentState={this.updateState}
              user={this.state.user}
              access_token={access_token}
            />
          }
          {startingArtist &&
            <RelatedArtists
              updateParentState={this.updateState}
              access_token={access_token}
              startingArtist={startingArtist}
              currentArtist={currentArtist}
            />}

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
