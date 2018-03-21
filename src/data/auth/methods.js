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



export const getCardAsync = (code_melli, success, failed) => ({
    type: actions.AUTH_CHECK_CODE_MELLI_ASYNC,
    code_melli,
    success,
    failed
});

export const getCardSuccess = (code_melli) => ({
    type: actions.AUTH_CHECK_CODE_MELLI_SUCCESS,
    code_melli
});

export const getCardFailed = (status) => ({
    type: actions.AUTH_CHECK_CODE_MELLI_FAILED,
    status
});



export const updateToken = (token) => ({
	type: actions.AUTH_UPDATE_TOKEN,
	token
});
