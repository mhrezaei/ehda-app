import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Alert, Keyboard} from 'react-native';


import {localize_number, trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auth_methods from '../../data/auth/methods';
import * as nav_methods from '../../data/nav/methods';


import {Button, TextInput, Text, Calendar, Picker} from '../../ui/components';

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

class Home extends Component {



    genders = [
        {
            id: 1,
            value: trans('male')
        },
        {
            id: 2,
            value: trans('female')
        },
        {
            id: 3,
            value: trans('other')
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            form: {
                code_melli: '',
                tel_mobile: '',
                birth_date: moment('1380/1/1','jYYYY/jM/jD').unix(),
                gender: 3
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
                        <View style={styles.textDescription}/>
                        <FormInput name={"code_melli"} placeholder={trans('codeMelli')} keyboardType={'numeric'}
                                   form={form} errors={errors}
                                   onChangeText={text => this.setState({form: {...form, code_melli: text}})}/>

                        <FormInput name={"tel_mobile"} placeholder={trans('telMobile')} keyboardType={'numeric'}
                                   form={form} errors={errors}
                                   onChangeText={text => this.setState({form: {...form, tel_mobile: text}})}/>

                        <View style={styles.wrapper_vertical}>
                            <Text style={styles.textLabel}>{trans('birth_date')}</Text>
                            <View style={styles.wrapper}>
                                <TextInput style={styles.textField} onFocus={()=>{
                                    const d = moment.unix(form.birth_date);
                                    this.calendar.show({year: d.jYear(), month: d.jMonth(), day: d.jDate()});
                                    Keyboard.dismiss();
                                }}>
                                    {localize_number(moment.unix(form.birth_date).format('jYYYY/jM/jD'))}
                                </TextInput>
                            </View>
                            {errors['birth_date'] && <Text style={styles.textError}>{errors['birth_date']}</Text>}
                        </View>


                        <View style={styles.wrapper_vertical}>
                            <Text style={styles.textLabel}>{trans('gender')}</Text>
                            <View style={styles.wrapper}>
                                <TextInput style={styles.textField} onFocus={()=>{
                                    this.genderSelector.show(form.gender);
                                    Keyboard.dismiss();
                                }}>
                                    {this.genders.filter(x => x.id === form.gender)[0].value}
                                </TextInput>
                            </View>
                            {errors['gender'] && <Text style={styles.textError}>{errors['gender']}</Text>}
                        </View>

                        <Text>
                            {JSON.stringify(this.state.form,null, 2)}
                        </Text>
                    </View>
                </ScrollView>
                <Calendar ref={x => this.calendar = x} onChange={(date)=>{
                    const d = moment(date.year + '/' + (date.month + 1) + '/' + date.day, 'jYYYY/jMM/jD');
                    this.setState({form: {...form, birth_date: d.unix()}})
                }}/>

                <Picker ref={x => this.genderSelector = x} type={'static'} multi={false} onChange={(d)=>{
                    this.setState({form: {...form, gender: d[0]}})
                }} data={this.genders}/>

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
        alignItems: 'center'
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
        paddingVertical: 10
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
    return {};
}, (dispatch) => {
    return {
        auth_methods: bindActionCreators(auth_methods, dispatch),
        nav_methods: bindActionCreators(nav_methods, dispatch)
    };
})(Home);