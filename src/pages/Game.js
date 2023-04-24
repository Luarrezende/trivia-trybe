import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { returnTokenLocalStorge } from '../services/token';
import Header from '../components/Header';
import { addAssertions } from '../redux/actions';
import './Game.css';
import AnswerButton from '../components/AnswerButton';

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
  };

  fetchQuestions = async () => {
    const { history } = this.props;

    try {
      const token = returnTokenLocalStorge();
      const { results } = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
      if (results.length === 0) {
        throw new Error('Token inválido!');
      }
      this.setState({ questions: results }, () => this.saveRandomAnswers(0));

      this.saveRandomAnswers(0);
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
    });
  };

  handleAssertions = (param) => {
    const { dispatch } = this.props;
    if (param === 'correto') {
      const number = 1;
      dispatch(addAssertions(number));
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
    const { buttonDisable } = this.state;

    this.randomArray(allAnswers);

    this.setState({
      correctAnswer: question.correct_answer,
      randomAnswers: allAnswers,
    });
  };

  renderQuestion = (index) => {
    const { questions, answeredQuestions, correctAnswer, randomAnswers } = this.state;

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
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, null)(Game);
