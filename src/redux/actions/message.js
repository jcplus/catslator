export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';

export const addMessage = (text) => (dispatch, getState) => {
	const lifespan = 3000;
	const { messages } = getState();
	const existingMessage = messages.find((message) => message.text === text);

	if (existingMessage) {
		clearTimeout(existingMessage.timer);

		const updatedMessages = messages.map((message) =>
			message.id === existingMessage.id
				? {
					...message,
					timer: setTimeout(() => {
						dispatch(removeMessage(existingMessage.id));
					}, lifespan),
				}
				: message
		);

		dispatch({ type: UPDATE_MESSAGES, payload: updatedMessages });
		return;
	}

	const newMessage = {
		text,
		id: Date.now(),
		timer: setTimeout(() => {
			dispatch(removeMessage(newMessage.id));
		}, lifespan),
	};

	dispatch({ type: ADD_MESSAGE, payload: newMessage });
};


export const removeMessage = (id) => ({
	type: REMOVE_MESSAGE,
	payload: id,
});
