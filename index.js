/*
    Filename: index.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 3:36 AM

    Description: display a splash before configuring store.

    Issues:
        [x] render method had unusual behaviour with React.createElement, removing it fixed the problem.
        [ ] loading and initializing components after configuring store may lead application to unusual behaviour.

 */


import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import PropTypes from 'prop-types';



// See documentation for Configuring store.
import {ConfigStore} from "./core";


// Loading Store
import Store from './src/models';

// Loading Splash Screen
import Splash from './src/views/splash';


// this is our main element, application starts from here.
class Root extends Component {

    // this code allow us to pass store in each react element context,
    // store is an object that manages state of our application.
    // we use {Attach} and {Dispatcher} components to glue our application to store.
    // these functions are available at /core/
    static childContextTypes = {
        store: PropTypes.object
    };
    getChildContext() {
        return {
            store: this.state.store
        };
    }

    constructor(props) {
        super(props);
        // We must store two things, the Store and state of store being loaded, application must display
        // a Splash screen while we load the store, so we define a "loading" here.
        this.state = {
            loading: true,
            store: null,
        };
    }

    // When our main component did mounted.
    componentDidMount() {
        this.setState({loading: true});

        // Config store takes one element and that is the root store which points to Blueprints of data
        // blueprints are Javascript classes that contains Reducers, Action sets and methods, helping us
        // to better control over application procedures and handles data asynchronously.
        ConfigStore(Store).then((response) => {

            // After that Store loads completely, we start an startup call, which configure our app for first run.
            const Startup = require('./src/startup').default;
            if (Startup) Startup(response.state, response.store);

            // Then we load our application here, we must load it here after startup call, to prevent conflicting with
            // store not being loaded, we don't want data loss or unusual behavior.
            this.App = require('./src/views/app').default;

            // Done, store loaded successfully.
            this.setState({
                store: response.store,
                loading: false
            });
        });
    }

    render() {
        const {loading} = this.state;
        // We check if store is still loading or not to display a splash or load our application.
        if (loading) {
            return (<Splash/>);
        }
        else {
            const App = this.App;
            return (<App/>);
        }
    }
}

// This is where we register our application to ReactNative.
AppRegistry.registerComponent('EhdaApp', () => Root);
