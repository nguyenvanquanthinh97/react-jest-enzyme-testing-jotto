import React from 'react';
import PropTypes from 'prop-types';

const GuessedWord = ({ guessedWords }) => {
	return (
		<div data-test="component-guessed-words">
			<div data-test="guess-instructions">{guessedWords.length === 0 && 'Try to guess a secret word !'}</div>
		</div>
	);
};

GuessedWord.propTypes = {
	guessedWords: PropTypes.arrayOf(
		PropTypes.shape({
			guessedWord: PropTypes.string.isRequired,
			letterMatchCount: PropTypes.number.isRequired
		})
	).isRequired
};

export default GuessedWord;
