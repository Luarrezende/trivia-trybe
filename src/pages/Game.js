import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { returnTokenLocalStorge } from '../services/token';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    questions: [],
    buttonDisable: false,
    timer: 30,
  };

  async componentDidMount() {
    await this.fetchQuestions();
    this.timerDecrement();
  }

  fetchQuestions = async () => {
    const { history } = this.props;

    try {
      const token = returnTokenLocalStorge();
      const { results } = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
      if (results.length === 0) {
        throw new Error('Token inválido!');
      }
      this.setState({ questions: results });
    } catch (error) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  timerDecrement = () => {
    const time = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval();
        this.setState({ buttonDisable: true });
      } else {
        this.setState({
          timer: timer - 1,
        });
      }
    }, time);
  };

  renderQuestion = (index) => {
    const { questions } = this.state;
    const question = questions[index] || {};

    const newArrayIncorrectAnswers = new Set(question.incorrect_answers);
    const incorrectAnswers = [...newArrayIncorrectAnswers];
    const allAnswers = [question.correct_answer, ...incorrectAnswers];
    const { buttonDisable } = this.state;

    const answersBtns = allAnswers.map((answer, indexAnswers) => {
      if (indexAnswers === 0) {
        return (
          <button
            key="#"
            data-testid="correct-answer"
            id={ indexAnswers }
            disabled={ buttonDisable }
          >
            {answer}
          </button>
        );
      }
      return (
        <button
          key={ indexAnswers }
          data-testid={ `wrong-answer-${indexAnswers - 1}` }
          id={ indexAnswers }
          disabled={ buttonDisable }
        >
          {answer}
        </button>
      );
    });
    const matchRandomParamNumber = 0.5;
    return (
      <div>
        <h1 data-testid="question-category">{ question.category }</h1>
        <h2 data-testid="question-text">{ question.question }</h2>
        <div data-testid="answer-options">
          { answersBtns.sort(() => Math.random() - matchRandomParamNumber) }
        </div>
      </div>
    );
  };

  render() {
    const { timer } = this.state;
    return (
      <>
        <main>
          <Header />
          { this.renderQuestion(0) }
        </main>
        <div>
          { timer }
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
