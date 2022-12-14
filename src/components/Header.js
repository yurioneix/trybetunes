import React, { Component } from 'react';
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
                  Header
                </p>

              </header>
            )
        }
      </div>
    );
  }
}

export default Header;
