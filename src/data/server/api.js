
/*
export function request_utc() {
	return axios('POST', 'server/time/utc');
}

*/

import axios from '../../api/axios';

export const getProvinceList = (payload /* {token}*/) => {
    return axios('POST', 'province/get', {token: payload.token});
};

export const getCitiesList = (payload /* {token, province}*/) => {
    return axios('POST', 'cities/get', {token: payload.token, province: payload.province});
};
