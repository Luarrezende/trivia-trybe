import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Login } />
      <Route exact path="/configuracoes" component={ Configuracoes } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/feedback" component={ Feedback } />
    </div>
  );
}
