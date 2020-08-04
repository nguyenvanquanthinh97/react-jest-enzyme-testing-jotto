import React from 'react';

import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import hookActions from './actions/hookActions';
import Input from './Input';
import LanguageContext from './contexts/LanguageContext';
import LanguagePicker from './LanguagePicker';

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
		case 'setLanguage': {
			return { ...state, language: action.payload };
		}
		default:
			throw new Error(`Invalid action type: ${action.type}`);
	}
};

function App() {
	const [ state, dispatch ] = React.useReducer(reducer, { secretWord: null, language: 'en' });

	const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord });

	const setLanguage = (language) => dispatch({ type: 'setLanguage', payload: language });

	React.useEffect(() => {
		hookActions.getSecretWord(setSecretWord);
	}, []);

	if (!state.secretWord) {
		return (
			<div className="container text-center" data-test="spinner">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<p>Loading Secret Word</p>
			</div>
		);
	}

	return (
		<div className="container text-center" data-test="component-app">
			<h1>Jotto</h1>
			<LanguageContext.Provider value={state.language}>
				<LanguagePicker setLanguage={setLanguage} />
				<Congrats success />
				<Input secretWord={state.secretWord} />
				<GuessedWords
					guessedWords={[
						{ guessedWord: 'train', letterMatchCount: 3 },
						{ guessedWord: 'agile', letterMatchCount: 2 },
						{ guessedWord: 'party', letterMatchCount: 5 }
					]}
				/>
			</LanguageContext.Provider>
		</div>
	);
}

export default App;
