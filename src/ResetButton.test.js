import React from 'react';
import { shallow } from 'enzyme';

import ResetButton from './ResetButton';
import { findByTestAttr } from './test/utils';

describe('reset button', () => {
	let resetHandlerMock, wrapper;
	beforeEach(() => {
		//initialize mocking function for getSecretWord method
		resetHandlerMock = jest.fn();
		const props = {
			success: true,
			resetHandler: resetHandlerMock,
			guessedWords: [ { guessedWord: 'train', letterMatchCount: 3 } ]
		};
		wrapper = shallow(<ResetButton {...props} />);
	});
	test('render if success is true', () => {
		//find reset button
		const resetButton = findByTestAttr(wrapper, 'reset-button');
		expect(resetButton.length).toBe(1);
	});
	test('reset button call `resetHandler`', () => {
		const resetButton = findByTestAttr(wrapper, 'reset-button');
		resetButton.simulate('click');

		const resetHandlerMockCount = resetHandlerMock.mock.calls.length;
		expect(resetHandlerMockCount).toBe(1);
	});
});
