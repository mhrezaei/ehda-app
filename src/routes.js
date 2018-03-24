import {trans} from './i18'


function shouldCardsExist(state) {
    return ;
}

export default {
    checkCard: {
        title: trans('checkCard'),
        icon: "home",
        component: require('./scenes/checkCard/checkCard').default
    },
    getCard: {
        visibility: false,
        title: trans('getCard'),
        condition: state => state.auth.temporary !== null,
        redirect: 'checkCard',
        icon: "account-box",
        component: require('./scenes/getCard/getCard').default
    },
    register: {
        visibility: false,
        title: trans('register'),
        component: require('./scenes/register/register').default
    },
    myCard: {
        visibility: state => state.auth.hasOwnProperty('cards') && Object.keys(state.auth.cards).length > 0 && state.auth.cards.hasOwnProperty(state.auth.pinned),
        condition: state => state.auth.hasOwnProperty('cards') && Object.keys(state.auth.cards).length > 0 ,
        redirect: 'checkCard',
        title: trans('myCard'),
        icon: "account-box",
        component: require('./scenes/myCard/myCard').default
    },
    cardList: {
        visibility: state => state.auth.hasOwnProperty('cards') && Object.keys(state.auth.cards).length > 0,
        condition: state => state.auth.hasOwnProperty('cards') && Object.keys(state.auth.cards).length > 0 ,
        redirect: 'checkCard',
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