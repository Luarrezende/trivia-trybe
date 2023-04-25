import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { returnTokenLocalStorge } from '../services/token';
import Header from '../components/Header';
import { addAssertions, addScore } from '../redux/actions';
import './Game.css';
import AnswerButton from '../components/AnswerButton';
import { setUsersLocalStorage } from '../services/saveUserLocalStorage';

let counter = 0;

class Game extends Component {
  state = {
    questions: [],
    buttonDisable: false,
    timer: 30,
    correctAnswer: '',
    randomAnswers: [],
    answeredQuestions: false,
  };

  async componentDidMount() {
    await this.fetchQuestions();
    this.timerDecrement();
  }

  savePlayerInfosLocalStorage = () => {
    const { gravatarEmail, score, name } = this.props;
    const userResults = {
      gravatarEmail,
      score,
      name,
    };
    setUsersLocalStorage(userResults);
  };

  newFetch = async () => {
    const { history } = this.props;
    const number5 = 5;
    counter += 1;
    if (counter >= number5) {
      history.push('/feedback');
      counter = 0;
      this.savePlayerInfosLocalStorage();
    } else {
      this.setState({
        answeredQuestions: false,
        buttonDisable: false,
        timer: 30,
      }, this.saveRandomAnswers(counter));
    }
  };

  fetchQuestions = async () => {
    const { history } = this.props;

    try {
      const token = returnTokenLocalStorge();
      const { results } = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
      if (results.length === 0) {
        throw new Error('Token inválido!');
      }
      this.setState({ questions: results }, () => this.saveRandomAnswers(counter));

      /* this.saveRandomAnswers(counter); */
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

  handleClass = () => {
    this.setState({
      answeredQuestions: true,
      buttonDisable: true,
    });
  };

  handleAssertions = (param) => {
    const { dispatch } = this.props;
    if (param === 'correto') {
      const number1 = 1;
      dispatch(addAssertions(number1));
      this.calcPoints();
      this.handleClass();
    } else {
      const number = 0;
      dispatch(addAssertions(number));
      this.handleClass();
    }
  };

  // esta funão usa um algoritimo chamado Fisher-Yates, encontrei aqui (https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/)
  randomArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  saveRandomAnswers = (index) => {
    const { questions } = this.state;
    const question = questions[index] || {};

    const newArrayIncorrectAnswers = new Set(question.incorrect_answers);
    const incorrectAnswers = [...newArrayIncorrectAnswers];

    const allAnswers = [question.correct_answer, ...incorrectAnswers];

    this.randomArray(allAnswers);

    this.setState({
      correctAnswer: question.correct_answer,
      randomAnswers: allAnswers,
    });
  };

  renderQuestion = (index) => {
    const {
      questions,
      answeredQuestions,
      correctAnswer,
      randomAnswers,
      buttonDisable } = this.state;

    const question = questions[index] || {};

    const answersBtns = randomAnswers.map((answer, indexAnswers) => {
      if (answer === correctAnswer) {
        return (
          <AnswerButton
            key="#"
            answer={ answer }
            indexAnswer={ indexAnswers }
            dataTestId="correct-answer"
            answeredQuestions={ answeredQuestions }
            handleAssertions={ this.handleAssertions }
            handleAssertionsParam="correto"
            className="correct-answer"
            disabled={ buttonDisable }
          />
        );
      }
      return (
        <AnswerButton
          key={ indexAnswers }
          answer={ answer }
          indexAnswer={ indexAnswers }
          dataTestId={ `wrong-answer-${indexAnswers - 1}` }
          answeredQuestions={ answeredQuestions }
          handleAssertions={ this.handleAssertions }
          handleAssertionsParam="errado"
          className="wrong-answer"
          disabled={ buttonDisable }
        />
      );
    });

    return (
      <div>
        <h1 data-testid="question-category">{ question.category }</h1>

        <h2 data-testid="question-text">{ question.question }</h2>

        <div data-testid="answer-options" className="btns">
          { answersBtns }
        </div>
      </div>
    );
  };

  // esta função está sendo chamada na função answer por enquanto
  calcPoints = () => {
    const { timer } = this.state;
    const { difficulty, dispatch } = this.props;
    const hitValue = 10;
    const hard = 3;

    switch (difficulty) {
    case 'easy':
      return dispatch(addScore((hitValue + (timer * 1))));
    case 'medium':
      return dispatch(addScore((hitValue + (timer * 2))));
    case 'hard':
      return dispatch(addScore((hitValue + (timer * hard))));
    default:
      break;
    }
  };

  render() {
    const { timer, answeredQuestions } = this.state;
    return (
      <>
        <main>
          <Header />
          { this.renderQuestion(counter) }
        </main>
        {
          answeredQuestions === true || timer === 0
            ? <button data-testid="btn-next" onClick={ this.newFetch }>Next</button>
            : <div>{ timer }</div>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  difficulty: state.player.difficulty,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  name: state.player.name,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
