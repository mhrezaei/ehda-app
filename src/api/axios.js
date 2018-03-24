import axios from 'axios';
import {AsyncStorage} from 'react-native';
// load api address from url.js
import path from './url';

export const axios_instance = axios.create({
    baseURL: path,
    timeout: 20000,
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
});

// create
export default async function(method, route, params={}) {
    // send pi request
    try {
        const result = await axios_instance({
            method,
            url: route,
            params
        });
        // return valid response
        return {status: result.status, data: result.data};
    }
    catch(e)
    {
        // return invalid response
        return {status: e.response.status, data: e.response.data};
    }
};
