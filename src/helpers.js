export const filter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key], key))
        .reduce((res, key) => (res[key] = obj[key], res), {});

export const timeout = ms => new Promise(res => setTimeout(res, ms));