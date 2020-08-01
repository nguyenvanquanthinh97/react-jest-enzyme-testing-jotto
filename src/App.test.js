import React from 'react';
import { shallow } from 'enzyme';

import { getSecretWord } from './actions';
import { storeFactory } from './test/utils';
import App, { UnconnectedApp } from './App';

/**
 * This setup function will return shallow wrapper of App
 * @param {object} initialState - initial state for this setup
 * @returns {ShallowWrapper}
 */
const secretWord = 'party';
const setup = (initialState = {}) => {
	const wrapper = shallow(<App store={storeFactory({ secretWord, ...initialState })} />).dive().dive();
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

test('`getSecretWord` runs on App mount', () => {
	//create getSecretMock
	const getSecretWordMock = jest.fn();

	const props = {
		getSecretWord: getSecretWordMock,
		success: false,
		secretWord,
		guessedWords: [ { guessedWord: 'train', letterMatchCount: 3 } ]
	};

	//let App using getSecretMock
	const wrapper = shallow(<UnconnectedApp {...props} />);

	//invoke componentDidMount() on App
	wrapper.instance().componentDidMount();

	//check to see how many time mock ran (if mock can run)
	const getSecretWordCount = getSecretWordMock.mock.calls.length;

	expect(getSecretWordCount).toBe(1);
});
