import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import profileLogo from '../img/🦆 icon _profile_.png';
import trybeTunes from '../img/logo.svg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        loading: false,
        userName: user.name,
      });
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <div className="flex-row">
        {
          loading ? <Loading />
            : (
              <header
                data-testid="header-component"
                className="
                flex justify-between
                h-40 items-center
                p-10
                shadow-lg
                text-lg
                "
              >
                <div className="flex-row">
                  <img src={ profileLogo } alt="Profile logo" />
                  <p
                    data-testid="header-user-name"
                  >
                    {userName}
                  </p>

                </div>
                <div>
                  <img src={ trybeTunes } alt="Trybetunes Logo" />
                </div>
                <nav
                  className="
                  flex
                  w-64
                  justify-around"
                >
                  <ul className="flex justify-between gap-4">
                    <li className=" hover:text-cyan-500">
                      <Link to="/search" data-testid="link-to-search">
                        Busca
                      </Link>
                    </li>
                    <li className=" hover:text-cyan-500">
                      <Link to="/favorites" data-testid="link-to-favorites">
                        Favoritos
                      </Link>
                    </li>
                    <li className=" hover:text-cyan-500">
                      <Link to="/profile" data-testid="link-to-profile">
                        Perfil
                      </Link>
                    </li>
                  </ul>

                </nav>
              </header>
            )
        }
      </div>
    );
  }
}

export default Header;
