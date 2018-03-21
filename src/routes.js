import {trans} from './i18'

export default {
    home: {
        title: trans('home'),
        icon: "home",
        component: require('./scenes/home/home').default
    },
    homeForm2: {
        hidden: true,
        title: trans('home'),
        icon: "home",
        component: require('./scenes/homeForm2/homeForm2').default
    },
    myCard: {
        hidden: (state)=>{
            return state.auth.hasOwnProperty('cards') && state.auth.cards.length > 0;
        },
        title: trans('myCard'),
        icon: "account-box",
        component: require('./scenes/myCard/myCard').default
    },
    cardList: {
        hidden: (state)=>{
            return state.auth.hasOwnProperty('cards') && state.auth.cards.length > 0;
        },
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