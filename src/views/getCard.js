import React, {Component} from 'react';
import {View, Animated, StyleSheet, Keyboard} from 'react-native';
import {Button, Translate, Attach,Text, Helpers, Loading, LocalizeNumber, Dispatcher, Jalali} from '../../core/index';

import {Navigation, Auth, Ajax, Dialog} from '../models';
import {CreateForm, CreateFormDate} from "./common/formInput";

import {ScrollView} from "./common/scrollView";
import {Container} from "./common/container";


import moment from 'momentj';


class GetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                code_melli: null,
                birth_date: null,
                //tel_mobile: null,
            },
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
        this.onBirthDateFocused = this.onBirthDateFocused.bind(this);
        this.onBirthDateChanged = this.onBirthDateChanged.bind(this);
        this.mutateDate = this.mutateDate.bind(this);
        this.onBack = this.onBack.bind(this);



    }


    onBack(){
        this.props.dispatch(Navigation.goTo('searchCard'));
    }


    componentDidMount() {
        const form = this.state.form;
        form['code_melli'] = Helpers.leaf(this.props.redux, 'navigation.props.codeMelli');
        this.setState({form});
    }


    onBirthDateFocused() {
        const {form} = this.state;
        if(this.container.hasOwnProperty('focus'))
        this.container.focus();
        this.props.dispatch(Dialog.openCalendar(form.birth_date, this.onBirthDateChanged));
    }

    onBirthDateChanged(date) {
        if(this.container.hasOwnProperty('focus'))
        this.container.focus();
        this.onChangeText('birth_date', date);
    }

    mutateDate(value) {
        if(!value)
            return '';
        const date = Jalali.fromPhp(value);
        return LocalizeNumber(date.jy + '/'+date.jm+'/'+date.jd);
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
                case 'code_melli':
                    if (!value || !Helpers.checkCodeMelli(value))
                        errors[key] = Translate('errors.-8');
                    break;
                case 'birth_date':
                    if (!value)
                        errors[key] = Translate('errors.-98');
                    break;
                /*case 'tel_mobile':
                    if (!value || !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value))
                        errors[key] = Translate('errors.-97');*/
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
            this.props.dispatch(Ajax.startLoading([Translate('getCardDone'), Translate('getCardError'),  Translate('internetError')]));
            this.props.dispatch(Auth.getCard(form, (success, response) => {
                if (success) {
                    this.props.dispatch(Ajax.stopLoading(0, () => {
                        this.props.dispatch(Navigation.goTo('myCards'));
                    }));
                } else {


                    if(response > -30){

                        this.props.dispatch(Ajax.stopLoading(1, () => {

                            const err = Translate('errors.' + response);
                            const errors = {
                                birth_date: err
                            };
                            this.setState({errors});
                            this.container.wiggle();
                        }));
                    }else{

                        this.props.dispatch(Ajax.stopLoading(2, () => {
                        }));
                    }

                }
            }));
        } else {
            this.container.wiggle();
        }
    }

    render() {
        const {form, errors} = this.state;


        let dtt = null;


        if(form.birth_date) {
            const date = new Date(form.birth_date * 1000);

            dtt =  'miladi: ' + date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
        }

        return (
            <Container>
                <ScrollView  ref={ref => this.container = ref}>
                    {CreateForm('code_melli', form, errors, null, {

                    })}
                    {CreateForm('birth_date', form, errors, null, {
                        format: this.mutateDate,
                        onFocus: this.onBirthDateFocused
                    },{name: 'arrow-drop-down'})}
                    <View   style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center', paddingTop: 20}}>
                        <Button title={Translate('requestCard')} onPress={this.onSubmit}/>
                        <Button title={Translate('cancel')} onPress={this.onBack}/>
                    </View>

                </ScrollView>
            </Container>
        );
    }
}

export default Dispatcher(GetCard);


// {CreateForm('tel_mobile', form, errors, this.onChangeText, {keyboardType: 'numeric'})}