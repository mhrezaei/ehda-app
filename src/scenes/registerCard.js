import React, {Component} from 'react';
import {View, Animated, StyleSheet, Keyboard} from 'react-native';
import {Button, Translate, Attach, Helpers, Calendar, LocalizeNumber, Loading, Picker} from '../../core/index';

import {Navigation, Auth, Ajax, Data} from '../redux/index';
import {CreateDatePicker, CreateForm} from "./common/formInput";

import {ScrollView} from "./common/scrollView";
import {Container} from "./common/container";


import moment from 'momentj';


class RegisterCard extends Component {
    static defaultProps = {
        provinces: [],
        cities: []
    };

    constructor(props) {
        super(props);
        this.state = {
            province: null,
            form: {
                name_first: null,
                name_last: null,
                name_father: null,
                gender: null,
                code_melli: null,
                birth_date: 0,
                province: null,
                home_city: null,
                tel_mobile: null,
            },
            errors: {}
        };
        this.genderTypes = Translate('genderTypes');

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
        this.onBirthDateFocused = this.onBirthDateFocused.bind(this);
        this.onBirthDateChanged = this.onBirthDateChanged.bind(this);
        this.mutateBirthDate = this.mutateBirthDate.bind(this);


        this.onGenderFocused = this.onGenderFocused.bind(this);
        this.onGenderChanged = this.onGenderChanged.bind(this);
        this.mutateGender = this.mutateGender.bind(this);

        this.onProvinceFocused = this.onProvinceFocused.bind(this);
        this.onProvinceChanged = this.onProvinceChanged.bind(this);
        this.mutateProvince = this.mutateProvince.bind(this);

        this.onHomeCityFocused = this.onHomeCityFocused.bind(this);
        this.onHomeCityChanged = this.onHomeCityChanged.bind(this);
        this.mutateHomeCity = this.mutateHomeCity.bind(this);

    }



    onHomeCityFocused() {
        const {form} = this.state;
        this.homeCitySelector.show(form.home_city);
    }

    onHomeCityChanged(value) {
        this.onChangeText('home_city', value);
    }


    mutateHomeCity(value) {

        let tmp = Translate('chooseIt');

        const tmpList = this.props.cities.filter(x => x.id === value);

        if (tmpList.length > 0)
            tmp = tmpList[0].title;

        return tmp;
    }





    onProvinceFocused() {
        if(this.props.provinces.length === 0)
            this.props.dispatch(Data.getProvince());

        const {form} = this.state;
        this.provinceSelector.show(form.province);
    }

    onProvinceChanged(value) {
        const old = this.state.form.province;

        if(old !== value){
            this.props.dispatch(Data.getCities(value));
        }
        this.onChangeText('province', value);
    }


    mutateProvince(value) {
        let tmp = Translate('chooseIt');

        const tmpList = this.props.provinces.filter(x => x.id === value);

        if (tmpList.length > 0)
            tmp = tmpList[0].title;

        return tmp;
    }


    onGenderFocused() {
        const {form} = this.state;
        this.genderSelector.show(form.gender);
    }

    onGenderChanged(value) {
        this.onChangeText('gender', value);
    }


    mutateGender(value) {
        const tmpList = this.genderTypes.filter(x => x.id === value);
        let tmp = Translate('chooseIt');
        if (tmpList.length > 0)
            tmp = tmpList[0].title;
        return tmp;
    }


    onBirthDateFocused() {
        const {form} = this.state;
        this.calendar.show(form.birth_date);
    }

    onBirthDateChanged(date) {
        const d = moment(date.year + '/' + (date.month + 1) + '/' + date.day, 'jYYYY/jMM/jD');
        this.onChangeText('birth_date', d.unix());
    }

    mutateBirthDate(value) {
        return LocalizeNumber(moment.unix(value).format('jYYYY/jM/jD'));
    }


    onChangeText(key, value) {
        const form = this.state.form;
        form[key] = value;
        this.setState({form});
    }

    checkErrors() {
        const form = this.state.form;
        let errors = [];

        Object.keys(form).map(key => {
            const value = form[key];
            switch (key) {
                case 'name_first':
                case 'name_last':
                    if (!value || value.toString().length < 3)
                        errors[key] = Translate('errors.-96');
                    break;
                case 'birth_date':
                    if (!value)
                        errors[key] = Translate('errors.-98');
                    break;
                case 'tel_mobile':
                    if (!value || !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value))
                        errors[key] = Translate('errors.-97');
                    break;
            }

        });

        this.setState({errors});

        return errors;
    }

    onSubmit() {
        const errors = this.checkErrors();
        const {form} = this.state;


        if (Object.keys(errors).length === 0) {


            this.props.dispatch(Ajax.startLoading([Translate('registerCardDone'),Translate('registerCardError')]));
            this.props.dispatch(Auth.registerCard(form, (success, response) => {
                if (success) {
                    this.props.dispatch(Ajax.stopLoading(0, ()=>{

                        this.props.dispatch(Navigation.goTo('myCard'));
                    }));
                } else {

                    this.props.dispatch(Ajax.stopLoading(1, ()=>{

                        const err = Translate('errors.' + response);
                        const errors = {
                            birth_date: err
                        };
                        this.setState({errors});
                        this.container.wiggle();
                    }));
                }

            }));
        } else {
        }
    }

    render() {
        const {form, errors} = this.state;
        const {provinces, cities} = this.props;


        return (
            <Container>
                <ScrollView ref={ref => this.container = ref}>

                    {CreateForm('name_first', form, errors, this.onChangeText)}
                    {CreateForm('name_last', form, errors, this.onChangeText)}
                    {CreateForm('name_father', form, errors, this.onChangeText)}
                    {CreateForm('gender', form, errors, null, {
                        format: this.mutateGender,
                        onFocus: this.onGenderFocused
                    })}

                    {CreateForm('province', form, errors, null, {
                        format: this.mutateProvince,
                        onFocus: this.onProvinceFocused
                    })}


                    {form['province'] && CreateForm('home_city', form, errors, null, {
                        format: this.mutateHomeCity,
                        onFocus: this.onHomeCityFocused
                    })}



                    {CreateForm('code_melli', form, errors, this.onChangeText)}
                    {CreateForm('tel_mobile', form, errors, this.onChangeText, {keyboardType: 'numeric'})}
                    {CreateForm('birth_date', form, errors, null, {
                        format: this.mutateBirthDate,
                        onFocus: this.onBirthDateFocused
                    })}

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 20}}>
                        <Button title={Translate('requestCard')} onPress={this.onSubmit}/>
                    </View>
                </ScrollView>

                <Calendar ref={x => this.calendar = x} onChange={this.onBirthDateChanged}/>
                <Picker ref={x => this.genderSelector = x} onChange={this.onGenderChanged} data={this.genderTypes}/>
                <Picker ref={x => this.provinceSelector = x} onChange={this.onProvinceChanged} data={provinces}/>
                <Picker ref={x => this.homeCitySelector = x} onChange={this.onHomeCityChanged} data={cities}/>


            </Container>
        );
    }
}

export default Attach({
    'data.provinces.handle': (data,redux) => {
        return {
            provinces: Helpers.leaf(redux, 'data.provinces.list')
        }
    },
    'data.cities.handle': (data,redux) => {
        return {
            cities: Helpers.leaf(redux, 'data.cities.list')
        }
    }
})(RegisterCard);