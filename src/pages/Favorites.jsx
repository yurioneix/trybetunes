import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: true,
      favoriteSongs: favorites,
    }, () => this.setState({
      loading: false,
    }));
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div>
              <Header />
              <div
                data-testid="page-favorites"
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
                p-20

            "
              >
                <h1>Músicas favoritas ⭐</h1>
              </div>
              {favoriteSongs.map((favoriteSong) => (
                <MusicCard
                  key={ favoriteSong.trackId }
                  previewURL={ favoriteSong.previewUrl }
                  songName={ favoriteSong.trackName }
                  trackId={ favoriteSong.trackId }
                  songData={ favoriteSong }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
