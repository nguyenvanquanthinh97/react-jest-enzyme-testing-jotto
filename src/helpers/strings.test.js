import stringsModule from './strings';

const { getStringsByLanguage } = stringsModule;

const strings = {
	en: { submit: 'Submit' },
	vi: { submit: 'Đoán' },
	ch: {}
};

describe('language string testing', () => {
	let mockConsoleWarn = jest.fn();
	const originalWarn = console.warn;

	beforeEach(() => {
		console.warn = mockConsoleWarn;
	});

	afterEach(() => {
		mockConsoleWarn.mockClear();
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('return correct submit string for english', () => {
		const string = getStringsByLanguage('en', 'submit', strings);
		expect(string).toBe('Submit');
		expect(mockConsoleWarn).not.toHaveBeenCalled();
	});

	test('return correct submit string for vietnamese', () => {
		const string = getStringsByLanguage('vi', 'submit', strings);
		expect(string).toBe('Đoán');
		expect(mockConsoleWarn).not.toHaveBeenCalled();
	});

	test('return english submit string when language does not exist', () => {
		const string = getStringsByLanguage('alien', 'submit', strings);
		expect(string).toBe('Submit');
		expect(mockConsoleWarn).toHaveBeenCalled();
	});

	test('return english submit string when submit language does not have that key', () => {
		const string = getStringsByLanguage('ch', 'submit', strings);
		expect(string).toBe('Submit');
		expect(mockConsoleWarn).toHaveBeenCalled();
	});
});
