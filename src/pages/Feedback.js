import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const validateScore = 3;
    const { assertions, score } = this.props;
    return (
      <main>
        <Header />
        <div data-testid="feedback-total-score">
          <h2>Total Score</h2>
          <p data-testid="feedback-total-question">{ score }</p>
        </div>
        {
          assertions >= validateScore
            ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>
        }
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
};

export default connect(mapStateToProps)(Feedback);
