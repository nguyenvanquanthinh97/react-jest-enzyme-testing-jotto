import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Congrats from './Congrats';
import Fails from './Fails';
import GuessedWords from './GuessedWords';
import Input from './Input';
import ResetButton from './ResetButton';
import { getSecretWord } from './actions';

export class UnconnectedApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isGiveUp: false, isUserFriendlyMode: false, userSecretWord: '' };
	}

	componentDidMount() {
		this.props.getSecretWord();
	}

	resetHandler = () => {
		this.props.getSecretWord();
		this.setState({ isGiveUp: false });
	};

	onUserSecretWordSubmitClick = (e) => {
		e.preventDefault();
		this.props.getSecretWord(this.state.userSecretWord);
		this.setState({ isUserFriendlyMode: false, userSecretWord: '' });
	};

	render() {
		const { isGiveUp, isUserFriendlyMode, userSecretWord } = this.state;
		const { success, guessedWords, secretWord, error } = this.props;
		const content = isUserFriendlyMode ? (
			<React.Fragment>
				<form
					onSubmit={this.onUserSecretWordSubmitClick}
					data-test="user-challenge-form"
					className="form-inline"
				>
					<input
						value={userSecretWord}
						onChange={(e) => this.setState({ userSecretWord: e.target.value })}
						data-test="input-box"
						className="mb-2 mx-sm-3"
						type="text"
						placeholder="enter secret word"
					/>
					<button data-test="submit-button" className="btn btn-primary mb-2" type="submit">
						Submit
					</button>
				</form>
			</React.Fragment>
		) : (
			<React.Fragment>
				<Congrats success={success} />
				{!success && isGiveUp && <Fails isGiveUp={isGiveUp} secretWord={secretWord} resetHandler={this.resetHandler} />}
				{success && <ResetButton resetHandler={this.resetHandler} />}
				{!isGiveUp && <Input giveUpHandler={() => this.setState({ isGiveUp: true })} />}
				<GuessedWords guessedWords={guessedWords} />
				<button onClick={() => this.setState({ isUserFriendlyMode: true })} className="btn btn-primary">
					Enter your own secret word
				</button>
			</React.Fragment>
		);
		return error.isError ? (
			<div className="alert alert-danger text-center">{error.message}</div>
		) : (
			<div className="container text-center">
				<h1>Jotto</h1>
				<div>The secret word is {secretWord}</div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { guessedWords, success, secretWord, error } = state;
	return { guessedWords, success, secretWord, error };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
