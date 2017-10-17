import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMyInfo,
  setTokens,
} from '../redux/ducks/actions';
import { Table } from 'reactbulma'
import {
  Link
} from 'react-router-dom'
/**
 * Our user page
 * Displays the user's information
 */
class User extends Component {
  /** When we mount, get the tokens from react-router and initiate loading the info */
  componentDidMount() {
    console.log('user mounted');
    // params injected via react-router, dispatch injected via connect
    const { dispatch } = this.props;
    const { accessToken, refreshToken } = this.props.match.params;
    dispatch(setTokens({ accessToken, refreshToken }));
    dispatch(getMyInfo());
  }

  /** Render the user's info */
  render() {
    const { accessToken, refreshToken, user } = this.props;
    console.log(this.props);
    if (!user) return <div>no user found :(</div>;
    const { loading, display_name, images, id, email, external_urls, href, country, product } = user;
    const imageUrl = images[0] ? images[0].url : "";
    // if we're still loading, indicate such
    if (loading) {
      return <h2>Loading...</h2>;
    }
    return (
      <div className="user">
        <h2>{`Logged in as ${display_name}`}</h2>
        <div className="user-content">
          <img src={imageUrl} />
          <Table>
            <Table.Body>
              <Table.Tr><Table.Td>Display name: </Table.Td><Table.Td>{display_name}</Table.Td></Table.Tr>
              <Table.Tr><Table.Td>Id: </Table.Td><Table.Td>{id}</Table.Td></Table.Tr>
              <Table.Tr><Table.Td>Email: </Table.Td><Table.Td>{email}</Table.Td></Table.Tr>
              <Table.Tr><Table.Td>Spotify URI: </Table.Td><Table.Td><a href={external_urls.spotify}>{external_urls.spotify}</a></Table.Td></Table.Tr>
              <Table.Tr><Table.Td>Link: </Table.Td><Table.Td><a href={href}>{href}</a></Table.Td></Table.Tr>
              <Table.Tr><Table.Td>Profile Image: </Table.Td><Table.Td><a href={imageUrl}>{imageUrl}</a></Table.Td></Table.Tr>
              <Table.Tr><Table.Td>Country: </Table.Td><Table.Td>{country}</Table.Td></Table.Tr>
              <Table.Tr><Table.Td>Product: </Table.Td><Table.Td>{product}</Table.Td></Table.Tr>
            </Table.Body>
          </Table>
        </div>
        <Link to='/Game'>Start!</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.default.user };
}

export default connect(mapStateToProps, null)(User);