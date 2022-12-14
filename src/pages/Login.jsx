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
    console.log('constructor');
  }

  // componentDidMount() {
  //   const { inputName, loading } = this.state;
  //   console.log('didMount');
  //   console.log(`loading antes do request ${loading}`);
  //   this.setState({ loading: false }, async () => {
  //     const request = createUser({ name: inputName });
  //     console.log(request);
  //   });
  //   console.log(`loading depois do request ${loading}`);
  // }

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
  //   this.setState({ loading: true });

  //   // const { inputName, loading } = this.state;

  //   // try {
  //   //   console.log(`loading antes do request ${loading}`);
  //   //   const request = await createUser({ name: inputName });
  //   //   if (request === 'OK') {
  //   //     this.setState({ loading: true });
  //   //   }
  //   //   console.log(request);
  //   //   console.log(`loading depois do request ${loading}`);
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  render() {
    console.log('render');
    const { isButtonDisabled, inputName, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading />
          : (
            <form>
              <h1>Login</h1>
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
                name="inputName"
                value={ inputName }
              />
              <button
                disabled={ isButtonDisabled }
                type="submit"
                data-testid="login-submit-button"
                onClick={ this.handleButton }
              >
                Entrar
              </button>
              {/* <div>
            { loading ? <Loading /> : <Redirect to="/search" />}
          </div> */}
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
