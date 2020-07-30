import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';

/**
 * Create a testing store with imported rootReducer, middleware, initialState
 * @function factoryReducer
 * @param {object} initialState - Initial state for this store
 * @returns {Store} - redux store
 */
export const storeFactory = (initialState) => {
	return createStore(rootReducer, initialState, applyMiddleware(thunk));
};

/**
 * Returns ShallowWrapper which has 'data-test' attribute equal to 'val' props
 * @param {ShallowWrapper} wrapper - Enzyme ShallowWrapper needed to search from
 * @param {string} val - value which is used for searching 
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
};

/**
 * Factory function check propTypes of Component instead of throwing console.error
 * @param {ReactComponent} Component - React Component need to check propTypes
 * @param {object} conformingProps - props needed to check propTypes
 */
export const checkProps = (Component, conformingProps) => {
	const propErrorMsg = checkPropTypes(Component.propTypes, conformingProps, 'prop', Component.name);
	expect(propErrorMsg).toBeUndefined();
};
