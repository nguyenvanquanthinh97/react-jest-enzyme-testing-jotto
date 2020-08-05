import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';
import { findByTestAttr } from './test/utils';
import hookActions from './actions/hookActions';

const mockSecretWord = jest.fn();

/**
 * setup function for App
 * @param {object} props - initial props for this setup
 * @param {object} state - initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = { secretWord: 'party', guessedWords: [] }, state = null) => {
	mockSecretWord.mockClear();
	hookActions.getSecretWord = mockSecretWord;

	//this use for shallow
	// React.useEffect = jest.fn(() => hookActions.getSecretWord());
	// const wrapper = shallow(<App {...props} />);

	//mockUseReducer
	React.useReducer = jest.fn().mockReturnValue([ { language: 'en', ...props }, jest.fn() ]);

	//this use for mount
	const wrapper = mount(<App />);
	if (state) wrapper.setState(state);
	return wrapper;
};

test('render App without errors', () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, 'component-app');
	expect(component.length).toBe(1);
});

describe('getSecretWord called', () => {
	test('getSecretWord gets called on App mount', () => {
		setup();
		expect(mockSecretWord).toHaveBeenCalled();
	});

	test('setSecretWord is not called on update', () => {
		const wrapper = setup();

		//refresh mockSecretWord
		mockSecretWord.mockClear();

		wrapper.update();
		expect(mockSecretWord).not.toHaveBeenCalled();
	});
});

describe('secretWord is not null', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup({ secretWord: 'party' });
	});

	test('renders app component when secretWord is not null', () => {
		const appComponent = findByTestAttr(wrapper, 'component-app');
		expect(appComponent.exists()).toBe(true);
	});

	test('do not render spinner when secretWord is not null', () => {
		const spinner = findByTestAttr(wrapper, 'spinner');
		expect(spinner.exists()).toBe(false);
	});
});

describe('secretWord is null', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup({ secretWord: null });
	});

	test('do not render app component when secretWord is null', () => {
		const appComponent = findByTestAttr(wrapper, 'component-app');
		expect(appComponent.exists()).toBe(false);
	});

	test('render spinner when secretWord is null', () => {
		const spinner = findByTestAttr(wrapper, 'spinner');
		expect(spinner.exists()).toBe(true);
	});
});
