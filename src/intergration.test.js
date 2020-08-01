import { storeFactory } from './test/utils';
import { guessWord } from './actions';

describe('guessWord action dispatcher', () => {
	const secretWord = 'party';
	const unsuccessfulGuess = 'train';
	describe('no guessed words', () => {
		let store;
		const initialState = { secretWord };
		beforeEach(() => {
			store = storeFactory({ ...initialState });
		});
		test('update state correctly for unsuccessful guess', () => {
			store.dispatch(guessWord(unsuccessfulGuess));
			const expectedState = {
				...initialState,
				success: false,
				guessedWords: [
					{
						guessedWord: unsuccessfulGuess,
						letterMatchCount: 3
					}
				]
			};
			expect(store.getState()).toEqual(expectedState);
		});
		test('update state correctly for successful guess', () => {
			store.dispatch(guessWord(secretWord));
			const expectedState = {
				...initialState,
				success: true,
				guessedWords: [ { guessedWord: secretWord, letterMatchCount: 5 } ]
			};
			expect(store.getState()).toEqual(expectedState);
		});
	});

	describe('some guessed words', () => {
		const guessedWords = [ { guessedWord: 'agile', letterMatchCount: 1 } ];
		const initialState = { guessedWords, secretWord };
		let store;
		beforeEach(() => {
			store = storeFactory(initialState);
		});
		test('update state correctly for unsuccessful guess', () => {
			store.dispatch(guessWord(unsuccessfulGuess));
			const expectedState = {
				...initialState,
				guessedWords: guessedWords.concat({ guessedWord: unsuccessfulGuess, letterMatchCount: 3 }),
				success: false
			};
			expect(store.getState()).toEqual(expectedState);
		});

		test('update state correctly for successful guess', () => {
			store.dispatch(guessWord(secretWord));
			const expectedState = {
				...initialState,
				success: true,
				guessedWords: guessedWords.concat({ guessedWord: secretWord, letterMatchCount: 5 })
			};
			expect(store.getState()).toEqual(expectedState);
		});
	});
});