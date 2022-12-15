import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: false,
    };
  }

  handleChange = async ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { songData } = this.props;
    await addSong(songData);

    this.setState({
      checkbox: value,
    });
  };

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
          <input
            type="checkbox"
            id="favoriteSong"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewURL: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
