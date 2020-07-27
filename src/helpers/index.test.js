import { getLetterMatchCount } from './';

describe('getLetterMatchCount', () => {
	const secretWord = 'party';
	test('return correct matching count when there are no matching letters', () => {
		const matchingCount = getLetterMatchCount('bones', secretWord);
		expect(matchingCount).toBe(0);
	});
	test('return correct matching count when there are 3 matching letters', () => {
		const matchingCount = getLetterMatchCount('train', secretWord);
		expect(matchingCount).toBe(3);
	});
	test('return correct matching count when there are multi duplicated matching letters', () => {
		const matchingCount = getLetterMatchCount('traint', secretWord);
		expect(matchingCount).toBe(3);
	});
});
