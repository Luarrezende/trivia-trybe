import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { clearInfos } from '../redux/actions';

class Feedback extends Component {
  handlePlayAgain = () => {
    const { dispatch } = this.props;
    dispatch(clearInfos());
    localStorage.removeItem('token');
  };

  render() {
    const validateScore = 3;
    const { assertions, score } = this.props;
    return (
      <main>
        <Header />
        <div data-testid="feedback-total-score">
          <p>{ score }</p>
        </div>
        <div data-testid="feedback-total-question">
          <p>{ assertions }</p>
        </div>
        {
          assertions >= validateScore
            ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>
        }
        <Link to="/">
          <button
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgain }
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            onClick={ this.handlePlayAgain }
          >
            Ranking
          </button>
        </Link>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
