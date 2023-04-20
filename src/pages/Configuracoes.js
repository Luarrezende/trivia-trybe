import React, { Component } from 'react';

class Configuracoes extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <select>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
    );
  }
}

export default Configuracoes;
