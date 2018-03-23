import {trans} from './i18'


function shouldCardsExist(state) {
    return ;
}

export default {
    home: {
        title: trans('home'),
        icon: "home",
        component: require('./scenes/home/home').default
    },
    getCard: {
        hidden: true,
        title: trans('getCard'),
        icon: "account-box",
        component: require('./scenes/getCard/getCard').default
    },
    register: {
        hidden: true,
        title: trans('register'),
        component: require('./scenes/register/register').default
    },
    myCard: {
        condition: state => state.auth.hasOwnProperty('cards') && Object.keys(state.auth.cards).length > 0,
        title: trans('myCard'),
        icon: "account-box",
        component: require('./scenes/myCard/myCard').default
    },
    cardList: {
        condition: state => state.auth.hasOwnProperty('cards') && Object.keys(state.auth.cards).length > 1,
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