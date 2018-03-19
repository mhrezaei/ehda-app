import fa from './locales/fa';
import en from './locales/en';


const fallback = 'en';

const translations = {
    fa,
    en
};

export const to_fa = (input) => {
    if (!input)
        return '';
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.toString().replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};

export const to_en = (input) => {
    if (!input)
        return '';
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.toString().replace(/[۰|۱|۲|۳|۴|۵|۶|۷|۸|۹]/g, function (w) {
        return id.indexOf(w);
    });
};


const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj));

export const trans = (key, data) => {
    const keys = key.split('.');
    const translation = translations[global.language];
    const d = leaf(translation, key);
    let ok = d ? d : leaf(translations[fallback], key);
    if (data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];
                ok = ok.replace(new RegExp(`:${key}`, 'g'), item);
            }
        }
    }
    return typeof ok === 'string' ? localize_number(ok) : ok;

};

export const isRtl = ()=>{
    return global.language in ['fa', 'ar'];
};



export const localize_number = (num) => {
    if (global.language === 'fa') {
        return to_fa(num);
    } else {
        return to_en(num);
    }
};
