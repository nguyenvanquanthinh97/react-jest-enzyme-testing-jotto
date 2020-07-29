import React from 'react';

import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';

function App() {
	return (
		<div className="container text-center">
			<h1>Jotto</h1>
			<Congrats success />
			<Input />
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
