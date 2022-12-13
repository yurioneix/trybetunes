import React, { Component } from 'react';

class Login extends Component {
  state = {
    isButtonDisabled: true,
    inputName: '',
  };

  handleInput = ({ target }) => {
    const inputValue = target.value;
    console.log(inputValue);
    const minLength = 3;

    this.setState({
      isButtonDisabled: (inputValue.length < minLength),
    });
  };

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.handleInput }
        />
        <button
          disabled={ isButtonDisabled }
          type="button"
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
