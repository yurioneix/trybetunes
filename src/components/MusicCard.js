import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { previewURL, songName } = this.props;
    return (
      <div>
        <p>{songName}</p>
        <audio data-testid="audio-component" src={ previewURL } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewURL: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
};

export default MusicCard;
