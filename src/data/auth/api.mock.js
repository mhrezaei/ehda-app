import {timeout} from '../../helpers';
import codes from '../../api/codes';

const admin = [{
    'username': 'admin',
    'password': '123'
}];
const users = [{
    'code_ozviyat': '100',
    'name': 'aryan',
    'code_melli': '1900314584',
    'birth_date': '1374/06/18',
    'tel_mobile': '09364003675',
}, {
    'code_ozviyat': '101',
    'name': 'hamed',
    'code_melli': '1230019011',
    'birth_date': '1374/07/18',
    'tel_mobile': '09364003675',
}, {
    'code_ozviyat': '102',
    'name': 'arash',
    'code_melli': '1889087156',
    'birth_date': '1373/08/18',
    'tel_mobile': '09364003675',
}];

const someToken = 'TOKEN-ABCD';

export const getToken = (payload /* { username, password}*/) => {
    return new Promise((r, e) => {
        setTimeout(() => {
            const data = admin.filter(x => x.username === payload.username && x.password === payload.password);
            if (data.length > 0) {
                r({
                    status: 200,
                    data: {
                        status: codes.TOKEN_CREATED,
                        token: someToken
                    }
                });
            } else {
                r({
                    status: 200,
                    data: {
                        status: codes.TOKEN_CREATION_FAILED,
                    }
                })
            }

        }, 200);
    });
};

export const checkSSN = (payload /* { token, code_melli}*/) => {
    return new Promise((r, e) => {
        setTimeout(() => {
            const data = users.filter(x => x.code_melli === payload.code_melli);
            if (payload.token === someToken && data.length > 0) {
                r({
                    status: 200,
                    data: {
                        status: codes.CODE_MELLI_EXISTS
                    }
                });
            } else {
                r({
                    status: 200,
                    data: {
                        status: codes.NO_CARD_FOR_CODE_MELLI,
                    }
                })
            }

        }, 200);
    });
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