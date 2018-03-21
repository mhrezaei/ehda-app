import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';


import {trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auth_methods from '../../data/auth/methods';
import * as nav_methods from '../../data/nav/methods';


import {Button, TextInput, Text, Calendar} from '../../ui/components';

import theme from "../../theme";

import PropTypes from 'prop-types';

const view_height = Dimensions.get('window').height;


const FormInput = ({name, form, errors, placeholder, keyboardType, onChangeText}) => {
    return (
        <View style={styles.wrapper_vertical}>
            <View style={styles.wrapper}>
                <TextInput onChangeText={onChangeText}
                           style={styles.textField}
                           placeholder={placeholder}
                           keyboardType={keyboardType}>
                    {form[name]}
                </TextInput>
            </View>
            {errors[name] && <Text style={styles.textError}>{errors[name]}</Text>}
        </View>
    );
};
FormInput.propTypes = {
    name: PropTypes.string,
    form: PropTypes.object,
    errors: PropTypes.object,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    onChangeText: PropTypes.func
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                code_melli: '',
                tel_mobile: '',
            },
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {

    }

    render() {
        const {form, errors} = this.state;
        return (
            <View style={styles.container_up}>
                <ScrollView contentContainerStyle={styles.parent}>
                    <View style={styles.container}>
                        <Text style={styles.textDescription}>{trans('requestWithSsn')}</Text>
                        <FormInput name={"code_melli"} placeholder={trans('codeMelli')} keyboardType={'numeric'}
                                   form={form} errors={errors}
                                   onChangeText={text => this.setState({form: {code_melli: text}})}/>
                        <FormInput name={"tel_mobile"} placeholder={trans('telMobile')} keyboardType={'numeric'}
                                   form={form} errors={errors}
                                   onChangeText={text => this.setState({form: {tel_mobile: text}})}/>
                    </View>
                </ScrollView>
                <Calendar/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center'
    },
    container_up: {
        flex: 1,
    },
    calendar: {

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingTop: 26,
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
        paddingHorizontal: 13,
        paddingVertical: 5
    },

    textDescription: {
        textAlign: 'right', paddingHorizontal: 13,

    },
    textError: {
        textAlign: 'right',
        color: theme.red,
        paddingVertical: 10

    },
    wrapper_vertical: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default connect((state) => {
    return {};
}, (dispatch) => {
    return {
        auth_methods: bindActionCreators(auth_methods, dispatch),
        nav_methods: bindActionCreators(nav_methods, dispatch)
    };
})(Home);
