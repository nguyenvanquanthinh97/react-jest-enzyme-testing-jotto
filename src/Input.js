import React from 'react';
import PropTypes from 'prop-types';

import LanguageContext from './contexts/LanguageContext';
import SuccessContext from './contexts/SuccessContext';
import GuessedWords from './contexts/GuessedWordsContext';
import stringsModule from './helpers/strings';
import { getLetterMatchCount } from './helpers';

const Input = ({ secretWord }) => {
	const [ currentGuess, setCurrentGuess ] = React.useState('');
	const language = React.useContext(LanguageContext);
	const [ success, setSuccess ] = SuccessContext.useSuccess();
	const [ guessedWords, setGuessedWords ] = GuessedWords.useGuessedWords();

	const onFormSubmitClick = (e) => {
		e.preventDefault();

		//invoke guessWord to optionally update `success`
		if (currentGuess === secretWord) {
			setSuccess(true);
		}
		//update `guessedWords` context
		const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
		setGuessedWords([ ...guessedWords, { guessedWord: currentGuess, letterMatchCount } ]);
		//clear input
		setCurrentGuess('');
	};

	if (success) return null;

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
