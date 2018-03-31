/*
    Filename: src/config/api.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:01 AM

    Description:
        here is EhdaApp bridge to api, using axios to handle connection.

 */


import axios from './axios';

export const getProvince = (payload) => {
    return axios('POST', 'province/get', payload);
};

export const getCities = (payload) => {
    return axios('POST', 'cities/get', payload);
};

export const getToken = (payload) => {
    return axios('POST', 'getToken', payload);
};

export const searchCard = (payload) => {
    return axios('POST', 'card/search', payload);
};

export const getCard = (payload) => {
    return axios('POST', 'card/get', payload)
};

export const registerCard = (payload) => {
    return axios('POST', 'card/register', payload)
};

export const download = (payload) => {
    return require('axios')({
        url: payload.url,
        responseType: 'arraybuffer',
    });
};