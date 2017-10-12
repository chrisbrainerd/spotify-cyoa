import React, { Component } from "react";
import cls from "./App.css";
require('./App.css');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello World!",
      loggedIn: false,
      display_name: undefined,
      id: undefined,
      email: undefined,
      external_urls: { spotify: undefined },
      href: undefined,
      images: [{ url: undefined }]
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
        // render oauth info
        // oauthPlaceholder.innerHTML = oauthTemplate({
        //   access_token: access_token,
        //   refresh_token: refresh_token
        // });
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        };
        fetch('https://api.spotify.com/v1/me', fetchOptions).then((response) => response.json())
          .then((data) => {
            const state = Object.assign(data, { loggedIn: true });
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
    const { display_name, images, id, email, external_urls, href } = this.state;
    return (
      <div>
        <div id="login">
          <h1>First, log in to spotify</h1>
          <a href="/login">Log in</a>
        </div>
        {this.state.loggedIn &&
          <div>
            <h1>Logged in as {display_name}</h1>
            <img id="avatar" width="200" src={images[0].url} />
            <dl>
              <dt>Display name</dt><dd>{display_name}</dd>
              <dt>Username</dt><dd>{id}</dd>
              <dt>Email</dt><dd>{email}</dd>
              <dt>Spotify URI</dt><dd><a href={external_urls.spotify}>{external_urls.spotify}</a></dd>
              <dt>Link</dt><dd><a href={href}>{href}</a></dd>
              <dt>Profile Image</dt><dd>{images[0].url}</dd>
            </dl>
            <p><a href="/">Log in again</a></p>
          </div>
        }
      </div>
    );
  }
}

export default App;
