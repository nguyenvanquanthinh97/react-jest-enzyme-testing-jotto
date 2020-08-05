import React from 'react';
import PropTypes from 'prop-types';

import LanguageContext from './contexts/LanguageContext';
import stringsModule from './helpers/strings';

const Input = (props) => {
	const [ currentGuess, setCurrentGuess ] = React.useState('');
	const language = React.useContext(LanguageContext);

	const onFormSubmitClick = (e) => {
		e.preventDefault();

		//	TODO: invoke guessWord to optionally update `success`
		//	TODO: update `guessedWords` context
		setCurrentGuess('');
	};

	return (
		<div data-test="component-input">
			<form onSubmit={onFormSubmitClick} className="inline" data-test="form">
				<input
					value={currentGuess}
					onChange={(e) => setCurrentGuess(e.target.value)}
					className="mb-2 mx-sm-3"
					type="text"
					data-test="input-box"
					placeholder={stringsModule.getStringsByLanguage(language, 'guessInputPlaceholder')}
				/>
				<button type="submit" className="btn btn-primary mb-2" data-test="submit-button">
					{stringsModule.getStringsByLanguage(language, 'submit')}
				</button>
			</form>
		</div>
	);
};

Input.propTypes = {
	secretWord: PropTypes.string.isRequired
};

export default Input;
