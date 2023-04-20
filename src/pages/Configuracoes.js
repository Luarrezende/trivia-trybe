import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveDifficulty } from '../redux/actions';

class Configuracoes extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>

        <select onChange={ ({ target }) => dispatch(saveDifficulty(target.value)) }>
          <option value="easy">Easy</option>

          <option value="medium">Medium</option>

          <option value="hard">Hard</option>
        </select>
      </div>
    );
  }
}

Configuracoes.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Configuracoes);
