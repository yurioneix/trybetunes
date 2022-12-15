import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { previewURL, songName, trackId } = this.props;
    return (
      <div>
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
          <input type="checkbox" id="favoriteSong" />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewURL: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
