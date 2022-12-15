import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      band: '',
      musics: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);

    this.setState({
      artist: album[0]?.artistName,
      band: album[0]?.collectionName,
      musics: album.filter((music) => music.trackId),
    });
  }

  render() {
    const { artist, band, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <p data-testid="artist-name">{artist}</p>
        <p data-testid="album-name">{band}</p>
        { musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            previewURL={ music.previewUrl }
            songName={ music.trackName }
            trackId={ music.trackId }
          />
        ))}
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
