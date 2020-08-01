import React from 'react';
import { connect } from 'react-redux';

import { guessWord, getSecretWord } from './actions';

export class UnconnectedInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentGuess: '' };
	}

	onSubmitHandler = (e) => {
		//prevent refresh browser
		e.preventDefault();

		if (this.state.currentGuess) {
			this.props.guessWord(this.state.currentGuess);
			this.setState({ currentGuess: '' });
		}
	};

	onResetHandler = (e) => {
		this.props.getSecretWord();
		this.setState({ currentGuess: '' });
	};

	render() {
		const { currentGuess } = this.state;
		const { success, guessedWords, giveUpHandler } = this.props;
		const content = success ? null : (
			<form onSubmit={this.onSubmitHandler} className="form-inline">
				<input
					value={currentGuess}
					onChange={(e) => this.setState({ currentGuess: e.target.value })}
					data-test="input-box"
					className="mb-2 mx-sm-3"
					type="text"
					placeholder="enter guess"
				/>
				<button data-test="submit-button" className="btn btn-primary mb-2" type="submit">
					Guess
				</button>
				{guessedWords &&
				guessedWords.length > 0 && (
					<button onClick={giveUpHandler} data-test="give-up-button" className="btn btn-danger mb-2 ml-2">
						Give Up
					</button>
				)}
			</form>
		);
		return <div data-test="component-input">{content}</div>;
	}
}

const mapStateToProps = ({ success, guessedWords }) => ({ success, guessedWords });

export default connect(mapStateToProps, { guessWord, getSecretWord })(UnconnectedInput);
