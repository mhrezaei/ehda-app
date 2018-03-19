import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';

import ConfigStore from './src/data/setup';
import {Provider} from 'react-redux';

import {View, Image, StyleSheet, ScrollView, StatusBar} from 'react-native';


import splash_src from './res/splash.png';


global.language = null;


import ActionBar from './src/ui/actionBar';
import Drawer from 'react-native-drawer'


import * as nav_methods from './src/data/nav/methods';
import Router from './src/ui/router';


import * as Factory from './src/factory';
import {trans} from "./src/i18";




class Splash extends Component {


    constructor(props) {
        super(props);
        this.store = null;
        this.state = {
            drawerOpen: false,
            drawerDisabled: false,
            loading: true,
            route: null
        };

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.goTo = this.goTo.bind(this);
        this.onChangeRoute = this.onChangeRoute.bind(this);
    }


    onChangeRoute(route){
        this.setState({route: route});
    }

    closeDrawer() {
        this.drawer.close()
    }

    openDrawer() {
        this.drawer.open()
    }

    componentDidMount() {
        this.setState({loading: true});
        ConfigStore().then((s) => {
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
                <View style={styles.container}>
                    <Image source={splash_src}/>
                </View>
            );
        } else {


            const routes = require('./src/routes').default;

            return (
                <Drawer
                    ref={(ref) => this.drawer = ref}
                    type="displace"
                    tapToClose={true}
                    openDrawerOffset={0.2}
                    panCloseMask={0.6}
                    closedDrawerOffset={-3}
                    styles={drawerStyles}
                    tweenHandler={(ratio) => ({
                        main: {opacity: (2 - ratio) / 2}
                    })}
                    side={"right"}
                    content={Factory.createMenuFromRoutes(routes, this.goTo)}
                >
                    <Provider store={this.store}>
                        <View style={styles.container_app}>
                            <ActionBar title={route ? route.title : trans('loading')} onPress={this.openDrawer}/>
                            <ScrollView style={styles.container_route}>
                                <Router routes={routes} onChange={this.onChangeRoute}/>
                            </ScrollView>
                        </View>
                    </Provider>

                </Drawer>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
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
        backgroundColor: '#F5FCFF',
    },
    container_route: {
        flex: 1,
        padding: 10
    },
    titleStyle:{
        fontFamily: 'IRANSans'
    }
});

const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 10},
    main: {backgroundColor:'#F5FCFF'},
};


AppRegistry.registerComponent('Card', () => Splash);
