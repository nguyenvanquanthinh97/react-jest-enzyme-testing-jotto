import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr, checkProps } from './test/utils';
import Congrats from './Congrats';
import LanguageContext from './contexts/LanguageContext';
import SuccessContext from './contexts/SuccessContext';

//default props set up for every setup()
const defaultProps = {
	success: false
};

/**
 * Factory function to create Enzyme ShallowWrapper
 * @param {object} testValues - Context values specific for this setup
 * @returns {ReactWrapper}
 */
export const setup = ({ success, language }) => {
	success = success || false;
	language = language || 'en';

	return mount(
		<LanguageContext.Provider value={language}>
			<SuccessContext.SuccessProvider value={[ success, jest.fn() ]}>
				<Congrats />
			</SuccessContext.SuccessProvider>
		</LanguageContext.Provider>
	);
};

describe('languagePicker', () => {
	test('correctly render congrats string in english', () => {
		const wrapper = setup({ success: true });
		expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
	});

	test('correctly render exactly string in vietnamese', () => {
		const wrapper = setup({ success: true, language: 'vi' });
		expect(wrapper.text()).toBe('Chúc mừng bạn! Bạn đã đoán được từ khóa');
	});
});

test('renders without error', () => {
	const wrapper = setup({});
	const component = findByTestAttr(wrapper, 'component-congrats');
	expect(component.length).toBe(1);
});

test('renders no text when `success` props is false', () => {
	const wrapper = setup({ success: false });
	const messageDisplay = findByTestAttr(wrapper, 'congrats-message');
	expect(messageDisplay.text()).toBe('');
});

test('renders non-empty congrats message when `success` props is true', () => {
	const wrapper = setup({ success: true });
	const messageDisplay = findByTestAttr(wrapper, 'congrats-message');
	expect(messageDisplay.text()).not.toBe('');
});

test('does not throw warning with expected props', () => {
	const expectedProps = { success: false };
	checkProps(Congrats, expectedProps);
});
