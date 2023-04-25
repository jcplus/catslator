// src/redux/reducers/message.js
import { ADD_MESSAGE, REMOVE_MESSAGE, UPDATE_MESSAGES } from '../actions/message';

const initialState = [];

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return [...state, action.payload];
		case REMOVE_MESSAGE:
			return state.filter((message) => message.id !== action.payload);
		case UPDATE_MESSAGES:
			return action.payload;
		default:
			return state;
	}
};

export default messageReducer;