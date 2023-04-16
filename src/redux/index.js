import {configureStore, combineReducers} from '@reduxjs/toolkit';
import messageReducer from './reducers/message';
import sidebarReducer from './reducers/sidebar';

export * from './actions/message';
export * from './actions/sidebar';

const rootReducer = combineReducers({
	messages: messageReducer,
	sidebar: sidebarReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
