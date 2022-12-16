import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: false,
      loading: false,
    };
  }

  handleChange = async ({ target }) => {
    const { songData } = this.props;

    this.setState({
      checkbox: target.checked,
      loading: true,
    }, async () => {
      await addSong(songData);
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { previewURL, songName, trackId } = this.props;
    const { checkbox, loading } = this.state;
    return (

      <div>
        { loading ? <Loading />
          : (
            <>
              <p>{songName}</p>
              <audio data-testid="audio-component" src={ previewURL } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>

              <label htmlFor="favoriteSong" data-testid={ `checkbox-music-${trackId}` }>
                {' '}
                Favorita
                <input
                  type="checkbox"
                  id="favoriteSong"
                  onChange={ this.handleChange }
                  checked={ checkbox }
                />
              </label>
            </>
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
