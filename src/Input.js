import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
	const [ currentGuess, setCurrentGuess ] = React.useState('');

	const onFormSubmitClick = (e) => {
		e.preventDefault();
	};

	return (
		<div data-test="component-input">
			<form onSubmit={onFormSubmitClick} className="inline">
				<input
					value={currentGuess}
					onChange={(e) => setCurrentGuess(e.target.value)}
					className="mb-2 mx-sm-3"
					type="text"
					data-test="input-box"
					placeholder="Enter guess"
				/>
				<button type="submit" className="btn btn-primary mb-2" data-test="submit-button">
					Submit
				</button>
			</form>
		</div>
	);
};

Input.propTypes = {
	secretWord: PropTypes.string.isRequired
};

export default Input;
