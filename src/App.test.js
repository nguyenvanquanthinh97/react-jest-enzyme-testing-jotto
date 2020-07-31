import React from 'react';
import { shallow } from 'enzyme';

import { getSecretWord } from './actions';
import { storeFactory } from './test/utils';
import App from './App';

/**
 * This setup function will return shallow wrapper of App
 * @param {object} initialState - initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
	const wrapper = shallow(<App store={storeFactory(initialState)} />).dive().dive();
	return wrapper;
};

describe('check redux props', () => {
	const success = false;
	const secretWord = 'party';
	const guessedWords = [ { guessedWord: 'train', letterMatchCount: 3 } ];
	test('have "success" as a piece in props', () => {
		const wrapper = setup({ success });
		expect(wrapper.instance().props.success).toBe(success);
	});
	test('have "getSecretWord" as a piece of props', () => {
		const wrapper = setup();
		expect(wrapper.instance().props.getSecretWord).toBeInstanceOf(Function);
	});
	test('have "guessedWords" as a piece in props', () => {
		const wrapper = setup({ guessedWords });
		expect(wrapper.instance().props.guessedWords).toEqual(guessedWords);
	});
	test('have "secretWord" as a piece of props', () => {
		const wrapper = setup({ secretWord });
		expect(wrapper.instance().props.secretWord).toBe(secretWord);
	});
});
