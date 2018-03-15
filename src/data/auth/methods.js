import * as actions from '../actions';

export const signin_user_async = (user, done, error) => ({
	type: actions.AUTH_SIGNIN_USER_ASYNC,
	user,
	done,
	error
});

export const signin_user_success = (user) => ({
	type: actions.AUTH_SIGNIN_USER_SUCCESS,
	user
});
export const signin_user_failed = (error) => ({
	type: actions.AUTH_SIGNIN_USER_FAILED,
	error
});

export const refresh_token_success = (token) => ({
	type: actions.AUTH_REFRESH_TOKEN_SUCCESS,
	token
});

export const signout_user = () => ({
	type: actions.AUTH_SIGNOUT_USER
});
