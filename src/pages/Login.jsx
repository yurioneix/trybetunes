import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: true,
      inputName: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const minLength = 3;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isButtonDisabled: (value.length < minLength),
      [name]: value,
    });
  };

  handleButton = async (event) => {
    event.preventDefault();
    const { history } = this.props;

    const { inputName } = this.state;

    this.setState({ loading: true });
    await createUser({ name: inputName });
    history.push('/search');
  };

  render() {
    const { isButtonDisabled, inputName, loading } = this.state;
    return (
      <div
        data-testid="page-login"
        className="border-solid border-2 border-red-600 p-10"
      >
        { loading ? <Loading />
          : (
            <form className="container p-10 border-2 border-blue-600 p-2">
              <h1>Login</h1>
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
                name="inputName"
                value={ inputName }
                placeholder="Email"
                className="flex border-b-2"
              />
              <button
                disabled={ isButtonDisabled }
                type="submit"
                data-testid="login-submit-button"
                onClick={ this.handleButton }
                className="border-solid border-2 border-indigo-600 rounded-xl p-2"
              >
                Entrar
              </button>
            </form>)}
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
