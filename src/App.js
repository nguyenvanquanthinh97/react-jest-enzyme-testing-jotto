import React from 'react';

import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';

function App() {
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
