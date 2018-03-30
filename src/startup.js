import {Translate,Helpers} from '../core';
import {APP_LANGUAGE, APP_LOCALES} from "../core/i18";

const Locales = {
    fa: require('./locales/fa').default,
    en: require('./locales/en').default,
};


import {Navigation} from './redux';
export default function (state, store) {

    const lang = Helpers.leaf(state, 'app.lang');
    global[APP_LANGUAGE] = lang;
    global[APP_LOCALES] = Locales[lang];

    //store.dispatch(Navigation.goTo('registerCard'));
}