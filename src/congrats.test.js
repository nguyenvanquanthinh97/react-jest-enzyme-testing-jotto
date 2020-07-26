import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from './test/utils';
import Congrats from './congrats';

//default props set up for every setup()
const defaultProps = {
	success: false
};

/**
 * Factory function to create Enzyme ShallowWrapper
 * @param {object} props - Component's props for this setup
 * @param {any} state - Component's initial state for this setup
 * @returns {ShallowWrapper}
 */
export const setup = (props = {}, state = null) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<Congrats {...setupProps} />);
	if (state) wrapper.setState(state);
	return wrapper;
};

test('renders without error', () => {
	const wrapper = setup();
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
