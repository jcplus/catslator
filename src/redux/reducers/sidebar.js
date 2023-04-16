import {SET_ACTIVE_SIDEBAR_BUTTON} from '../actions/sidebar';

const initialState = {
	activeSidebarButton: 'translator',
};

const sidebarReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVE_SIDEBAR_BUTTON:
			return {...state, activeSidebarButton: action.payload};
		default:
			return state;
	}
};

export default sidebarReducer;
