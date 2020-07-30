import { getLetterMatchCount } from '../helpers/index';

export const actionTypes = {
	CORRECT_GUESS: 'CORRECT_GUESS',
	GUESS_WORD: 'GUESS_WORD'
};

/**
 * Return Redux Thunk function that dispatches 'GUESS_WORD' and conditionally dispatch 'CORRECT_GUESS' if guessed word match with secret word
 * @param {string} guessedWord - Guessed word
 * @return {function} - Redux thunk function
 */
export const guessWord = (guessedWord) => {
	return (dispatch, getState) => {
		const secretWord = getState().secretWord;
		const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

		dispatch({
			type: actionTypes.GUESS_WORD,
			payload: {
				guessedWord,
				letterMatchCount
			}
		});

		if (guessedWord === secretWord) {
			dispatch({
				type: actionTypes.CORRECT_GUESS
			});
		}
	};
};
