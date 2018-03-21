import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';


import {trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app_methods from '../../data/app/methods';


import {Button, TextInput, Text} from '../../ui/components';

import theme from "../../theme";

import card_src from '../../../res/card.png'

const view_width = Dimensions.get('window').width;


//const encodedData = 'R0lGODlhAQABAIAAAAAA...7';
//<Image source={{uri: `data:image/gif;base64,${encodedData}`}} />

class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        <Image style={styles.cardImage} source={card_src}/>
                        <View style={styles.sharingBar}>

                        </View>
                    </View>
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
    },
    cardContainer: {
        flex: 1,
        borderRadius: 3,
        backgroundColor: '#ddd',
    },
    cardImage:{
        flex: 1,
        borderRadius: 3,
        resizeMode: 'contain'
    },
    sharingBar:{
        borderRadius: 3,
        marginTop: 3,
        flex: 1,
        flexDirection: 'row',
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
