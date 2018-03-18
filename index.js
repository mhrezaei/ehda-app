import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';

import ConfigStore from './src/data/setup';
import {Provider} from 'react-redux';

import {View, Image, StyleSheet} from 'react-native';


import splash_src from './splash.png';


global.language = null;


import Home from './src/scenes/home/home';
import Menu from './src/ui/menu';
import ActionBar from 'react-native-action-bar';
import Drawer from 'react-native-drawer'


import Router from './src/ui/router';


import * as Factory from './src/factory';


class Splash extends Component {


    constructor(props) {
        super(props);
        this.store = null;
        this.state = {
            drawerOpen: false,
            drawerDisabled: false,
            loading: true
        };

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }


    closeDrawer() {
        this._drawer.close()
    };

    openDrawer() {
        this._drawer.open()
    };

    componentDidMount() {
        this.setState({loading: true});
        ConfigStore().then((s) => {
            this.store = s;
            this.setState({loading: false});
        });

    }

    render() {
        const {loading} = this.state;

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
                    ref={(ref) => this._drawer = ref}
                    type="overlay"
                    tapToClose={true}
                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                    panCloseMask={0.6}
                    closedDrawerOffset={-3}
                    styles={drawerStyles}
                    tweenHandler={(ratio) => ({
                        main: { opacity:(2-ratio)/2 }
                    })}
                    side={"right"}
                    content={Factory.createMenuFromRoutes(routes)}
                >
                    <Provider store={this.store}>
                        <View style={styles.container_app}>
                            <ActionBar
                                containerStyle={styles.bar}

                                title={'Hello'}
                                rightIcons={[
                                    {
                                        name: 'menu',
                                        onPress: this.openDrawer,
                                    }
                                ]}
                            />

                            <Router routes={routes}/>
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
        backgroundColor: '#F5FCFF',
    }
});

const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingRight: 3, backgroundColor: "#000"},
};


AppRegistry.registerComponent('Card', () => Splash);
