import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Alert, Keyboard} from 'react-native';


import {localize_number, trans, to_en} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auth_methods from '../../data/auth/methods';
import * as nav_methods from '../../data/nav/methods';
import * as server_methods from '../../data/server/methods';


import {Button, TextInput, Text, Calendar} from '../../ui/components';

import theme from "../../theme";

import PropTypes from 'prop-types';
const view_width = Dimensions.get('window').width;

import moment from 'momentj';


const FormInput = ({name, form, errors, placeholder, keyboardType, onChangeText, ...props}) => {
    return (
        <View style={styles.wrapper_vertical}>
            <Text style={styles.textLabel}>{placeholder}</Text>
            <View style={styles.wrapper}>
                <TextInput onChangeText={onChangeText}
                           style={styles.textField}
                           placeholder={placeholder}
                           keyboardType={keyboardType} {...props}>
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

class GetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                code_melli: null,
                tel_mobile: null,
                birth_date: null,
            },
            errors: {
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onSubmit() {
        const {form} = this.state;


        this.props.auth_methods.getCardAsync(to_en(form.code_melli),to_en(form.birth_date), to_en(form.tel_mobile), ()=>{
            this.props.nav_methods.goto('cardList');
        }, (err)=>{
            let trnsErr = '';
            if (err)
                trnsErr = trans('errors.' + err);
            else
                trnsErr = trans('codeMelliNotFound');
            this.setState({
                errors: {
                    birth_date: trnsErr
                }
            });
        });


    }

    onChange(name, value) {
        let form = this.state.form;
        form[name] = value;

        this.setState({
            form: form
        })

    }

    componentDidMount(){
        this.setState({
           form: {
               ...this.state.form,
               code_melli: this.props.temporary
           }
        });
    }

    render() {

        const {form, errors} = this.state;

        return (
            <View style={styles.container_up}>
                <ScrollView contentContainerStyle={styles.parent}>
                    <View style={styles.container}>
                        <View style={styles.textDescription}/>

                        <FormInput name={"code_melli"} placeholder={trans('codeMelli')} keyboardType={'numeric'}
                                   form={form} errors={errors}
                                   onChangeText={text => this.onChange('code_melli', text)}/>

                        <FormInput name={"tel_mobile"} placeholder={trans('telMobile')} keyboardType={'numeric'}
                                   form={form} errors={errors}
                                   onChangeText={text =>  this.onChange('tel_mobile', text)}/>

                        <View style={styles.wrapper_vertical}>
                            <Text style={styles.textLabel}>{trans('birthDate')}</Text>
                            <View style={styles.wrapper}>
                                <TextInput style={styles.textField} onFocus={()=>{

                                    this.calendar.show(form.birth_date);
                                    Keyboard.dismiss();
                                }}>
                                    {localize_number(moment.unix(form.birth_date).format('jYYYY/jM/jD'))}
                                </TextInput>
                            </View>
                            {errors['birth_date'] && <Text style={styles.textError}>{errors['birth_date']}</Text>}
                        </View>
                    </View>
                    <View style={styles.wrapper_submit}>
                        <Button title={trans('requestCard')} icon={"card-membership"} onPress={this.onSubmit}/>
                    </View>
                </ScrollView>
                <Calendar ref={x => this.calendar = x} onChange={(date)=>{
                    const d = moment(date.year + '/' + (date.month + 1) + '/' + date.day, 'jYYYY/jMM/jD');
                    this.onChange('birth_date', d.unix());
                }}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        paddingBottom:60
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
        alignItems: 'center',
    },
    wrapper_submit: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 5
    },
    textField: {
        flex: 1,
        borderBottomColor: theme.accentLight,
        borderBottomWidth: 2,
        paddingHorizontal: 13,
        paddingVertical: 5
    },

    dateInput: {
        flex: 1,
        paddingHorizontal: 13,
        paddingVertical: 5,
        textAlign: 'center',
        backgroundColor: theme.accentLight

    },
    textDescription: {
        paddingHorizontal: 13,
        width: view_width,

    },
    textError: {
        textAlign: 'right',
        color: theme.red,
        paddingVertical: 10,
        alignSelf: 'flex-end'
    },
    textLabel: {
        textAlign: 'right',
        alignSelf: 'flex-end',
        paddingTop:10,
        paddingRight:20,

    },
    wrapper_vertical: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default connect((state) => {
    return {
        temporary: state.nav.props.code_melli
    };
}, (dispatch) => {
    return {
        auth_methods: bindActionCreators(auth_methods, dispatch),
        nav_methods: bindActionCreators(nav_methods, dispatch),
        server_methods: bindActionCreators(server_methods, dispatch),
    };
})(GetCard);
