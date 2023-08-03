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
        <div
          className="
          flex flex-col
          items-center
          text-xl
          bg-gradient-to-r
          from-indigo-600
          via-blue-500
          to-cyan-500
          text-white
          gap-3
          p-10
          "
        >
          <h1 data-testid="artist-name">{artist}</h1>
          <div className="bg-white rounded-sm p-10 shadow-xl">
            <img src={ musics[0]?.artworkUrl100 } alt="Album Cover" />
          </div>
          <p data-testid="album-name">{band}</p>
        </div>
        { musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            previewURL={ music.previewUrl }
            songName={ music.trackName }
            trackId={ music.trackId }
            songData={ music }
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
