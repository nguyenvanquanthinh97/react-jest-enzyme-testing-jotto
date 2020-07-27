/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - input guessed word from user
 * @param {string} secretWord - secret word that guessed word compare to
 * @returns {number} - total number of matching letter
 */
export const getLetterMatchCount = (guessedWord, secretWord) => {
	const guessedWordSet = new Set(guessedWord.split(''));
	const secretWordSet = new Set(secretWord.split(''));
	return Array.from(guessedWordSet).filter((letter) => secretWordSet.has(letter)).length;
};
