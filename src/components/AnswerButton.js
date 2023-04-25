import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerButton extends Component {
  render() {
    const {
      answer,
      indexAnswer,
      dataTestId,
      answeredQuestions,
      handleAssertions,
      handleAssertionsParam,
      className,
      disabled,
    } = this.props;

    return (
      <button
        type="button"
        id={ indexAnswer }
        data-testid={ dataTestId }
        className={ answeredQuestions ? className : '' }
        onClick={ () => handleAssertions(handleAssertionsParam) }
        disabled={ disabled }
      >
        { answer }

      </button>
    );
  }
}

AnswerButton.propTypes = {
  answer: PropTypes.shape().isRequired,
  indexAnswer: PropTypes.number.isRequired,
  dataTestId: PropTypes.string.isRequired,
  answeredQuestions: PropTypes.bool.isRequired,
  handleAssertions: PropTypes.func.isRequired,
  handleAssertionsParam: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default AnswerButton;
