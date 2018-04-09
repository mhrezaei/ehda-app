/*
    Filename: src/startup.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 3:43 AM

    Description: startup call after loading Store.

    Issues:
        [ ] saving languages to global variable may not be an intelligence way to handle localization but it works.

 */


import {Helpers} from '../core';
import {APP_LANGUAGE, APP_LOCALES} from "../core/i18";

import {Navigation} from './models';


// Load locales from local directory.
// you must keep this pattern for other languages too.
const Locales = {
    fa: require('./locales/fa').default,
    en: require('./locales/en').default,
};

export default function (state, store) {

    // Loading application stored language from memory.
    const lang = Helpers.leaf(state, 'app.lang');
    global[APP_LANGUAGE] = lang;
    global[APP_LOCALES] = Locales[lang];
    const loadRoutes = require('./routes').Routes;
    store.dispatch(Navigation.defineRoutes(loadRoutes));
    store.dispatch(Navigation.goTo('myCard'));
}