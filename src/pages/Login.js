import React, { Component } from 'react';

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

  render() {
    const { name, email } = this.state;
    return (
      <>
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
          data-testid="btn-play"
          disabled={ !email || !name }
        >
          Play
        </button>
      </>
    );
  }
}
