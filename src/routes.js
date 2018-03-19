import {trans} from './i18'

export default {
    home: {
        title: trans('home'),
        icon: "home",
        component: require('./scenes/home/home').default
    },
    myCard: {
        title: trans('myCard'),
        icon: "profile",
        component: require('./scenes/my-card/myCard').default
    },
    cardList: {
        title: trans('myCards'),
        icon: "list",
        component: require('./scenes/cardList/cardList').default
    },
    news: {
        title: trans('news'),
        icon: "rss-feed",
        component: require('./scenes/news/news').default
    },
    about: {
        title: trans('aboutUs'),
        icon: "info",
        component: require('./scenes/about/about').default
    }
};