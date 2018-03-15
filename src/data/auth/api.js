import axios from '../../api/axios';

export function create_token(user) {
	return axios('POST', 'auth/login', user);
}
