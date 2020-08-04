import React from 'react';
import PropTypes from 'prop-types';

import LanguageContext from './contexts/LanguageContext';
import stringsHelper from './helpers/strings';
/**
 * Functional React Component to render congrats message
 * @function
 * @return {JSX.Element} - Rendered Component (or null if 'success' props is false)
 */
const Congrats = ({ success }) => {
	const language = React.useContext(LanguageContext);
	let content, classNames;
	if (success) {
		classNames = 'alert alert-success';
		content = <h5>{stringsHelper.getStringsByLanguage(language, 'congrats')}</h5>;
	}
	return (
		<div className={classNames} data-test="component-congrats">
			<div data-test="congrats-message">{content}</div>
		</div>
	);
};

Congrats.propTypes = {
	success: PropTypes.bool.isRequired
};

export default Congrats;
