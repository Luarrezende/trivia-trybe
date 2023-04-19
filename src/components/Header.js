import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { player, score } = this.props;
    return (
      <>
        <img
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          data-testid="header-profile-picture"
          alt="profilePicture"
        />
        <p data-testid="header-player-name">{ player }</p>
        <p data-testid="header-score">{ score }</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player.player,
  score: state.player.score,
});

Header.propTypes = {
  player: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
