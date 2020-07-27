import { actionTypes, correctGuess } from './';

describe('correct guess', () => {
	test('return an action object with type: "CORRECT_GUESS"', () => {
		const action = correctGuess();
		expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
	});
});
