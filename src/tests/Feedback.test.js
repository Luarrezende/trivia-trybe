import React from "react";
import { render, screen } from "@testing-library/react";
import Feedback from "../pages/Feedback";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);
const initialState = {
  player:{
    score: 8,
    assertions: 3,
  },
};
const store = mockStore(initialState);

describe('Teste a tela de Feedback;', () => {
  test('Verifica se renderiza o Feedback component', () => {
   render(
    <Provider store={store}>
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    </Provider>
   );

   const totalScore = screen.getByTestId('feedback-total-score');
   expect(totalScore).toBeInTheDocument();

   const totalQuestion = screen.getByTestId('feedback-total-question');
   expect(totalQuestion).toBeInTheDocument();

   const feedbackText = screen.getByTestId('feedback-text');
   expect(feedbackText).toBeInTheDocument();

   const playAgainButton = screen.getByTestId('btn-play-again');
   expect(playAgainButton).toBeInTheDocument();

   const rankingButton = screen.getByTestId('btn-ranking');
   expect(rankingButton).toBeInTheDocument();
  });
  test('Verifica se o componente Feedback é renderizado com os diferentes scores e respostas corretas;', () => {
    const newScore = 10;
    const newAssertions = 5;
    const newState = {
      player: {
        score: newScore,
        assertions: newAssertions,
      },
    };
    const newStore = mockStore(newState);
    render(
      <Provider store={newStore}>
        <MemoryRouter>
          <Feedback />
        </MemoryRouter>
      </Provider>,
    );

    const totalScore = screen.getByTestId('feedback-total-score');
   expect(totalScore).toHaveTextContent(newScore.toString());

   const totalQuestion = screen.getByTestId('feedback-total-question');
   expect(totalQuestion).toHaveTextContent(newAssertions.toString());

   const feedbackText = screen.getByTestId('feedback-text');
   expect(feedbackText).toHaveTextContent('Well Done!');
  })
});