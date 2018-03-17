import React from 'react';

import {StyleSheet, View, Text, Button, TextInput} from 'react-native';

import trans from '../app/lang';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import * as nav_methods from '../data/nav/methods'

type Props = {};

class AuthLogin extends React.Component<Props> {
    constructor(props){
        super(props);
        this.doLogin = this.doLogin.bind(this);
    }
    doLogin() {
        this.props.actions.goto('getCard');
    }
    render() {
        return (
            <View>
                <Button title={trans('fields.first_name')} onPress={this.doLogin}/>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10,
    }
});


export default connect((state) => {
    return {
        nav: state.get('nav')
    }
}, (dispatch) => {
    return {
        actions: bindActionCreators(nav_methods, dispatch)
    }
})(AuthLogin);