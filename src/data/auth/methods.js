import * as actions from '../types';

export const checkCodeMelliAsync = (code_melli, success, failed) => ({
	type: actions.AUTH_CHECK_CODE_MELLI_ASYNC,
    code_melli,
    success,
    failed
});

export const checkCodeMelliSuccess = (code_melli) => ({
    type: actions.AUTH_CHECK_CODE_MELLI_SUCCESS,
    code_melli
});

export const checkCodeMelliFailed = (status) => ({
	type: actions.AUTH_CHECK_CODE_MELLI_FAILED,
    status
});



export const getCardAsync = (code_melli, birth_date, tel_mobile, success, failed) => ({
    type: actions.AUTH_GET_CARD_ASYNC,
    code_melli, birth_date, tel_mobile,
    success,
    failed
});

export const getCardSuccess = (data) => ({
    type: actions.AUTH_GET_CARD_SUCCESS,
    data
});

export const getCardFailed = (status) => ({
    type: actions.AUTH_GET_CARD_FAILED,
    status
});




export const registerAsync = (code_melli, birth_date, tel_mobile, gender, name_first, name_last, name_father, home_city, success, failed) => ({
    type: actions.AUTH_REGISTER_ASYNC,
    code_melli, birth_date, tel_mobile, gender, name_first, name_last, name_father, home_city,
    success,
    failed
});

export const registerSuccess = (data) => ({
    type: actions.AUTH_REGISTER_SUCCESS,
    data
});

export const registerFailed = (status) => ({
    type: actions.AUTH_REGISTER_FAILED,
    status
});






export const requestTokenAsync = () => ({
    type: actions.AUTH_REQUEST_TOKEN_ASYNC
});


export const requestTokenSuccess = (token) => ({
    type: actions.AUTH_REQUEST_TOKEN_SUCCESS,
    token
});


export const requestTokenFailed = () => ({
    type: actions.AUTH_REQUEST_TOKEN_FAILED
});


export const updateToken = (token) => ({
	type: actions.AUTH_UPDATE_TOKEN,
	token
});
