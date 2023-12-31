import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const resultElement = (
      <p className=" mt-5 text-center mb-10 bg-white font-md rounded-md shadow-xl p-2">
        {' '}
        Resultado de álbuns de:
        {' '}
        {resultInput}
      </p>
    );
    const albumNotFound = (
      <p className="text-red-500 bg-white font-md rounded-md shadow-md p-2">
        Nenhum álbum foi encontrado
      </p>);
    return (
      <div data-testid="page-search" className="flex flex-col">
        <Header />
        <div
          className="
            bg-gradient-to-r
          from-indigo-600
          via-blue-500
          to-cyan-500
            min-h-screen
            flex
            flex-col
            items-center
          "
        >
          { loading ? <Loading />
            : (
              <form
                action=""
                className="
                  p-5
                  flex
                  flex-col
                  justify-center
                  items-center
                  gap-2
                  bg-white
                  w-1/6
                  rounded-xl
                  shadow-xl
                  mt-10
                "
              >
                <h1 className="text-center p-5 text-lg mt-10">Pesquisar artista/banda</h1>
                <input
                  type="text"
                  name="inputName"
                  value={ inputName }
                  id="btn-submit"
                  onChange={ this.handleChange }
                  data-testid="search-artist-input"
                  className="border-2 p-3 rounded-lg shadow-sl"
                />
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ isButtonDisabled }
                  onClick={ this.handleButton }
                  className={
                    isButtonDisabled
                      ? `
                    font-sans 
                    border-solid 
                    border-2 
                    border-indigo-6 
                    rounded-xl 
                    p-3 
                    shadow-lg
                    opacity-75
                    `
                      : `
                    font-sans 
                    text-white 
                    border-solid 
                    border-2 
                    bg-indigo-600 
                    rounded-xl 
                    p-3 
                    shadow-lg
                    hover:scale-110
                    `
                  }
                >
                  Pesquisar
                </button>
              </form>
            )}
          { artistLoading && resultElement }
          { resultAlbum
          && (resultAlbum.length >= 1
            ? (
              <ul
                className="
                 p-5
                 grid
                 grid-rows-5
                 grid-flow-col
                 gap-10
                 justify-center
                 border-2
                 border-solid
                 rounded-xl
                 w-3/4
                 bg-white
                 mb-10
                 shadow-xl
                 "
              >
                {
                  resultAlbum
                    .map((album) => (
                      <li key={ album.collectionId } className="hover:scale-110">
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                          className="text-lg hover:text-cyan-500 flex-column"
                        >
                          <img
                            src={ album.artworkUrl100 }
                            alt="Album Cover"
                            className="m-auto"
                          />
                          <p className="text-center">
                            {album.collectionName}
                          </p>
                        </Link>
                      </li>))
                }
              </ul>
            )
            : albumNotFound)}
        </div>

      </div>
    );
  }
}

export default Search;
