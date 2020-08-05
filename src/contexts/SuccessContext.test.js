import React from 'react';
import { shallow, mount } from 'enzyme';

import SuccessContext from './SuccessContext';

const FunctionComponent = () => {
	SuccessContext.useSuccess();
	return <div />;
};

test('useSuccess throw error when not wrapped in Provider', () => {
	expect(() => shallow(<FunctionComponent />)).toThrow('unSuccess must be used within a SuccessProvider');
});

test('useSuccess not throw error when wrapped in Provider', () => {
	expect(() =>
		mount(
			<SuccessContext.SuccessProvider>
				<FunctionComponent />
			</SuccessContext.SuccessProvider>
		)
	).not.toThrow();
});
