import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import SendIcon from 'material-ui/svg-icons/content/send';
import AutoComplete from 'material-ui/AutoComplete';

export default class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandName: '',
      bandId: undefined,
      artists: []
    }
  }

  handleBandNameChange = e => {
    this.setState({ bandName: e });
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.access_token
      }
    };
    fetch(`https://api.spotify.com/v1/search?q=${e}&type=artist`, fetchOptions).then((response) => response.json())
      .then((data) => {
        const artists = data.artists.items.splice(0, 3).map(d => { return ({ name: d.name }) });
        console.log('updating artists');
        this.setState({ artists: artists });
      })
  }

  handleSelectBand = (e) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.access_token
      }
    };
    fetch(`https://api.spotify.com/v1/search?q=${e}&type=artist`, fetchOptions).then((response) => response.json())
      .then((data) => {
        const startingArtist = data.artists.items.splice(0, 1).map(d => { return ({ name: d.name, id: d.id }) })[0];
        console.log('updating artists');
        this.setState({ startingArtist: startingArtist });
        this.props.updateParentState({ startingArtist: startingArtist, currentArtist: startingArtist })
      })


  }

  render() {
    return (
      <div>
        <h4>Enter a band to start with</h4>
        <AutoComplete
          hintText="Dashboard Confessional"
          floatingLabelText="Band name"
          dataSource={this.state.artists.map(d => d.name)}
          onUpdateInput={this.handleBandNameChange}
          maxSearchResults={3}
          filter={() => true}
          onNewRequest={this.handleSelectBand}

        />
        <FlatButton
          label="Look them up!"
          labelPosition="before"
          primary={true}
          icon={<SendIcon />}
          onClick={this.findBand}
        />

      </div>
    )
  }
}
