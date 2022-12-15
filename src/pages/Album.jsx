import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      band: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    console.log(album);

    this.setState({
      artist: album[0].artistName,
      band: album[0].collectionName,
    });
  }

  render() {
    const { artist, band } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <p data-testid="artist-name">{artist}</p>
        <p data-testid="album-name">{band}</p>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
