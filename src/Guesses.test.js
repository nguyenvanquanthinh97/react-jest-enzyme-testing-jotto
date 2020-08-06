import React from 'react';
import { mount } from 'enzyme';

import Input from './Input';
import { findByTestAttr } from './test/utils';
import SuccessContext from './contexts/SuccessContext';
import LanguageContext from './contexts/LanguageContext';

const setup = ({ secretWord }) => {
	secretWord = secretWord || 'party';

	const wrapper = mount(
		<SuccessContext.SuccessProvider>
			<LanguageContext.Provider value="en">
				<Input secretWord={secretWord} />
			</LanguageContext.Provider>
		</SuccessContext.SuccessProvider>
	);

	const inputBox = findByTestAttr(wrapper, 'input-box');
	const form = wrapper.find('form');
	return [ wrapper, inputBox, form ];
};

describe('test word guesses', () => {
	let wrapper, inputBox, form;
	beforeEach(() => {
		[ wrapper, inputBox, form ] = setup({});
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
	});
});
