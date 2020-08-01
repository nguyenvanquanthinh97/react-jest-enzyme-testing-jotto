import axios from 'axios';

import { getLetterMatchCount } from '../helpers/index';

export const actionTypes = {
	CORRECT_GUESS: 'CORRECT_GUESS',
	GUESS_WORD: 'GUESS_WORD',
	SET_SECRET_WORD: 'SET_SECRET_WORD',
	SERVER_ERROR: 'SERVER_ERROR'
};

const jotto_server = 'https://random-guessed-words.herokuapp.com/';

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

/**
 * 
 * @param {string} userGuessWord - optional ( used in User Friend Challenge Mode)
 */
export const getSecretWord = (userGuessWord) => async (dispatch) => {
	if (userGuessWord && userGuessWord.trim().length > 0) {
		dispatch({
			type: actionTypes.SET_SECRET_WORD,
			payload: userGuessWord.trim()
		});
		return;
	}
	try {
		const response = await axios.get(jotto_server);
		dispatch({
			type: actionTypes.SET_SECRET_WORD,
			payload: response.data
		});
	} catch (error) {
		dispatch({
			type: actionTypes.SERVER_ERROR,
			payload: error.message
		});
	}
};
