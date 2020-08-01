import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from './test/utils';
import Fails from './Fails';

//default props set up for every setup()
const defaultProps = {
	isGiveUp: true,
	secretWord: 'party',
	resetHandler: () => {}
};

/**
 * Factory function to create Enzyme ShallowWrapper
 * @param {object} props - Component's props for this setup
 * @param {any} state - Component's initial state for this setup
 * @returns {ShallowWrapper}
 */
export const setup = (props = {}, state = null) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<Fails {...setupProps} />);
	if (state) wrapper.setState(state);
	return wrapper;
};

test('renders without error', () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, 'component-fails');
	expect(component.length).toBe(1);
});

test('renders no text when `isGiveUp` props is false', () => {
	const wrapper = setup({ isGiveUp: false });
	const messageDisplay = findByTestAttr(wrapper, 'fails-message');
	expect(messageDisplay.length).toBe(0);
});

test('renders non-empty fails message when `isGiveUp` props is true', () => {
	const wrapper = setup({ isGiveUp: true });
	const messageDisplay = findByTestAttr(wrapper, 'fails-message');
	expect(messageDisplay.text()).not.toBe('');
});

test('render resetButton when `isGiveUp` props is true', () => {
	const wrapper = setup({ isGiveUp: true });
	const resetButton = findByTestAttr(wrapper, 'reset-button');
	expect(resetButton.length).toBe(1);
});

test('does not throw warning with expected props', () => {
	const expectedProps = { isGiveUp: false, secretWord: 'party', resetHandler: () => {} };
	checkProps(Fails, expectedProps);
});
