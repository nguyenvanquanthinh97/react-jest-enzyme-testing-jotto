import React from 'react';
import { connect } from 'react-redux';

import { guessWord } from './actions';

const Input = (props) => {
	const { success } = props;
	const content = success ? null : (
		<form className="form-inline">
			<input data-test="input-box" className="mb-2 mx-sm-3" type="text" placeholder="enter guess" />
			<button data-test="submit-button" className="btn btn-primary mb-2" type="submit">
				Submit
			</button>
		</form>
	);
	return <div data-test="component-input">{content}</div>;
};

const mapStateToProps = ({ success }) => ({ success });

export default connect(mapStateToProps, { guessWord })(Input);
