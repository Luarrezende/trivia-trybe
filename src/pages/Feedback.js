import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { score } = this.props;
    return (
      <main>
        <div data-testid="feedback-total-score">
          <h2>Total Score</h2>
          <p data-testid="feedback-total-question">{ score }</p>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
