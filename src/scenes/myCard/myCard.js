import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';


import {trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app_methods from '../../data/app/methods';


import {Button, TextInput} from '../../ui/components';

import theme from "../../theme";

import card_src from '../../../res/card.png'

const view_height = Dimensions.get('window').height;


class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={card_src}/>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 20
    }
});

export default connect((state)=>{
    return {
    };
}, (dispatch)=>{
    return {
        app_methods: bindActionCreators(app_methods, dispatch)
    };
})( Home );
