import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

export class UnconnectedApp extends React.Component {
	componentDidMount() {
		this.props.getSecretWord();
	}
	render() {
		const { success, guessedWords, secretWord } = this.props;
		return (
			<div className="container text-center">
				<h1>Jotto</h1>
				<div>The secret word is {secretWord}</div>
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

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
