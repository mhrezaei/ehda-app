import React, {Component} from 'react';

import {View, StyleSheet, Dimensions} from 'react-native';


import {trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app_methods from '../../data/app/methods';


import {Button, TextInput} from '../../ui/components';

import theme from "../../theme";


const view_height = Dimensions.get('window').height;


class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput style={{marginTop: view_height/5}} placeholder={trans('codeMelli')} keyboardType={'numeric'}/>
                <Button title={trans('requestCard')}/>
            </View>
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
