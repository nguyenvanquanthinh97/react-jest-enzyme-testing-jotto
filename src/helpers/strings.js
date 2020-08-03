const languageStrings = {
	en: {
		congrats: 'Congratulations! You guessed the word!',
		submit: 'Submit',
		guessPrompt: 'Try to guess the secret word!',
		guessInputPlaceholder: 'enter guess',
		guessColumnHeader: 'Guessed Words',
		guessedWords: 'Guesses',
		matchingLettersColumnHeader: 'Matching Letters'
	},
	vi: {
		congrats: 'Chúc mừng bạn! Bạn đã đoán được từ khóa',
		submit: 'Đoán',
		guessPrompt: 'Cố gắng đoán từ khóa đi nào',
		guessInputPlaceholder: 'Đoán từ khóa',
		guessedWords: 'Các từ đã đoán',
		matchingLettersColumnHeader: 'Số ký tự trùng khớp'
	}
};

const getStringsByLanguage = (languageCode, stringKey, strings = languageStrings) => {
	if (!strings[languageCode] || !strings[languageCode][stringKey]) {
		//return default 'en' language
		return strings['en'][stringKey];
	}
	return strings[languageCode][stringKey];
};

export default {
	getStringsByLanguage
};
