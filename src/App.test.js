import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';
import { findByTestAttr } from './test/utils';
import hookActions from './actions/hookActions';

const mockSecretWord = jest.fn();

/**
 * setup function for App
 * @param {object} props - initial props for this setup
 * @param {object} state - initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
	mockSecretWord.mockClear();
	hookActions.getSecretWord = mockSecretWord;

	//this use for shallow
	// React.useEffect = jest.fn(() => hookActions.getSecretWord());
	// const wrapper = shallow(<App {...props} />);

	//this use for mount
	const wrapper = mount(<App {...props} />);
	if (state) wrapper.setState(state);
	return wrapper;
};

test('render App without errors', () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, 'component-app');
	expect(component.length).toBe(1);
});

describe('getSecretWord called', () => {
	test('getSecretWord gets called on App mount', () => {
		setup();
		expect(mockSecretWord).toHaveBeenCalled();
	});

	test('setSecretWord is not called on update', () => {
		const wrapper = setup();

		//refresh mockSecretWord
		mockSecretWord.mockClear();

		wrapper.update();
		expect(mockSecretWord).not.toHaveBeenCalled();
	});
});
