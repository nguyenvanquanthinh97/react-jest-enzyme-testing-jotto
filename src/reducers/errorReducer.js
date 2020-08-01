import { actionTypes } from '../actions';

const initialState = {
	isError: false,
	message: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SERVER_ERROR: {
			return {
				isError: true,
				message: action.payload
			};
		}
		default:
			return state;
	}
};
