import React from 'react';
import { mount } from 'enzyme';

import Input from './Input';
import { findByTestAttr } from './test/utils';
import SuccessContext from './contexts/SuccessContext';
import GuessedWordsContext from './contexts/GuessedWordsContext';
import GuessedWords from './GuessedWords';

const setup = ({ secretWord, guessedWordsString }) => {
	secretWord = secretWord || 'party';
	guessedWordsString = guessedWordsString || [];

	const wrapper = mount(
		<GuessedWordsContext.GuessedWordsProvider>
			<SuccessContext.SuccessProvider>
				<Input secretWord={secretWord} />
				<GuessedWords />
			</SuccessContext.SuccessProvider>
		</GuessedWordsContext.GuessedWordsProvider>
	);

	const inputBox = findByTestAttr(wrapper, 'input-box');
	const form = wrapper.find('form');

	guessedWordsString.forEach((word) => {
		inputBox.simulate('change', { target: { value: word } });
		form.simulate('submit', { preventDefault: jest.fn() });
	});

	return [ wrapper, inputBox, form ];
};

describe('test word guesses', () => {
	let wrapper, inputBox, form;
	beforeEach(() => {
		[ wrapper, inputBox, form ] = setup({ guessedWordsString: [ 'agile' ] });
	});

	describe('guess correctly', () => {
		beforeEach(() => {
			inputBox.simulate('change', { target: { value: 'party' } });
			form.simulate('submit', { preventDefault: () => {} });
		});
		test('does not render input component when success is true', () => {
			const inputComponent = findByTestAttr(wrapper, 'component-input');
			expect(inputComponent.children().length).toBe(0);
		});
		test('GuessedWords rendered rows correctly', () => {
			const guessedWords = findByTestAttr(wrapper, 'guess-word');
			expect(guessedWords.length).toBe(2);
		});
	});

	describe('guess wrong', () => {
		beforeEach(() => {
			inputBox.simulate('change', { target: { value: 'train' } });
			form.simulate('submit', { preventDefault: () => {} });
		});

		test('render input component when success is false', () => {
			const inputComponent = findByTestAttr(wrapper, 'component-input');
			expect(inputComponent.exists()).toBe(true);
		});

		test('GuessedWords rendered rows correctly', () => {
			const guessedWords = findByTestAttr(wrapper, 'guess-word');
			expect(guessedWords.length).toBe(2);
		});
	});
});

describe('no test word guesses', () => {
	let wrapper, inputBox, form;
	beforeEach(() => {
		[ wrapper, inputBox, form ] = setup({ guessedWordsString: [] });
	});

	test('render GuessedWords row correctly', () => {
		inputBox.simulate('change', { target: { value: 'train' } });
		form.simulate('submit', { preventDefault: () => {} });
		const guessedWords = findByTestAttr(wrapper, 'guess-word');
		expect(guessedWords.length).toBe(1);
	});
});
