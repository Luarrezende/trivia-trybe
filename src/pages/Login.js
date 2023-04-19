import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveTokenInLocalStorage } from '../services/token';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    saveTokenInLocalStorage();
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { name, email } = this.state;
    return (
      <form>
        <div>Login</div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          placeholder="name"
          required
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          placeholder="email"
          required
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email || !name }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/configuracoes') }

        >

          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
