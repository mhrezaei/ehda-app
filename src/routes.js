import {Translate, Helpers} from '../core/index'

export const Routes = {
    searchCard: {
        title: Translate('searchCard'),
        icon: "home",
        component: require('./scenes/searchCard').default
    },
    getCard: {
        visibility: false,
        redirect: function (redux) {
            if(!Helpers.leaf(redux, 'navigation.props.codeMelli'))
                return 'searchCard';
        },
        title: Translate('getCard'),
        icon: "account-box",
        component: require('./scenes/getCard').default
    },
    registerCard: {
        visibility: false,
        title: Translate('registerCard'),
        component: require('./scenes/registerCard').default
    },
    myCard: {
        visibility: function (redux) {
            return Object.keys(Helpers.leaf(redux, 'auth.cards')).length > 0 && Helpers.leaf(redux, 'auth.pinned');
        },
        redirect: function (redux) {
            if(Object.keys(Helpers.leaf(redux, 'auth.cards')).length === 0)
                return 'searchCard';
            else if(!Helpers.leaf(redux, 'auth.pinned'))
                return 'cardList';
        },
        title: Translate('myCard'),
        icon: "account-box",
        component: require('./scenes/myCard').default
    },
    cardList: {
        visibility: function (redux) {
            return Object.keys(Helpers.leaf(redux, 'auth.cards')).length > 0;
        },
        redirect: function (redux) {
            if(Object.keys(Helpers.leaf(redux, 'auth.cards')).length === 0)
                return 'searchCard';
        },
        title: Translate('myCards'),
        icon: "list",
        //component: require('./scenes/cardList/cardList').default
    },
    news: {
        title: Translate('news'),
        icon: "rss-feed",
        //component: require('./scenes/news/news').default
    },
    about: {
        title: Translate('aboutUs'),
        icon: "info",
        //component: require('./scenes/about/about').default
    }
};