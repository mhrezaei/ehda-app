import React, {Component} from 'react';

import {connect} from 'react-redux';

import ConfigStore from './src/data/setup';
import {Provider} from 'react-redux';

import {AppRegistry, View, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity} from 'react-native';


global.language = null;


import {ActionBar, TextField, Drawer, Text} from './src/ui/components';


import * as nav_methods from './src/data/nav/methods';
import Router from './src/ui/router';


import * as Factory from './src/factory';
import {trans} from "./src/i18";


import theme from './src/theme';


import splash_small_src from './res/ehda-logo-small.png';
import splash_src from './res/splash.png';


class Splash extends Component {


    constructor(props) {
        super(props);
        this.store = null;
        this.state = {
            drawerOpen: false,
            drawerDisabled: false,
            loading: true,
            route: null,
            state: {}
        };

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.goTo = this.goTo.bind(this);
        this.onChangeRoute = this.onChangeRoute.bind(this);
        this.updateState = this.updateState.bind(this);
    }


    onChangeRoute(route) {
        this.setState({route: route});
    }

    closeDrawer() {
        this.drawer.close()
    }

    openDrawer() {
        this.drawer.open()
    }

    updateState(state) {
        //console.log({action: state.history.last_action, state: state});
        this.setState({
            ajaxRequests: state.ajax.ajax,
            ajaxInternet: state.ajax.internet,
            state: state,
        });
    }

    componentDidMount() {
        this.setState({loading: true});
        ConfigStore(this.updateState).then((s) => {
            this.store = s;
            this.setState({loading: false});
        });

    }

    goTo(page) {
        const {loading} = this.state;

        if (!loading) {
            this.store.dispatch(nav_methods.goto(page));
            this.closeDrawer();
        }
    }

    render() {
        const {loading, route} = this.state;

        if (loading) {
            return (
                <View style={styles.container_splash}>
                    <Image source={splash_src}/>
                </View>
            );
        } else {


            const routes = require('./src/routes').default;


            const auth = this.state.state.auth;
            let title = null;
            try {
                title = auth.pinned ? auth.cards[auth.pinned].info.ehda_card_details.full_name : ' ';
            }catch (x){}

            return (
                <Provider store={this.store}>
                    <Drawer
                        ref={(ref) => this.drawer = ref}
                        type="displace"
                        tapToClose={true}
                        openDrawerOffset={0.15}
                        panCloseMask={0.6}
                        closedDrawerOffset={-3}
                        styles={drawerStyles}
                        tweenHandler={(ratio) => ({
                            main: {opacity: (2 - ratio) / 2}
                        })}
                        side={"right"}
                        content={Factory.createMenuFromRoutes(routes, this.state.state, this.goTo, title, splash_small_src)}
                    >

                        <View style={styles.container_app}>
                            <ActionBar name={trans('app')} loading={this.state.ajaxRequests > 0}
                                       title={route ? route.title : trans('loading')}
                                       onPress={this.openDrawer}/>
                            {!this.state.ajaxInternet && <TouchableOpacity style={styles.noNetBar} onPress={() => {

                                try {
                                    this.store.dispatch(this.state.state.history.last_async);
                                } catch (x) {
                                }
                            }
                            }>
                                <View style={styles.noNetBar_direct}>
                                    <Text invert>{trans('noInternet')}</Text>
                                </View>
                            </TouchableOpacity>}
                            <Router routes={routes} onChange={this.onChangeRoute}/>
                        </View>
                    </Drawer>
                </Provider>
            );
        }
    }
}

//


const styles = StyleSheet.create({
    container_splash: {
        marginTop: 25,
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_app: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.background,
    },
    container_route: {
        flex: 1,
        padding: 10
    },
    titleStyle: {
        fontFamily: theme.font
    },
    noNetBar: {
        backgroundColor: theme.accent,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    noNetBar_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
});

const drawerStyles = {
    drawer: {},
    main: {backgroundColor: theme.black},
};


AppRegistry.registerComponent('temp', () => Splash);
