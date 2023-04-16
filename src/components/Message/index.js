// src/components/Message/index.js
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {addMessage, removeMessage} from '../../redux/actions/messageActions';
import MessageContext from '../../MessageContext';
import './Message.css';

const Message = ({messages, addMessage, removeMessage, timeout = 5000}) => {
	const messageContextValue = {
		addMessage,
		removeMessage,
	};

	return (
		<MessageContext.Provider value={messageContextValue}>
			<div className="message-container">
				{messages.map((message) => (
					<div key={message.id} className="message">
						{message.text}
					</div>
				))}
			</div>
		</MessageContext.Provider>
	);
};

const mapStateToProps = (state) => ({
	messages: state.messages,
});

const mapDispatchToProps = {
	addMessage,
	removeMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
