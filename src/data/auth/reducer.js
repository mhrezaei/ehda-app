

import * as actions from '../actions';
import structure from '../structure';

export default function (state = structure.auth, payload) {
	switch (payload.type) {
		case actions.AUTH_SIGNIN_USER_SUCCESS: {
			return {
                ...state,
                user: payload.user,
                datetime: new Date().getTime()
            };
		}
        case actions.AUTH_REFRESH_TOKEN_SUCCESS:
			return {
                ...state,
                token: payload.token,
                datetime: new Date().getTime()
            };
		case actions.AUTH_SIGNOUT_USER:
			return structure.auth;
		default:
			return state;
	}
}
