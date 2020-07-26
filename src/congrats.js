import React from 'react';
import PropTypes from 'prop-types';
/**
 * Functional React Component to render congrats message
 * @function
 * @return {JSX.Element} - Rendered Component (or null if 'success' props is false)
 */
const Congrats = ({ success }) => {
	return (
		<div data-test="component-congrats">
			<div data-test="congrats-message">{success && 'You guessed the word'}</div>
		</div>
	);
};

Congrats.propTypes = {
	success: PropTypes.bool.isRequired
};

export default Congrats;
