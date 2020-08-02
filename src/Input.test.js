import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';
import { findByTestAttr, checkProps } from './test/utils';

const defaultProps = {
	secretWord: 'party'
};

/**
 * setup function for App
 * @param {object} props - initial props for this setup
 * @param {object} state - initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
	const initialProps = { ...defaultProps, ...props };
	const wrapper = shallow(<Input {...initialProps} />);
	if (state) wrapper.setState(state);
	return wrapper;
};

test('render App without errors', () => {
	const wrapper = setup();
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

		wrapper = setup();
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
