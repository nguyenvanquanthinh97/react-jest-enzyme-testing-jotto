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
