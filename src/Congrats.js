import React from 'react';

import LanguageContext from './contexts/LanguageContext';
import SuccessContext from './contexts/SuccessContext';
import stringsHelper from './helpers/strings';
/**
 * Functional React Component to render congrats message
 * @function
 * @return {JSX.Element} - Rendered Component (or null if 'success' props is false)
 */
const Congrats = () => {
	const [ success ] = SuccessContext.useSuccess();
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

export default Congrats;
