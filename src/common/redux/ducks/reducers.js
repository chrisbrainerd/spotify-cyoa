import { combineReducers } from "redux";
// import CONSTANTS from "./constants";
import {
  SPOTIFY_ME_BEGIN,
  SPOTIFY_ME_FAILURE,
  SPOTIFY_ME_SUCCESS,
  SPOTIFY_TOKENS,
  SET_STARTING_ARTIST
}
  from './types';

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  },
  startingArtist: null,
  goalArtist: null,
  history: []
}

const app = (state = initialState, action) => {
  switch (action.type) {
    // when we get the tokens... set the tokens!
    case SPOTIFY_TOKENS:
      const { accessToken, refreshToken } = action;
      return Object.assign({}, state, { accessToken, refreshToken });

    // set our loading property when the loading begins
    case SPOTIFY_ME_BEGIN:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { loading: true })
      });

    // when we get the data merge it in
    case SPOTIFY_ME_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.data, { loading: false })
      });

    // currently no failure state :(
    case SPOTIFY_ME_FAILURE:
      return state;

    case SET_STARTING_ARTIST:
      console.log('setting in reducer', action);
      return Object.assign({}, state, {
        startingArtist: action.startingArtist
      })

    default:
      return state;
  }
}

export default app;