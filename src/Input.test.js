import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr, storeFactory } from './test/utils';
import Input, { UnconnectedInput } from './Input';

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
		let wrapper;
		beforeEach(() => {
			const initialState = { success: false };
			wrapper = setup(initialState);
		});
		test('render without error', () => {
			const component = findByTestAttr(wrapper, 'component-input');
			expect(component.length).toBe(1);
		});

		test('render input box', () => {
			const inputBox = findByTestAttr(wrapper, 'input-box');
			expect(inputBox.length).toBe(1);
		});

		test('render submit button', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button');
			expect(submitButton.length).toBe(1);
		});
	});

	describe('render if there is success guess', () => {
		let wrapper;
		beforeEach(() => {
			const initialState = { success: true };
			wrapper = setup(initialState);
		});
		test('render without error', () => {
			const initialState = { success: false };
			wrapper = setup(initialState);
		});

		test('does not render input box', () => {
			const inputBox = findByTestAttr(wrapper, 'input-box');
			expect(inputBox.length).toBe(0);
		});

		test('does not render submit button', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button');
			expect(submitButton.length).toBe(0);
		});
	});
});

/**
 * return first layer of HOC (redux connect) to get its props (Stateless Component)
 * @param {object} initialState - initial state for Input
 * @returns {ShallowWrapper} - 1st layer of HOC of Redux Connect
 */
const getPropsLayerWrapper = (initialState = {}) => {
	return shallow(<Input store={storeFactory(initialState)} />).dive();
};

describe('check redux props', () => {
	test('has "success" as a props', () => {
		const success = true;
		const wrapper = getPropsLayerWrapper({ success });
		expect(wrapper.props().success).toBe(success);
	});
	test('has "guessWord" action creator as a props', () => {
		const wrapper = getPropsLayerWrapper();
		expect(wrapper.props().guessWord).toBeInstanceOf(Function);
	});
});

//At this here i have converted from stateless component into state component
describe('test input integration with Mock functions', () => {
	let guessWordMock;
	const guessedWord = 'train';
	let wrapper;
	beforeEach(() => {
		//create guessWordMock replacing for guessWord as piece of props
		guessWordMock = jest.fn();

		const props = {
			success: false,
			guessWord: guessWordMock
		};
		wrapper = shallow(<UnconnectedInput {...props} />);

		//set guessedWordState
		wrapper.setState({ currentGuess: guessedWord });

		//find form and simulate submit it
		const inputForm = wrapper.find('form');
		inputForm.simulate('submit', { preventDefault: () => {} });
	});
	test('input invoke `guessWord` with guessWordMock with input argument as `guessedWord`', () => {
		//checking Input invokes guessWordMock
		const guessWordMockCount = guessWordMock.mock.calls.length;
		expect(guessWordMockCount).toBe(1);
	});

	test('test Input call `guessWord` with exactly argument', () => {
		const guessWordArg = guessWordMock.mock.calls;
		expect(guessWordArg[0][0]).toBe(guessedWord);
	});

	test('Input field has clear text after submit', () => {
		expect(wrapper.state('currentGuess')).toBe('');
	});
});
