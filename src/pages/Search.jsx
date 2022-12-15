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
      resultInput: '',
      resultAlbum: false,
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
      isButtonDisabled: true,
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
      });
    });
  };

  render() {
    const {
      isButtonDisabled,
      inputName,
      loading,
      resultAlbum,
      artistLoading,
      resultInput,
    } = this.state;
    const resultElement = `Resultado de álbuns de: ${resultInput}`;
    const albumNotFound = (
      <p>
        Nenhum álbum foi encontrado
      </p>);
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
        { resultAlbum
          && (resultAlbum.length >= 1
            ? (
              <ul>
                {resultAlbum
                  .map((album) => (
                    <li key={ album.collectionName }>
                      {album.collectionName}
                    </li>))}
              </ul>
            )
            : albumNotFound)}

      </div>
    );
  }
}

export default Search;
