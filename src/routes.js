import {trans} from './i18'


function shouldCardsExist(state) {
    return state.auth.hasOwnProperty('cards') && state.auth.cards.length > 0;
}
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
    register: {
        hidden: true,
        title: trans('register'),
        component: require('./scenes/register/register').default
    },
    myCard: {
        hidden: shouldCardsExist,
        title: trans('myCard'),
        icon: "account-box",
        component: require('./scenes/myCard/myCard').default
    },
    cardList: {
        hidden: shouldCardsExist,
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