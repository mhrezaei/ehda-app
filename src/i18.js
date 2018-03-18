import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';
import fa from './locales/fa';
import en from './locales/en';

I18n.fallbacks = true;

I18n.translations = {
    en,
    fa,
};

I18nManager.allowRTL(I18n.locale in I18n.translations);

I18n.start  = I18nManager.isRTL ? 'right' : 'left';
I18n.end    = I18nManager.isRTL ? 'left' : 'right';

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

export const trans = (term) => {
    return I18n.t(term)
};



export const localize_number = (num) => {
    if (global.language === 'fa') {
        return to_fa(num);
    } else {
        return to_en(num);
    }
};


export default I18n;