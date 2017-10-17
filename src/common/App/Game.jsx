import React, { Component } from "react";
import Chooser from './Chooser';
import RelatedArtists from './RelatedArtists';
import { connect } from 'react-redux';

import cls from "./App.scss";
require('./App.scss');

class Game extends Component {
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
        startingArtist: null,
        currentArtist: null
      },
      playing: false
    };
  }

  componentDidMount() {
    var params = this.getHashParams();
    var accessToken = params.accessToken,
      refresh_token = params.refresh_token,
      error = params.error;
    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (accessToken) {
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        };
        fetch('https://api.spotify.com/v1/me', fetchOptions).then((response) => response.json())
          .then((data) => {
            const state = { user: data, loggedIn: true, accessToken: accessToken, refresh_token: refresh_token };
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

  render() {
    const { startingArtist, currentArtist } = this.state;
    const { user, accessToken } = this.props;
    return (
      <div>
        <Chooser />
        {startingArtist &&
          <RelatedArtists
            updateParentState={this.updateState}
            accessToken={accessToken}
            startingArtist={startingArtist}
            currentArtist={currentArtist}
          />}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.default.user,
    accessToken: state.default.accessToken
  };
}

export default connect(mapStateToProps)(Game);
