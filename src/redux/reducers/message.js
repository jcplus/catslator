import {ADD_MESSAGE, REMOVE_MESSAGE} from '../actions/message';

const initialState = [];

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return [...state, action.payload];
		case REMOVE_MESSAGE:
			return state.filter((message) => message.id !== action.payload);
		default:
			return state;
	}
};

export default messageReducer;
