import React, {Component} from 'react';
import { AppRegistry } from 'react-native';


import ConfigStore from './src/config-store';
import {Provider} from 'react-redux';

import {View, Image, StyleSheet, StatusBar} from 'react-native';


import splash_src from './splash.png';

import App from './src';


import theme from './src/theme';

global.language = null;


class Splash extends Component<Props> {
    constructor(props) {
        super(props);
        this.store = null;
        this.state = {
            loading: true
        }


    }
    componentDidMount(){
        this.setState({loading:true});
        ConfigStore().then((s) => {
            this.store = s;
            console.log('done');
            this.setState({loading:false});
        });
    }
    render() {
        const {loading} = this.state;

        if(loading){
            return (
                <View style={styles.container}>
                    <Image source={splash_src}/>
                </View>
            );
        }else {
            return (
            <Provider store={this.store}>
                <View>
                    <StatusBar backgroundColor={theme.darkPrimaryColor}/>
                    <App />
                </View>
            </Provider>);
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
    }
});


AppRegistry.registerComponent('Card', () => Splash);
