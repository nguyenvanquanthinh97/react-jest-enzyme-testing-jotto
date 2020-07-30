import moxios from 'moxios';

import { actionTypes, getSecretWord } from './index';
import { storeFactory } from '../test/utils';

describe('getSecretWord action creator', () => {
	beforeEach(() => moxios.install());

	afterEach(() => moxios.uninstall());

	test('add response word to state', async () => {
		const secretWord = 'party';
		const store = storeFactory();

		await moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: secretWord
			});
		});

		await store.dispatch(getSecretWord());
		expect(store.getState().secretWord).toBe(secretWord);
	});
});
