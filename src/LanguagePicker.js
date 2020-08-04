import React from 'react';
import PropTypes from 'prop-types';

const LanguagePicker = ({ setLanguage }) => {
	const languages = [ { lang: 'en', icon: '🇺🇸' }, { lang: 'vi', icon: '🇻🇳' } ];

	const languageIcons = languages.map((language) => (
		<span onClick={() => setLanguage(language.lang)} key={language.lang} data-test="language-icon">
			{language.icon}
		</span>
	));

	return <div data-test="component-language-picker">{languageIcons}</div>;
};

LanguagePicker.propTypes = {
	setLanguage: PropTypes.func.isRequired
};

export default LanguagePicker;
