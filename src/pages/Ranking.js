import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  renderResults = () => {
    const localUsers = JSON.parse(localStorage.getItem('usersResults')) || [];

    const orderedUsers = localUsers.sort((a, b) => (b.score - a.score))
      .map((user, index) => (
        <div key={ index + 1 }>
          <img alt="player profile" src={ `https://www.gravatar.com/avatar/${user.gravatarEmail}` } />
          <p data-testid={ `player-name-${index}` }>{ user.name }</p>
          <p data-testid={ `player-score-${index}` }>{ user.score }</p>
        </div>
      ));

    return (
      <div>
        { orderedUsers }
      </div>
    );
  };

  render() {
    this.renderResults();
    return (
      <>
        <title data-testid="ranking-title">Ranking</title>
        <Link to="/">
          <button data-testid="btn-go-home">início</button>
        </Link>
        { this.renderResults() }
      </>
    );
  }
}

export default Ranking;
