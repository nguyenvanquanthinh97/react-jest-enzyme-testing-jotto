import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from './test/utils';
import LanguagePicker from './LanguagePicker';

const mockSetLanguage = jest.fn();

const setup = () => {
	return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test('render LanguagePicker without error', () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, 'component-language-picker');
	expect(component.exists()).toBe(true);
});

test('does not throw warning with expected props', () => {
	checkProps(LanguagePicker, { setLanguage: mockSetLanguage });
});

test('render non-zero language icons', () => {
	const wrapper = setup();

	const languageIcons = findByTestAttr(wrapper, 'language-icon');
	expect(languageIcons.length).toBeGreaterThan(0);
});

test('call setLanguage props upon click', () => {
	const wrapper = setup();

	const languageIcons = findByTestAttr(wrapper, 'language-icon');
	languageIcons.at(0).simulate('click');

	expect(mockSetLanguage).toHaveBeenCalled();
});