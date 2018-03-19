import axios from '../../api/axios';

export function login_user(user) {
	return axios('POST', 'auth/login', user);
}
