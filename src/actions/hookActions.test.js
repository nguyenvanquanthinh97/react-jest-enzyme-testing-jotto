import moxios from 'moxios';

import { getSecretWord } from './hookActions';

describe('moxios test', () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	test('getSecretWord invokes callback function with response from axios', async () => {
		const secretWord = 'party';
		const mockSetSecretWord = jest.fn();

		//simulate recent axios request
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();

			request.respondWith({
				status: 200,
				response: secretWord
			});
		});

		//wait for getSecretWord execute and invoke mockSetSecretWord with argument is `secretWord`
		await getSecretWord(mockSetSecretWord);

		expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
	});
});
