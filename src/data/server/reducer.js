import * as actions from '../actions';
import structure from '../structure';

export default function (state = structure.get('server'), payload) {
	switch (payload.type) {
		case actions.SERVER_CHANGE_FORCE_UPDATE:
			return state.merge({
				force_update: payload.value
			});
		case actions.SERVER_REQUEST_UTC_ASYNC:
			return state.merge({
				request_utc_at: new Date().getTime()
			});
		case actions.SERVER_REQUEST_UTC_SUCCESS: {
			const x1 = state.get('request_utc_at');
			const x2 = new Date().getTime();
			const s = new Date(payload.utc).getTime();
			return state.merge({
				request_utc_done_at: x2,
				requested_utc: s,
				utc_offset: (s - x1)
			});
		}
		default:
			return state;
	}
}
