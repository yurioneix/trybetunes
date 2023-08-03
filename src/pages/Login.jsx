/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../img/logo.svg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: true,
      inputName: '',
      inputEmail: '',
      inputImage: '',
      inputFavoriteGender: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const minLength = 3;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isButtonDisabled: value.length < minLength,
      [name]: value,
    });
  };

  handleButton = async (event) => {
    event.preventDefault();
    const { history } = this.props;

    const { inputName, inputEmail, inputImage, inputFavoriteGender } = this.state;

    this.setState({ loading: true });
    await createUser({
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputFavoriteGender,
    });
    history.push('/search');
  };

  render() {
    const { isButtonDisabled, inputName, inputEmail, inputImage, inputFavoriteGender, loading } = this.state;
    return (
      <div
        data-testid="page-login"
        className="
         bg-gradient-to-r
       from-indigo-600
       to-cyan-500
         min-h-screen
         flex
         items-center
         justify-center"
      >
        {loading ? (
          <Loading />
        ) : (
          <form
            className="
            bg-white p-20 rounded-2xl shadow-lg text-center flex flex-col"
          >
            <img src={ logo } alt="Trybetunes Logo" className="p-10 m-auto mb-2" />
            <h1 className="mb-2 text-lg ">Dados de perfil</h1>
            <label htmlFor="name">
              <input
                id="name"
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
                name="inputName"
                value={ inputName }
                placeholder="Nome (mínimo 3 caracteres)"
                className="border-b-2 p-2 mb-2"
              />

            </label>
            <label htmlFor="email">
              <input
                id="email"
                type="email"
                onChange={ this.handleChange }
                name="inputEmail"
                value={ inputEmail }
                placeholder="Email"
                className="border-b-2 p-2 mb-2"
              />
            </label>
            <label htmlFor="image">
              <input
                id="image"
                type="text"
                onChange={ this.handleChange }
                name="inputImage"
                value={ inputImage }
                placeholder="Foto de perfil (URL)"
                className="border-b-2 p-2 mb-2"
              />
            </label>
            <label htmlFor="favoriteGender">
              <input
                id="favoriteGender"
                type="text"
                onChange={ this.handleChange }
                name="inputFavoriteGender"
                value={ inputFavoriteGender }
                placeholder="Gênero musical favorito"
                className="border-b-2 p-2 mb-2"
              />
            </label>
            <button
              disabled={ isButtonDisabled }
              type="submit"
              data-testid="login-submit-button"
              onClick={ this.handleButton }
              className={
                isButtonDisabled
                  ? 'font-sans flex m-auto border-solid border-2 border-indigo-6 rounded-xl p-5 shadow-lg'
                  : 'font-sans text-white border-solid border-2 flex m-auto bg-indigo-600 rounded-xl p-5 shadow-lg'
              }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
