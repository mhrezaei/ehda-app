import {Buffer} from 'buffer';

export const filter = (obj, predicate) => Object.keys(obj).filter(key => predicate(obj[key], key)).reduce((res, key) => (res[key] = obj[key], res), {});

export const timeout = ms => new Promise(res => setTimeout(res, ms));

export const leaf = (obj, path, def=null) => path.split('.').reduce((value, el) => value ? value[el] : def, obj) || def;


export const flatten = (obj) => Object.keys(obj).map(key => {
    return {key: key, value: obj[key]}
});

export const encodeFile = (type, base64) => 'data:' + type + ';base64,' + Buffer.from(base64, 'binary').toString('base64');

export const encodeImage = (response) => 'data:' + response.headers['content-type'] + ';base64,' + Buffer.from(response.data, 'binary').toString('base64');

export const decodeFile = (base64) => {
    return {uri: base64}
};

export const keysToSave = (offline, data) => filter(data, (v, k) => offline.includes(k));

export const matchAction = (action, offline) => action && offline.includes(action.substring(0, action.indexOf('_')).toLowerCase());

export function now()
{
    const nw = new Date();
    const time = nw.getTime();
    let offset = nw.getTimezoneOffset();
    offset = offset * 60000;
    return time - offset;
}

export function date(from)
{
    const nw = new Date(from);
    const time = nw.getTime();
    let offset = nw.getTimezoneOffset();
    offset = offset * 60000;
    return time - offset;
}



export const min = (a, b) => a > b ? b : a;
export const max = (a, b) => a > b ? a : b;

export const clamp = (a, min, max) => a > max ? max : ( a < min ? min : a);

export const checkCodeMelli = (c) => {
    const code = c.toString();
    if (code.length !== 10)
        return false;

    const chars = code.split('');
    const C = parseInt(chars[9].toString());
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(chars[i].toString()) * (10-i);
    }
    const R = sum % 11;

    if(R < 2) return C === R;
    else return C === (11-R);

};