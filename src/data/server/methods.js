import * as actions from '../types';

/*
export const request_utc_async = () => ({
	type: actions.SERVER_REQUEST_UTC_ASYNC
});
export const request_utc_success = (utc) => ({
	type: actions.SERVER_REQUEST_UTC_SUCCESS,
	utc
});
export const request_utc_failed = () => ({
	type: actions.SERVER_REQUEST_UTC_FAILED
});


export const change_force_update = (value) => ({
	type: actions.SERVER_CHANGE_FORCE_UPDATE,
	value
});

*/


export const getProvinceListAsync = () => ({
    type: actions.SERVER_GET_PROVINCES_LIST_ASYNC
});

export const getProvinceListSuccess = (provinceList) => ({
    type: actions.SERVER_GET_PROVINCES_LIST_SUCCESS,
    provinceList
});

export const getProvinceListFailed = () => ({
    type: actions.SERVER_GET_PROVINCES_LIST_FAILED
});



export const getCitiesListAsync = (province) => ({
    type: actions.SERVER_GET_CITIES_LIST_ASYNC,
    province
});

export const getCitiesListSuccess = (province, citiesList) => ({
    type: actions.SERVER_GET_CITIES_LIST_SUCCESS,
    province,
    citiesList
});

export const getCitiesListFailed = () => ({
    type: actions.SERVER_GET_CITIES_LIST_FAILED
});

