export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const addMessage = (text) => ({
	type: ADD_MESSAGE,
	payload: text,
});

export const removeMessage = (id) => ({
	type: REMOVE_MESSAGE,
	payload: id,
});
