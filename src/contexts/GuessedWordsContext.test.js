import React from 'react';
import { shallow, mount } from 'enzyme';

import GuessedWordsContext from './GuessedWordsContext';

const FunctionComponent = () => {
	GuessedWordsContext.useGuessedWords();
	return <div />;
};

test('useSuccess throw error when not wrapped in Provider', () => {
	expect(() => shallow(<FunctionComponent />)).toThrow('GuessedWords must be used within a SuccessProvider');
});

test('useSucess not throw error when wrapped in Provider', () => {
	expect(() =>
		mount(
			<GuessedWordsContext.GuessedWordsProvider>
				<FunctionComponent />
			</GuessedWordsContext.GuessedWordsProvider>
		)
	).not.toThrow();
});
