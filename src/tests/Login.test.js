import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import App from '../App';
import Login from "../pages/Login";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Teste a página Login', () => {
  test('Verifica se os dois inputs são renderizados na tela', () => {
    renderWithRouterAndRedux(<Login />)

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email')

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });
  test('Verifica se o botão "play" é renderizado na tela', () => {
    renderWithRouterAndRedux(<Login />)

    const playButton = screen.getByTestId('btn-play');

    expect(playButton).toBeInTheDocument();
  });
  test('Verifica se o estado é atualizado quando o nome é preenchido', () => {
    renderWithRouterAndRedux(<Login />)

    const inputName = screen.getByTestId('input-player-name');

    fireEvent.change(inputName, { target: { value: 'Julia' } });

    expect(inputName).toHaveValue('Julia');
  });
  test('Verifica se o estado é atualizado quando o email é preenchido', () => {
    renderWithRouterAndRedux(<Login />)

    const inputemail = screen.getByTestId('input-gravatar-email');

    fireEvent.change(inputemail, { target: { value: 'test@test.com' } });

    expect(inputemail).toHaveValue('test@test.com');
  });
  test('Verifica se o botão é desabilitado quando o nome ou o email não é preenchido', () => {
    renderWithRouterAndRedux(<Login />)

    const inputemail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const playButton = screen.getByTestId('btn-play');

    fireEvent.change(inputName, { target: { value: 'Julia' } });

    expect(playButton).toBeDisabled();

    fireEvent.change(inputName, { target: { value: '' } });
    fireEvent.change(inputemail, { target: { value: 'test@test.com' } });

    expect(playButton).toBeDisabled();
  });
  test('Verifica se o botão "play" envia as informações para /game', () => {
    const { history } = renderWithRouterAndRedux(<App />);
 
    const inputemail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    fireEvent.change(inputName, { target: { value: 'Julia' } });
    fireEvent.change(inputemail, { target: { value: 'test@test.com' } });

    const playButton = screen.getByTestId('btn-play');

    userEvent.click(playButton);

    act(() => {
      history.push('/game');
    });

    expect(history.location.pathname).toMatch('/game');  
  });
  test('Verifica se o botão "configurações" vai para a rota /configuracoes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const configButton = screen.getByTestId('btn-settings');

    userEvent.click(configButton);

    act(() => {
      history.push('/configuracoes');
    });

    expect(history.location.pathname).toMatch('/configuracoes')
  })
})