export default {
    home: {
        title: "Home",
        component: require('./scenes/home/home.js').default
    },
    news: {
        title: "My Cards",
        component: require('./scenes/cardList/cardList.js').default
    },
    cardList: {
        title: "News",
        component: require('./scenes/news/news.js').default
    },
    about: {
        title: "About",
        component: require('./scenes/about/about.js').default
    }
}