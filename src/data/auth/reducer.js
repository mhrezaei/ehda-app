

import * as actions from '../types';
import structure from '../initialState';

export default function (state = structure.auth, payload) {
	switch (payload.type) {
		case actions.AUTH_CHECK_CODE_MELLI_SUCCESS: {
			return {
                ...state,
                datetime: new Date().getTime()
            };
		}
        case actions.AUTH_UPDATE_TOKEN:
			return {
                ...state,
                token: payload.token,
                datetime: new Date().getTime()
            };
		default:
			return state;
	}
}
