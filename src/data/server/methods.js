import * as actions from '../actions';

export const request_utc_async = () => ({
	type: actions.SERVER_REQUEST_UTC_ASYNC
});
export const request_utc_success = (utc) => ({
	type: actions.SERVER_REQUEST_UTC_SUCCESS,
	utc
});
export const request_utc_failed = () => ({
	type: actions.SERVER_REQUEST_UTC_FAILED
});
export const change_force_update = (value) => ({
	type: actions.SERVER_CHANGE_FORCE_UPDATE,
	value
});
