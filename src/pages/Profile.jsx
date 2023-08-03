import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const user = await getUser();
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
          <h1 className="text-2xl text-center">Perfil</h1>
        </section>
        <div className="flex justify-center">
          <section
            className="
            flex
            flex-col
            items-center
            text-xl
            mt-10
            border-2
            rounded-xl
            shadow-xl
            bg-stone-100
            w-1/4
            p-10
            "
          >
            <img src={ user.image } alt="Profile" className="rounded-full p-2 mb-2" />
            <section className="flex flex-col items-center gap-2">
              <p>
                Usuário:
                {' '}
                {user.name}
              </p>
              <hr className="border-1 border-solid border-stone-300 w-1/2" />
              <p>
                Email:
                {' '}
                {user.email}
              </p>
              <hr className="border-1 border-solid border-stone-300 w-1/2" />
              <p>
                Gênero favorito:
                {' '}
                {user.description}
              </p>
              <hr className="border-1 border-solid border-stone-300 w-1/2" />
            </section>

          </section>
        </div>
      </div>
    );
  }
}

export default Profile;
