import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

import ConfigStore from './config-store';
import {Provider} from 'react-redux';

import {View, Image, StyleSheet} from 'react-native';


import splash_src from './splash.png';

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
            return (<Provider store={this.store}>
                <App/>
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
