import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { findByTestAttr } from './test/utils';

/**
 * setup function for App
 * @param {object} props - initial props for this setup
 * @param {object} state - initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
	const wrapper = shallow(<App {...props} />);
	if (state) wrapper.setState(state);
	return wrapper;
};

test('render App without errors', () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, 'component-app');
	expect(component.length).toBe(1);
});
