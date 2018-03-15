
import {fromJS, List} from 'immutable';


import * as actions from '../actions';
import structure from '../structure';

export default function (state = structure.get('auth'), payload) {
	switch (payload.type) {
		case actions.AUTH_SIGNIN_USER_SUCCESS: {
			const user = fromJS(payload.user);
			return state.merge({user, datetime: new Date().getTime()});
		}
		case actions.AUTH_REFRESH_TOKEN_SUCCESS:
			return state.merge({token: payload.token, datetime: new Date().getTime()});
		case actions.AUTH_SIGNOUT_USER:
			return structure.get('auth');
		default:
			return state;
	}
}
