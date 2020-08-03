import React from 'react';

import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import hookActions from './actions/hookActions';

/**
 * Reducer to update state, called update state by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains "type" and "payload" properties for the state update 
 * 												for example: {type: 'setSecretWord', payload: 'party'}
 * @returns {object} - new state
 */
const reducer = (state, action) => {
	switch (action.type) {
		case 'setSecretWord':
			return { ...state, secretWord: action.payload };
		default:
			throw new Error(`Invalid action type: ${action.type}`);
	}
};

function App() {
	const [ state, dispatch ] = React.useReducer(reducer, { secretWord: null });

	const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord });

	React.useEffect(() => {
		hookActions.getSecretWord(setSecretWord);
	}, []);

	return (
		<div className="container text-center" data-test="component-app">
			<h1>Jotto</h1>
			<Congrats success />
			<GuessedWords
				guessedWords={[
					{ guessedWord: 'train', letterMatchCount: 3 },
					{ guessedWord: 'agile', letterMatchCount: 2 },
					{ guessedWord: 'party', letterMatchCount: 5 }
				]}
			/>
		</div>
	);
}

export default App;
