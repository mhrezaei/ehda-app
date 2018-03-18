import {trans} from './i18'

export default {
    home: {
        title: trans('home'),
        icon: "home",
        component: require('./scenes/home/home').default
    },
    news: {
        title: trans('myCards'),
        icon: "list",
        component: require('./scenes/cardList/cardList').default
    },
    cardList: {
        title: trans('news'),
        icon: "feed",
        component: require('./scenes/news/news').default
    },
    about: {
        title: trans('aboutUs'),
        icon: "info",
        component: require('./scenes/about/about').default
    }
};