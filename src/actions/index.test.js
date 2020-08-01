import moxios from 'moxios';

import { getSecretWord } from './index';
import { storeFactory } from '../test/utils';

describe('getSecretWord action creator', () => {
	const secretWord = 'party';
	const guessedWords = [ { guessedWord: 'train', lettterMatchCount: 3 } ];
	let store;
	beforeEach(() => {
		store = storeFactory({ secretWord, guessedWords });
		moxios.install();
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: secretWord
			});
		});
	});

	afterEach(() => moxios.uninstall());

	test('add response word to state', async () => {
		await store.dispatch(getSecretWord());
		expect(store.getState().secretWord).toBe(secretWord);
	});

	test('clear guessedWords', async () => {
		await store.dispatch(getSecretWord());
		expect(store.getState().guessedWords).toEqual([]);
	});

	test('set success into false', async () => {
		await store.dispatch(getSecretWord());
		expect(store.getState().success).toBe(false);
	});
});
