import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from './test/utils';
import Input from './Input';

/**
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @return {ShallowWrapper}
 */
const setup = (initialState = {}) => {
	const store = storeFactory(initialState);
	const wrapper = shallow(<Input store={store} />).dive().dive();
	return wrapper;
};

describe('render', () => {
	describe('render if there is no success guess', () => {
		test('render without error', () => {});

		test('render input component', () => {});

		test('render submit button', () => {});
	});

	describe('render if there is success guess', () => {
		test('render without error', () => {});

		test('does not render input component', () => {});

		test('does not render submit button', () => {});
	});
});

describe('check state', () => {});
