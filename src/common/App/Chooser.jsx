import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import SendIcon from 'material-ui/svg-icons/content/send';
import { AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setStartingArtist
} from '../redux/ducks/actions';

class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandName: '',
      bandId: undefined,
      artists: [],
      artistSearchName: '',
      suggestions: [],
      value: ''
    }
  }

  handleBandNameChange = (e) => {
    this.setState({ bandName: e });
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    };
    fetch(`https://api.spotify.com/v1/search?q=${e}&type=artist`, fetchOptions).then((response) => response.json())
      .then((data) => {
        const artists = data.artists.items.splice(0, 3).map(d => { return ({ name: d.name }) });
        console.log('updating artists');
        this.setState({ artists: artists });
        return artists;
      })
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.handleBandNameChange(inputValue);
  };
  getSuggestionValue = suggestion => suggestion.name;
  renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  loadSuggestions = (value) => {
    console.log('value:', value)
    console.log('access')
    this.setState({ artistSearchName: value, loading: true });
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    };
    fetch(`https://api.spotify.com/v1/search?q=${value}&type=artist`, fetchOptions).then((response) => response.json())
      .then((data) => {
        console.log('data', data)
        const artists = data.artists.items.splice(0, 3).map(d => d.name);
        console.log('updating artists', artists);
        this.setState({ suggestions: artists, loading: false });
        return artists;
      })
  }

  handleSelectBand = (e) => {
    console.log(e);
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    };
    fetch(`https://api.spotify.com/v1/search?q=${e}&type=artist`, fetchOptions).then((response) => response.json())
      .then((data) => {
        const startingArtist = data.artists.items.splice(0, 1).map(d => { return ({ name: d.name, id: d.id }) })[0];
        this.setState({ startingArtist: startingArtist });
        this.props.dispatch(setStartingArtist(startingArtist));
      })
  }

  render() {
    return (
      <div>
        <h4>Enter a band to start with</h4>
        <AutoComplete
          onChange={this.loadSuggestions}
          dataSource={this.state.suggestions}
          placeholder="What band?"
          onSelect={this.handleSelectBand}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { accessToken, user } = state.default;
  return {
    accessToken,
    user
  }
}


export default connect(mapStateToProps, null)(Chooser);