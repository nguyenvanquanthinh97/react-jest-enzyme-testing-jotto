import React from 'react';
import PropTypes from 'prop-types';

import ResetButton from './ResetButton';
/**
 * Functional React Component to render fails message
 * @function
 * @return {JSX.Element} - Rendered Component (or null if 'isGiveUp' props is false)
 */
const Fails = ({ isGiveUp, secretWord, resetHandler }) => {
	console.log(secretWord);
	return isGiveUp ? (
		<div className="alert alert-warning" data-test="component-fails">
			<div data-test="fails-message">
				<h5>The secret word is {secretWord}. Better luck next time ! </h5>
			</div>
			<ResetButton data-test="reset-button" resetHandler={resetHandler} />
		</div>
	) : null;
};

Fails.propTypes = {
	isGiveUp: PropTypes.bool.isRequired,
	secretWord: PropTypes.string.isRequired,
	resetHandler: PropTypes.func.isRequired
};

export default Fails;
