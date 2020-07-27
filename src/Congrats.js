import React from 'react';
import PropTypes from 'prop-types';
/**
 * Functional React Component to render congrats message
 * @function
 * @return {JSX.Element} - Rendered Component (or null if 'success' props is false)
 */
const Congrats = ({ success }) => {
	let content, classNames;
	if (success) {
		classNames = 'alert alert-success';
		content = <h5>You guessed the word</h5>;
	}
	return (
		<div className={classNames} data-test="component-congrats">
			<div data-test="congrats-message">{content}</div>
		</div>
	);
};

Congrats.propTypes = {
	success: PropTypes.bool.isRequired
};

export default Congrats;
