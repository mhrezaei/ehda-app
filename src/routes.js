/*
    Filename: src/routes.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:06 AM

    Description:
        defines routing and navigation of application. each route has [5] attributes

        [route key] :  {
            // to get shown on Drawer or not
            // must be [Boolean] or you can define a function, routers will call it with Redux State as an argument.
            visibility: true  or  (state) => { return true or false},

            // to stay on route or must redirect to somewhere else depends on state of application
            // must be  a function, routers will call it with Redux State as an argument.
            redirect: (state) => { return an another route key },

            // display title of router
            title: must be a string,

            // icon shown on Drawer
            icon: must be an icon name, specifically must be MaterialIcon,

            // component attached to route
            component: must be an react component, you can use require(' .. some .. ').default to import components.
        }

 */


import {Translate, Helpers} from '../core/index'
import {Dialog} from './models'

export const Routes = {
    searchCard: {
        title: Translate('searchCard'),
        back: 'myCard',
        icon: "home",
        component: require('./views/searchCard').default
    },
    getCard: {
        visibility: false,
        back: 'searchCard',
        redirect: function (redux) {
            // redirect back to searchCard because there is no data provided with route.
            if(Helpers.leaf(redux, 'navigation.props.codeMelli', null) === null)
                return 'searchCard';
        },
        title: Translate('getCard'),
        icon: "account-box",
        component: require('./views/getCard').default
    },
    registerCard: {
        back: 'searchCard',
        visibility: false,
        title: Translate('registerCard'),
        component: require('./views/registerCard').default
    },
    myCard: {
        back: null,
        visibility: function (redux) {
            // must not show this link when there is no card available !
            return Object.keys(Helpers.leaf(redux, 'auth.cards')).length > 0 && Helpers.leaf(redux, 'auth.pinned');
        },
        redirect: function (redux) {
            // redirect to searchCard when there is no card available.
            if(Object.keys(Helpers.leaf(redux, 'auth.cards')).length === 0)
                return 'searchCard';
            // check if there is no pinned card available then return to cards
            else if(!Helpers.leaf(redux, 'auth.pinned', null))
                return 'myCards';
        },
        title: Translate('myCard'),
        icon: "account-box",
        component: require('./views/myCard').default
    },
    myCards: {
        back: 'myCard',
        actions: [
            {
                icon: "search",
                action: function (dispatch, state) {
                    dispatch(Dialog.openSearch());
                }
            },
        ],
        visibility: function (redux) {
            // must not show this link when there is no card available !
            return Object.keys(Helpers.leaf(redux, 'auth.cards')).length > 0;
        },
        redirect: function (redux) {
            // redirect to searchCard when there is no card available.
            if(Object.keys(Helpers.leaf(redux, 'auth.cards')).length === 0)
                return 'searchCard';
        },
        title: Translate('myCards'),
        icon: "list",
        component: require('./views/myCards').default
    },
    news: {
        back: 'myCard',
        title: Translate('news'),
        icon: "rss-feed",
        component: require('./views/news').default
    },

    newsPage: {
        back: 'news',
        visibility: false,
        title: Translate('news'),
        icon: "rss-feed",
        component: require('./views/newsPage').default
    },
    contact: {
        back: 'myCard',
        title: Translate('contactUs'),
        icon: "phone",
        component: require('./views/contact').default
    },
    about: {
        back: 'myCard',
        title: Translate('aboutUs'),
        icon: "info",
        component: require('./views/about').default
    }
};