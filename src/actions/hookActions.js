import axios from 'axios';

const jotto_server = 'https://random-guessed-words.herokuapp.com/';

export const getSecretWord = async (setSecretWord) => {
	const response = await axios.get(jotto_server);

	setSecretWord(response.data);
};

export default {
	getSecretWord
};
