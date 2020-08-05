import React from 'react';

import LanguageContext from './contexts/LanguageContext';
import GuessedWordsContext from './contexts/GuessedWordsContext';
import stringsModule from './helpers/strings';

const GuessedWord = () => {
	let content;
	const [ guessedWords ] = GuessedWordsContext.useGuessedWords();
	const language = React.useContext(LanguageContext);
	if (guessedWords.length === 0) {
		content = (
			<div data-test="guess-instructions">{stringsModule.getStringsByLanguage(language, 'guessPrompt')}</div>
		);
	} else {
		//render each guessedWord element into each table row
		const guessedWordNodes = guessedWords.map(({ guessedWord, letterMatchCount }, idx) => {
			return (
				<tr key={idx} data-test="guess-word">
					<td>{guessedWord}</td>
					<td>{letterMatchCount}</td>
				</tr>
			);
		});

		//render table
		content = (
			<div data-test="guess-words">
				<h3>{stringsModule.getStringsByLanguage(language, 'guessedWords')}</h3>
				<table className="table table-sm">
					<thead className="thead-light">
						<tr>
							<th>{stringsModule.getStringsByLanguage(language, 'guessedWords')}</th>
							<th>{stringsModule.getStringsByLanguage(language, 'matchingLettersColumnHeader')}</th>
						</tr>
					</thead>
					<tbody>{guessedWordNodes}</tbody>
				</table>
			</div>
		);
	}
	return <div data-test="component-guessed-words">{content}</div>;
};

export default GuessedWord;
