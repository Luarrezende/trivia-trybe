import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <>
        <img
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          data-testid="header-profile-picture"
          alt="profilePicture"
        />
        <p data-testid="header-player-name" />
        <p data-testid="header-score" />
      </>
    );
  }
}
