import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    isButtonDisabled: true,
    name: '',
  };

  handleChange = ({ target }) => {
    const minLength = 3;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isButtonDisabled: (value.length < minLength),
      [name]: value,
    });
  };

  render() {
    const { isButtonDisabled, name } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.handleChange }
          name="name"
          value={ name }
        />
        <button
          disabled={ isButtonDisabled }
          type="button"
          data-testid="login-submit-button"
          onClick={ () => createUser({ name }) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
