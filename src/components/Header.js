import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
      <div>
        {
          loading ? <Loading />
            : (
              <header data-testid="header-component">
                <p
                  data-testid="header-user-name"
                >
                  {userName}
                </p>
                <nav>
                  <ul>
                    <li>
                      <Link to="/search" data-testid="link-to-search">
                        Busca
                      </Link>
                    </li>
                    <li>
                      <Link to="/favorites" data-testid="link-to-favorites">
                        Favoritos
                      </Link>
                    </li>
                    <li>
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
