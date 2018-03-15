import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {AsyncStorage} from 'react-native';




import {fromJS} from 'immutable';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import lang from './src/app/lang';
import async_root from './src/data/async';
import configure_store from './src/data/store';
import structure from './src/data/structure';
import * as actions from './src/data/actions';
import * as server_methods from './src/data/server/methods';
import {Provider, connect} from 'react-redux';




// apply route middleware
const route_middleware = routerMiddleware();
const async_middleware = createSagaMiddleware();


async function configStore(){
    const data = JSON.parse(await AsyncStorage.getItem('application-state'));

    if (!data && structure.has('auth')) {
        await AsyncStorage.setItem('application-state', JSON.stringify({auth: structure.get('auth').toJS()}));
    }

    const persisted_state = JSON.parse(await AsyncStorage.getItem('application-state'));

    const store = configure_store(route_middleware, async_middleware, fromJS(persisted_state));

    store.subscribe(async () => {
        const state = store.getState();
        const payload = state.getIn(['app', 'last_action']);
        switch (payload) {
            case actions.AUTH_REFRESH_TOKEN_SUCCESS:
                await AsyncStorage.setItem('application-token', state.getIn(['auth', 'token']));
                break;
        }
        if (payload && payload.startsWith('AUTH')) {
            await AsyncStorage.setItem('application-state', JSON.stringify({auth: state.get('auth').toJS()}));
        }
    });

    async_middleware.run(async_root);
    store.dispatch(server_methods.request_utc_async());
}


configStore();


import {NativeRouter, Route, Link} from 'react-router-native';


const Home = () => (
    <Text style={styles.header}>
        Home
    </Text>
);

const About = () => (
    <Text style={styles.header}>
        About
    </Text>
);

const Topic = ({match}) => (
    <Text style={styles.topic}>
        {match.params.topicId}
    </Text>
);


const Topics = ({match}) => (
    <View>
        <Text style={styles.header}>Topics</Text>
        <View>
            <Link
                to={`${match.url}/rendering`}
                style={styles.subNavItem}
                underlayColor='#f0f4f7'>
                <Text>Rendering with React</Text>
            </Link>
            <Link
                to={`${match.url}/components`}
                style={styles.subNavItem}
                underlayColor='#f0f4f7'>
                <Text>Components</Text>
            </Link>
            <Link
                to={`${match.url}/props-v-state`}
                style={styles.subNavItem}
                underlayColor='#f0f4f7'>
                <Text>Props v. State</Text>
            </Link>
        </View>

        <Route path={`${match.url}/:topicId`} component={Topic}/>


        <Route exact path={match.url} render={() => (
            <Text style={styles.topic}>Please select a topic.</Text>
        )}/>
    </View>
);

type Props = {};
class App extends Component<Props> {
    render() {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <View style={styles.nav}>
                        <Link
                            to="/"
                            underlayColor='#f0f4f7'
                            style={styles.navItem}>
                            <Text>Home</Text>
                        </Link>
                        <Link
                            to="/about"
                            underlayColor='#f0f4f7'
                            style={styles.navItem}>
                            <Text>About</Text>
                        </Link>
                        <Link
                            to="/topics"
                            underlayColor='#f0f4f7'
                            style={styles.navItem}>
                            <Text>Topics</Text>
                        </Link>
                    </View>

                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                </View>
            </NativeRouter>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10,
    },
    header: {
        fontSize: 20,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: 'center',
        fontSize: 15,
    }
});

export default App;