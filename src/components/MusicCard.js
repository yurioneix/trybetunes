import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    checkbox: false,
    loading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();

    this.setState({
      checkbox: favorites.some((song) => song.trackId === trackId),
    });
  }

  handleChange = ({ target }) => {
    const value = target.checked;
    const { songData } = this.props;

    this.setState({
      checkbox: value,
      loading: true,
    }, async () => {
      await addSong(songData);
      this.setState({
        loading: false,
      });
      if (!value) {
        await removeSong(songData);
      }
    });
  };

  render() {
    const { previewURL, songName, trackId } = this.props;
    const { checkbox, loading } = this.state;
    return (
      <div
        className="
        flex
        items-center
        justify-center
        gap-10
        mt-10
        "
      >
        { loading ? <Loading />
          : (
            <div
              className="
            p-50
            "
            >
              <p className="max-w-sl text-center">{songName}</p>
              <audio
                data-testid="audio-component"
                src={ previewURL }
                controls
                className="m-auto"
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favoriteSong" className="flex justify-center gap-2">
                {' '}
                Favorita
                <input
                  type="checkbox"
                  id="favoriteSong"
                  onChange={ this.handleChange }
                  checked={ checkbox }
                  data-testid={ `checkbox-music-${trackId}` }
                />
              </label>
              <hr className="border-1 border-solid border-stone-200 max-w-md mt-5" />
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewURL: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  songData: PropTypes.shape({}).isRequired,
};

export default MusicCard;
