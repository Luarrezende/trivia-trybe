import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { returnTokenLocalStorge } from '../services/token';
import Header from '../components/Header';
import { addAssertions, addScorePoints } from '../redux/actions';


class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    await this.fetchQuestions();
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

  answer = (param) => {
    const { dispatch } = this.props;
    if (param === 'correto') {
      const number = 1;
      dispatch(addAssertions(number));
      this.calcPoints();
    } else {
      const number = 0;
      dispatch(addAssertions(number));
    }
  };

  renderQuestion = (index) => {
    const { questions } = this.state;
    const question = questions[index] || {};

    const newArrayIncorrectAnswers = new Set(question.incorrect_answers);
    const incorrectAnswers = [...newArrayIncorrectAnswers];

    const allAnswers = [question.correct_answer, ...incorrectAnswers];

    const answersBtns = allAnswers.map((answer, indexAnswers) => {
      if (indexAnswers === 0) {
        return (
          <button
            key="#"
            data-testid="correct-answer"
            id={ indexAnswers }
            onClick={ () => this.answer('correto') }
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
          onClick={ () => this.answer('errado') }
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

  // esta função está sendo chamada na função answer por enquanto
  calcPoints = () => {
    const { difficulty, dispatch } = this.props;
    const hitValue = 10;
    const timer = 30; // este valor virá do componente timer, ainda não está pronto
    const hard = 3;

    switch (difficulty) {
    case 'easy':
      return dispatch(addScorePoints((hitValue + (timer * 1))));
    case 'medium':
      return dispatch(addScorePoints((hitValue + (timer * 2))));
    case 'hard':
      return dispatch(addScorePoints((hitValue + (timer * hard))));
    default:
      break;
    }
  };

  render() {
    return (
      <main>
        <Header />
        { this.renderQuestion(0) }
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  difficulty: state.player.difficulty,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
