import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {AppRegistry} from 'react-native';
import {ConfigStore} from "./core";
import Store from './src/redux';
import Splash from './src/scenes/splash';
import Text from "./core/ui/text";

class Root extends Component {
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
        this.state = {
            loading: true,
            store: null,
        };

    }

    componentDidMount() {
        this.setState({loading: true});
        ConfigStore(Store).then((response) => {

            const Startup = require('./src/startup').default;
            if (Startup) Startup(response.state, response.store);
            this.App = require('./src/scenes/app').default;

            this.setState({
                store: response.store,
                loading: false
            });

        });
    }

    render() {
        const {loading} = this.state;
        if (loading) {
            return (<Splash/>);
        }
        else {
            const App = this.App;
            return (<App/>);
        }
    }
}

AppRegistry.registerComponent('EhdaApp', () => Root);
