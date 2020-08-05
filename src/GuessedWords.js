import React from 'react';
import PropTypes from 'prop-types';

import LanguageContext from './contexts/LanguageContext';
import stringsModule from './helpers/strings';

const GuessedWord = ({ guessedWords }) => {
	let content;
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
				<h3>{stringsModule.getStringsByLanguage(language, 'guessColumnHeader')}</h3>
				<table className="table table-sm">
					<thead className="thead-light">
						<tr>
							<th>{stringsModule.getStringsByLanguage(language, 'guessColumnHeader')}</th>
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

GuessedWord.propTypes = {
	guessedWords: PropTypes.arrayOf(
		PropTypes.shape({
			guessedWord: PropTypes.string.isRequired,
			letterMatchCount: PropTypes.number.isRequired
		})
	).isRequired
};

export default GuessedWord;
