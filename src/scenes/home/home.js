import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';


import {trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auth_methods from '../../data/auth/methods';
import * as nav_methods from '../../data/nav/methods';


import {Button, TextInput, Text} from '../../ui/components';

import theme from "../../theme";


const view_width = Dimensions.get('window').width;


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                code_melli: ''
            },
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {

        this.props.auth_methods.checkCodeMelliAsync(this.state.form.code_melli, () => {
            this.props.nav_methods.goto('myCard');
        }, () => {
            this.setState({
                errors: {
                    codeMelli: trans('codeMelliNotFound')
                }
            });
            Alert.alert(trans('codeMelliNotFound'), trans('willYouRegister'), [
                {
                    text: trans('yes'), onPress: () => {
                    this.props.nav_methods.goto('register');
                }
                },
                {
                    text: trans('no'), onPress: () => {
                }, style: 'cancel'
                },
            ], {cancelable: false});

        })
    }

    render() {
        const {form, errors} = this.state;
        return (
            <ScrollView contentContainerStyle={styles.parent}>
                <View style={styles.container}>
                    <Text style={styles.textDescription}>{trans('requestWithSsn')}</Text>
                    <View style={styles.wrapper}>
                        <TextInput onChangeText={text => this.setState({form: {code_melli: text}})}
                                   style={styles.textField}
                                   placeholder={trans('codeMelli')}
                                   keyboardType={'numeric'}>
                            {form.code_melli}
                        </TextInput>
                    </View>
                    {errors.codeMelli && <Text style={styles.textError}>{errors.codeMelli}</Text>}
                    <View style={styles.wrapper}>
                        <Button title={trans('requestCard')} icon={"card-membership"} onPress={this.onSubmit}/>
                        <Button title={trans('register')} icon={"perm-identity"} onPress={() => {
                            this.props.nav_methods.goto('register')
                        }}/>
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
        paddingTop: 26,
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textField: {
        flex: 1,
        borderBottomColor: theme.accentLight,
        borderBottomWidth: 2,
        paddingHorizontal: 13,
        paddingVertical: 5
    },

    textDescription: {
        textAlign: 'right',
        paddingHorizontal: 13,

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
        auth_methods: bindActionCreators(auth_methods, dispatch),
        nav_methods: bindActionCreators(nav_methods, dispatch)
    };
})(Home);
