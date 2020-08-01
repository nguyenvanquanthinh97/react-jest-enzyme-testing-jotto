import React from 'react';
import { connect } from 'react-redux';

import { guessWord } from './actions';

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

	render() {
		const { currentGuess } = this.state;
		const { success } = this.props;
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
					Submit
				</button>
			</form>
		);
		return <div data-test="component-input">{content}</div>;
	}
}

const mapStateToProps = ({ success }) => ({ success });

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
