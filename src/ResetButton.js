import React from 'react';

const ResetButton = ({ resetHandler }) => {
	return (
		<button onClick={resetHandler} className="btn btn-success mb-2" data-test="reset-button">
			New Word
		</button>
	);
};

export default ResetButton;
