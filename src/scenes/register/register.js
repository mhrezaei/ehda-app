import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Alert, Keyboard} from 'react-native';


import {localize_number, trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auth_methods from '../../data/auth/methods';
import * as nav_methods from '../../data/nav/methods';
import * as server_methods from '../../data/server/methods';


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
            title: trans('male')
        },
        {
            id: 2,
            title: trans('female')
        },
        {
            id: 3,
            title: trans('other')
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            form: {
                code_melli: null,
                tel_mobile: null,
                birth_date: null,
                province: null,
                gender: null,
                name_first: null,
                name_last: null,
                name_father: null,
                home_city: null,

            },
            errors: {
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.props.server_methods.getProvinceListAsync();
    }



    onSubmit() {

    }

    onChange(name, value) {
        let form = this.state.form;
        form[name] = value;

        this.setState({
            form: form
        })

    }

    render() {

        const {form, errors} = this.state;
        const {provinceList, citiesList} = this.props;

        const sProv_l = provinceList.filter(x => x.id === form.province);
        let sProv = trans('chooseIt');
        if(sProv_l.length > 0)
            sProv = sProv_l[0].title;


        const sGndr_l = this.genders.filter(x => x.id === form.gender);
        let sGndr = trans('chooseIt');
        if(sGndr_l.length > 0)
            sGndr = sGndr_l[0].title;


        const sCity_l = citiesList.hasOwnProperty(form.province) ? citiesList[form.province].filter(x => x.id === form.home_city) : [];
        let sCity = trans('chooseIt');
        if(sCity_l.length > 0)
            sCity = sCity_l[0].title;

        return (
            <View style={styles.container_up}>
                <ScrollView contentContainerStyle={styles.parent}>
                    <View style={styles.container}>
                        <View style={styles.textDescription}/>
                        <FormInput name={"name_first"} placeholder={trans('nameFirst')}
                                   form={form} errors={errors}
                                   onChangeText={text => this.onChange('name_first', text)}/>


                        <FormInput name={"name_last"} placeholder={trans('nameLast')}
                                   form={form} errors={errors}
                                   onChangeText={text => this.onChange('name_last', text)}/>

                        <FormInput name={"name_father"} placeholder={trans('nameFather')}
                                   form={form} errors={errors}
                                       onChangeText={text => this.onChange('name_father', text)}/>


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


                        <View style={styles.wrapper_vertical}>
                            <Text style={styles.textLabel}>{trans('gender')}</Text>
                            <View style={styles.wrapper}>
                                <TextInput style={styles.textField} onFocus={()=>{
                                    this.genderSelector.show(form.gender);
                                    Keyboard.dismiss();
                                }}>
                                    {sGndr}
                                </TextInput>
                            </View>
                            {errors['gender'] && <Text style={styles.textError}>{errors['gender']}</Text>}
                        </View>


                        <View style={styles.wrapper_vertical}>
                            <Text style={styles.textLabel}>{trans('province')}</Text>
                            <View style={styles.wrapper}>
                                <TextInput style={styles.textField} onFocus={()=>{
                                    this.provinceSelector.show(form.province);
                                    Keyboard.dismiss();
                                }}>
                                    {sProv}
                                </TextInput>
                            </View>
                            {errors['province'] && <Text style={styles.textError}>{errors['province']}</Text>}
                        </View>



                        <View style={styles.wrapper_vertical}>
                            <Text style={styles.textLabel}>{trans('homeCity')}</Text>
                            <View style={styles.wrapper}>
                                <TextInput style={styles.textField} onFocus={()=>{
                                    this.citiesSelector.show(form.home_city);
                                    Keyboard.dismiss();
                                }}>
                                    {sCity}
                                </TextInput>
                            </View>
                            {errors['home_city'] && <Text style={styles.textError}>{errors['home_city']}</Text>}
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

                <Picker ref={x => this.genderSelector = x} onChange={(d)=>{
                    this.onChange('gender', d);
                }} data={this.genders}/>


                <Picker ref={x => this.provinceSelector = x} onChange={(d)=>{
                    this.onChange('province', d);
                    this.onChange('home_city', null);
                    this.props.server_methods.getCitiesListAsync(d);
                }} data={provinceList}/>


                <Picker ref={x => this.citiesSelector = x} onChange={(d)=>{
                    this.onChange('home_city', d);
                }} data={citiesList.hasOwnProperty(form.province) ? citiesList[form.province] : []}/>

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

Home.defaultProps = {
    provinceList: [{id:0, title:trans('loading')}],
    citiesList: {},
};


export default connect((state) => {
    return {
        provinceList: state.server.provinceList,
        citiesList: state.server.citiesList,
    };
}, (dispatch) => {
    return {
        auth_methods: bindActionCreators(auth_methods, dispatch),
        nav_methods: bindActionCreators(nav_methods, dispatch),
        server_methods: bindActionCreators(server_methods, dispatch),
    };
})(Home);
