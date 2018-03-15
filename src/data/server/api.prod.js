import axios from '../../api/axios';

export function request_utc() {
	return axios('POST', 'server/time/utc');
}
