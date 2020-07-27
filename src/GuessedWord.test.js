import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from './test/utils';

import GuessedWord from './GuessedWord';

const defaultProps = {
	guessedWords: [ { guessedWord: 'train', letterMatchCount: 3 } ]
};

/**
 * Factory function to create Enzyme ShallowWrapper
 * @param {object} props - Component's props for this setup
 * @param {any} state - Component's initial state for this setup
 * @returns {ShallowWrapper}
 */
export const setup = (props = {}, state = null) => {
	const setupProps = { ...defaultProps, ...props };
	const wrapper = shallow(<GuessedWord {...setupProps} />);
	if (state) wrapper.setState(state);
	return wrapper;
};

test('does not throw error warning with appropriate props', () => {
	checkProps(GuessedWord, defaultProps);
});

describe('tests if there are no words guessed', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup({ guessedWords: [] });
	});
	test('renders without error', () => {
		const component = findByTestAttr(wrapper, 'component-guessed-words');
		expect(component.length).toBe(1);
	});
	test('renders instruction to guess a word', () => {
		const instructions = findByTestAttr(wrapper, 'guess-instructions');
		expect(instructions.text().length).not.toBe(0);
	});
});

describe('tests if there are words guessed', () => {});
