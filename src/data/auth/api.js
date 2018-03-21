import codes from '../../api/codes';
import axios from '../../api/axios';

export function request_utc() {
    return axios('POST', 'server/time/utc');
}


export const getToken = (payload /* { username, password}*/) => {
    return axios('POST', 'getToken', {username: payload.username,password: payload.password});
};

export const checkSSN = (payload /* { token, code_melli}*/) => {
    return axios('POST', 'card/search', {code_melli: payload.password});
};


export const getCard = (payload /* { token, code_melli, tel_mobile, birth_date}*/) => {
    return new Promise((r, e) => {
        setTimeout(() => {
            const data = users.filter(x => x.code_melli === payload.code_melli && x.tel_mobile === payload.tel_mobile && x.birth_date === payload.birth_date);

            if (payload.token === someToken && data.length > 0) {
                r({
                    status: 200,
                    data: {
                        status: codes.OPERATION_SUCCEED,
                        image: {}
                    }
                });
            } else {
                r({
                    status: 200,
                    data: {
                        status: codes.USER_NOT_FOUND
                    }
                })
            }

        }, 200);
    });
};