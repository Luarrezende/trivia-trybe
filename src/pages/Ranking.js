import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <>
        <title data-testid="ranking-title">Ranking</title>
        <Link to="/">
          <button data-testid="btn-go-home">início</button>
        </Link>
      </>
    );
  }
}
