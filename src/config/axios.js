
import axios from 'axios';

const url = "https://ehda.center/api/ehda/";
const timeout = 10000;

export const axiosInstance = axios.create({
    baseURL: url,
    timeout: timeout,
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
});

export default async function(method, route, params={}) {
    try {
        const result = await axiosInstance({
            method,
            url: route,
            params
        });
        return {status: result.status, data: result.data};
    } catch(e) {
        return {status: e.response.status, data: e.response.data};
    }
};
