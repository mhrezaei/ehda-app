import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Alert, Image} from 'react-native';


import {trans, to_en} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auth_methods from '../../data/auth/methods';
import * as nav_methods from '../../data/nav/methods';


import {Button, TextInput, Text} from '../../ui/components';

import theme from "../../theme";


const view_width = Dimensions.get('window').width;


import {FileIO} from "../../modules";


import {encodeImage, decodeImage} from '../../factory';

import axios from 'axios';
import {Buffer} from 'buffer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code_melli: null,
            code_melli_error: null,
            img: null,
            ova: null
        };
        this.onSubmit = this.onSubmit.bind(this);


    }
    onSubmit() {
        this.props.auth_methods.checkCodeMelliAsync(to_en(this.state.code_melli), (code_melli) => {
            this.props.nav_methods.goto('getCard', {code_melli});
        }, (err) => {
            let trnsErr = '';
            if (err)
                trnsErr = trans('errors.' + err);
            else
                trnsErr = trans('codeMelliNotFound');
            this.setState({
                code_melli_error: trnsErr
            });
            Alert.alert(trnsErr, trans('willYouRegister'), [
                {
                    text: trans('yes'),
                    onPress: () => {
                        this.props.nav_methods.goto('register');
                    }
                },
                {
                    text: trans('no'), style: 'cancel'
                },
            ], {cancelable: false});

        })
    }

    render() {
        const {code_melli, code_melli_error} = this.state;
        return (
            <ScrollView contentContainerStyle={styles.parent}>
                <View style={styles.container}>
                    <Text style={styles.textDescription}>{trans('requestWithSsn')}</Text>
                    <View style={styles.wrapper}>
                        <TextInput onChangeText={text => this.setState({code_melli: text})}
                                   style={styles.textField}
                                   placeholder={trans('codeMelli')}
                                   keyboardType={'numeric'}>
                            {code_melli}
                        </TextInput>
                    </View>
                    {code_melli_error && <Text style={styles.textError}>{code_melli_error}</Text>}
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
    imageWrapper:{
        flex: 1,
        flexDirection:'row',
        height: 200
    },
    image: {
        flex: 1
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
        alignSelf: 'flex-end',
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
