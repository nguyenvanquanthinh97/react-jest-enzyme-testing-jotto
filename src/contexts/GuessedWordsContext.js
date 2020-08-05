import React from 'react';

const GuessedWordsContext = React.createContext();

/**
 * @function useGuessedWords
 * @returns {array} - GuessedWordsContext value, which is a state of [value, settter].
 */
const useGuessedWords = () => {
	const GuessedWords = React.useContext(GuessedWordsContext);

	if (!GuessedWords) throw new Error('GuessedWords must be used within a SuccessProvider');
	return GuessedWords;
};

const GuessedWordsProvider = (props) => {
	const [ guessedWords, setGuessedWords ] = React.useState([]);

	const context = React.useMemo(() => [ guessedWords, setGuessedWords ], [ guessedWords ]);
	return <GuessedWordsContext.Provider value={guessedWords} {...props} />;
};

export default { useGuessedWords, GuessedWordsProvider };
