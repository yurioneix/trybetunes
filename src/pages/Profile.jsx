import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const user = await getUser();
    console.log(user);
    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <section
          data-testid="page-favorites"
          className="
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
          <h1 className="text-xxl">Perfil</h1>
        </section>
        <div className="flex justify-center">
          <section
            className="
            flex
            flex-col
            items-center
            text-xl
            mt-20
            border-2
            rounded-xl
            shadow-xl
            bg-stone-100
            w-1/4
            p-20
            "
          >
            <p>
              Foto de perfil:
            </p>
            <img src={ user.image } alt="Profile" />
            <p>
              Usuário:
              {' '}
              {user.name}
            </p>
            <p>
              Email:
              {' '}
              {user.email}
            </p>
          </section>
        </div>
      </div>
    );
  }
}

export default Profile;
