import { actionTypes } from '../actions/index';

/**
 * Guessed Word Reducer
 * @param {array} state - Array of guessed words
 * @param {object} action - action to be executed 
 * @return {array} - new guessed words array
 */
export default (state = [], action) => {
	switch (action.type) {
		case actionTypes.GUESS_WORD: {
			return [ ...state, action.payload ];
		}
		case actionTypes.SET_SECRET_WORD: {
			return [];
		}
		default:
			return state;
	}
};
