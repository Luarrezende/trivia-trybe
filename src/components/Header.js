import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player, score, email } = this.props;
    const imgEmail = md5(email).toString();
    return (
      <>
        <img
          src={ `https://www.gravatar.com/avatar/${imgEmail}` }
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
  email: state.player.email,
});

Header.propTypes = {
  player: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
