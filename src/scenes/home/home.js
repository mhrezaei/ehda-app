import React, {Component} from 'react';

import {View, StyleSheet, Dimensions,ScrollView} from 'react-native';


import {trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app_methods from '../../data/app/methods';


import {Button, TextInput, Text} from '../../ui/components';

import theme from "../../theme";


const view_height = Dimensions.get('window').height;


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <Text style={styles.textDescription}>برای ادامه و دریافت کارت عضویت کد ملی خود را وارد نمایید:</Text>

                    <View style={styles.wrapper}>
                        <TextInput style={styles.textField} placeholder={trans('codeMelli')} keyboardType={'numeric'}/>
                    </View>
                    <Button title={trans('requestCard')}/>
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
        padding: 20,
    },
    wrapper: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textField:{
        flex: 1,
    },

    textDescription: {
        textAlign: 'right',
    },
});

export default connect((state) => {
    return {};
}, (dispatch) => {
    return {
        app_methods: bindActionCreators(app_methods, dispatch)
    };
})(Home);
