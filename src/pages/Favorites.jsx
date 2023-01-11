import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    await getFavoriteSongs();

    this.setState({
      loading: true,
    });
  }

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>FAvorites</h1>
      </div>
    );
  }
}

export default Favorites;
