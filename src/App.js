import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

export class App extends React.Component {
	render() {
		const { success, guessedWords } = this.props;
		return (
			<div className="container text-center">
				<h1>Jotto</h1>
				<Congrats success={success} />
				<Input />
				<GuessedWords guessedWords={guessedWords} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { guessedWords, success, secretWord } = state;
	return { guessedWords, success, secretWord };
};

export default connect(mapStateToProps, { getSecretWord })(App);
