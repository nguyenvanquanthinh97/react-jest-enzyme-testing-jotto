import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
	return <div data-test="component-input" />;
};

Input.propTypes = {
	secretWord: PropTypes.string.isRequired
};

export default Input;
