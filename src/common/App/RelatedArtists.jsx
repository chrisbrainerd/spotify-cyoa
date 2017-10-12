import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class Related extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedArtists: []
    }
  }

  componentDidMount() {
    this.updateRelatedArtists(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.updateRelatedArtists(nextProps);
  }

  updateRelatedArtists = (props) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + props.access_token
      }
    };
    fetch(`https://api.spotify.com/v1/artists/${props.currentArtist.id}/related-artists`, fetchOptions).then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ relatedArtists: data.artists });
      })
  }

  updateArtist = (artist) => {
    this.props.updateParentState({ currentArtist: artist })
  }

  render() {
    const { startingArtist, relatedArtists } = this.state;
    const { currentArtist } = this.props;
    return (
      <div>
        {currentArtist && <h2>{currentArtist.name}</h2>}
        <h4>Related Bands:</h4>
        <ul id='band-list'>
          {relatedArtists.map(artist =>
            <li key={artist.id} onClick={() => this.updateArtist(artist)}>
              <h4>{artist.name}</h4>
              <img width="200" src={artist.images[0].url} />
            </li>
          )}
        </ul>
      </div>
    )
  }
}
