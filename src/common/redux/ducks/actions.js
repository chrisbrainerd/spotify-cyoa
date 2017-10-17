import { SPOTIFY_ME_BEGIN, SPOTIFY_ME_FAILURE, SPOTIFY_ME_SUCCESS, SPOTIFY_TOKENS, SET_STARTING_ARTIST } from './types';
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

/** set the app's access and refresh tokens */
export function setTokens({ accessToken, refreshToken }) {
  console.log('setting token', accessToken);
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

/* get the user's info from the /me api */
export function getMyInfo() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN });
    spotifyApi.getMe().then(data => {
      console.log(data);
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      console.log(e);
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}

export function setStartingArtist(artist) {
  console.log("trying to set artist to: ", artist)
  return dispatch => {
    dispatch({ type: SET_STARTING_ARTIST, artist })
  }
}