/*
    Filename: src/models/index.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:45 AM

    Description: defines application data fragments.
 */


module.exports = {
    Ajax: require('./ajax').default,
    App: require('./app').default,
    Auth: require('./auth').default,
    Data: require('./data').default,
    History: require('./history').default,
    Navigation: require('./navigation').default,
};