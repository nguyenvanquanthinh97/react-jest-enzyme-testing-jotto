import React from 'react';

const SuccessContext = React.createContext();

/**
 * @function useSuccess
 * @returns {array} - SuccessContext value, which is a state of [value, settter].
 */
const useSuccess = () => {
	const context = React.useContext(SuccessContext);

	if (!context) {
		throw new Error('unSuccess must be used within a SuccessProvider');
	}

	return context;
};

/**
 * 
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.element} - Provider Component
 */
const SuccessProvider = (props) => {
	const [ success, setSuccess ] = React.useState(false);

	const value = React.useMemo(() => [ success, setSuccess ], [ success ]);
	return <SuccessContext.Provider value={value} {...props} />;
};

export default { useSuccess, SuccessProvider };
