import React from 'react';
import { mount } from 'enzyme';

import Input from './Input';
import { findByTestAttr, checkProps } from './test/utils';
import LanguageContext from './contexts/LanguageContext';

const defaultProps = {
	secretWord: 'party'
};

/**
 * setup function for App
 * @param {object} testValue - initial context value for this setup
 * @returns {ReactWrapper}
 */
const setup = ({ language, secretWord }) => {
	language = language || 'en';
	secretWord = secretWord || 'party';

	return mount(
		<LanguageContext.Provider value={language}>
			<Input secretWord={secretWord} />
		</LanguageContext.Provider>
	);
};

describe('languagePicker', () => {
	test('correctly render submit button text in english', () => {
		const wrapper = setup({});

		const submitButton = findByTestAttr(wrapper, 'submit-button');
		expect(submitButton.text()).toBe('Submit');
	});
	test('correctly render submit button text in vietnamese', () => {
		const wrapper = setup({ language: 'vi' });

		const submitButton = findByTestAttr(wrapper, 'submit-button');
		expect(submitButton.text()).toBe('Đoán');
	});
});

test('render App without errors', () => {
	const wrapper = setup({});
	const component = findByTestAttr(wrapper, 'component-input');
	expect(component.length).toBe(1);
});

test('passing props as propTypes condition in Input', () => {
	const props = { secretWord: 'party' };
	checkProps(Input, props);
});

describe('state control input field', () => {
	const currentGuess = 'train';
	const mockSetCurrentGuess = jest.fn();
	let wrapper;

	beforeEach(() => {
		mockSetCurrentGuess.mockClear();
		React.useState = jest.fn(() => [ '', mockSetCurrentGuess ]);

		wrapper = setup({});
	});

	test('state updates with value of input box change with `setCurrentGuess`', () => {
		//find input box and simuate change it
		const inputBox = findByTestAttr(wrapper, 'input-box');
		inputBox.simulate('change', { target: { value: currentGuess } });

		expect(mockSetCurrentGuess).toHaveBeenCalledWith(currentGuess);
	});

	test('field is clear when form is submitted', () => {
		//find input box and simuate submit it
		const form = findByTestAttr(wrapper, 'form');
		form.simulate('submit', { preventDefault: () => {} });

		expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
	});
});
