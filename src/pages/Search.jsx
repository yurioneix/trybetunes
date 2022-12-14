import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: true,
      inputName: '',
      loading: false,
      resultAlbum: [],
      resultInput: '',
    };
  }

  handleChange = ({ target }) => {
    const minLength = 2;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isButtonDisabled: (value.length < minLength),
      [name]: value,
    });
  };

  handleButton = (event) => {
    event.preventDefault();

    const { inputName } = this.state;

    this.setState({
      resultInput: inputName,
      inputName: '',
      loading: true,
      artistLoading: false,
    }, async () => {
      const searchAlbum = await searchAlbumsAPI(inputName);
      this.setState({
        resultAlbum: searchAlbum,
        loading: false,
        artistLoading: true,
      }, () => {

      });
    });
  };

  render() {
    const {
      isButtonDisabled, inputName, loading, resultAlbum, artistLoading, resultInput } = this.state;
    const resultElement = `Resultado de álbuns de: ${resultInput}`;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        { loading ? <Loading />
          : (
            <form action="">
              <input
                type="text"
                name="inputName"
                value={ inputName }
                id="btn-submit"
                onChange={ this.handleChange }
                data-testid="search-artist-input"
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.handleButton }
              >
                Pesquisar
              </button>
            </form>
          )}
        { artistLoading && resultElement }
      </div>
    );
  }
}

export default Search;
