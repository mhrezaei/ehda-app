import {Helpers} from './index';

import CoreLocales from './locales';

export const APP_LANGUAGE = 'APP_LANGUAGE';
export const APP_LOCALES = 'APP_LOCALES';


export const NumToFa = (input) => {
    if (!input)
        return '';
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.toString().replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};

export const NumToEn = (input) => {
    if (!input)
        return '';
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.toString().replace(/[۰|۱|۲|۳|۴|۵|۶|۷|۸|۹]/g, function (w) {
        return id.indexOf(w);
    });
};


export const LocalizeNumber = (num) => {
    if (IsRtl()) {
        return NumToFa(num);
    } else {
        return NumToEn(num);
    }
};


export const Translate = (key, data) => {
    const locales = {
        ...CoreLocales[global[APP_LANGUAGE]],
        ...(global[APP_LOCALES] || {})
    };
    let d = Helpers.leaf(locales, key);
    if (data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];
                d = d.replace(new RegExp(`:${key}`, 'g'), item);
            }
        }
    }
    return typeof d === 'string' ? LocalizeNumber(d) : d;

};

export const IsRtl = () => {
    return ['fa', 'ar'].includes(global[APP_LANGUAGE]);
};

