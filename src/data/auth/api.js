import codes from '../../api/codes';
import axios from '../../api/axios';


export const getToken = (payload /* { username, password}*/) => {
    return axios('POST', 'getToken', {username: payload.username, password: payload.password});
};

export const checkSSN = (payload /* { token, code_melli}*/) => {
    return axios('POST', 'card/search', {token: payload.token, code_melli: payload.code_melli});
};

export const getCard = (payload /* { token, code_melli, tel_mobile, birth_date}*/) => {
    return axios('POST', 'card/get', {
        token: payload.token,
        code_melli: payload.code_melli,
        tel_mobile: payload.tel_mobile,
        birth_date: payload.birth_date
    })
};


export const register = (payload /* { token, code_melli, tel_mobile, birth_date,gender, name_first, name_last, name_father, home_city}*/) => {
    return axios('POST', 'card/register', {
        token: payload.token,
        code_melli: payload.code_melli,
        tel_mobile: payload.tel_mobile,
        birth_date: payload.birth_date,
        gender: payload.gender,
        name_first: payload.name_first,
        name_last: payload.name_last,
        name_father: payload.name_father,
        home_city: payload.home_city,
    })
};