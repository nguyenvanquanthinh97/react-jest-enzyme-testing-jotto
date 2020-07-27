export const actionTypes = {
	CORRECT_GUESS: 'CORRECT_GUESS'
};

/**
 * @function correctGuess
 * @returns {object} - return object with type 'CORRECT_GUESS'
 */
export const correctGuess = () => {
	return {
		type: actionTypes.CORRECT_GUESS
	};
};
