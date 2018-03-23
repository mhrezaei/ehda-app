import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';


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
        this.state = {
            form: {
                code_melli: '',
            },
            errors: {}
        };
    }

    render() {
        const {form, errors} = this.state;
        return (
            <ScrollView contentContainerStyle={styles.parent}>
                <View style={styles.container}>
                    <Text style={styles.textDescription}>{trans('requestWithSsn')}</Text>
                    <View style={styles.wrapper}>
                        <TextInput onChange={text => this.setState({form: {code_melli: text}})} style={styles.textField}
                                   placeholder={trans('codeMelli')} keyboardType={'numeric'}>
                            {form.code_melli}
                        </TextInput>
                    </View>
                    {errors.codeMelli && <Text style={styles.textError}>{errors.codeMelli}</Text>}
                    <View style={styles.wrapper}>
                        <Button title={form.code_melli} icon={"card-membership"}/>
                        <Button title={trans('register')} icon={"perm-identity"}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingTop:26,
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textField: {
        flex: 1,
        borderBottomColor: theme.accent,
        borderBottomWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    textDescription: {
        textAlign: 'right',
    },
    textError: {
        textAlign: 'right',
        color: theme.red,
        paddingVertical: 10

    },
});

export default connect((state) => {
    return {};
}, (dispatch) => {
    return {
        app_methods: bindActionCreators(app_methods, dispatch)
    };
})(Home);
