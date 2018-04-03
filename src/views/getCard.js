import React, {Component} from 'react';
import {View, Animated, StyleSheet, Keyboard} from 'react-native';
import {Button, Translate, Attach, Helpers, Calendar, Loading, LocalizeNumber, Dispatcher} from '../../core/index';

import {Navigation, Auth, Ajax} from '../models';
import {CreateForm} from "./common/formInput";

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


    }

    componentDidMount() {
        const form = this.state.form;
        form['code_melli'] = Helpers.leaf(this.props.redux, 'navigation.props.codeMelli');
        this.setState({form});
    }


    onBirthDateFocused() {
        const {form} = this.state;
        this.calendar.show(form.birth_date);
    }

    onBirthDateChanged(date) {
        this.onChangeText('birth_date', date);
    }

    mutateDate(value) {
        if(!value)
            return '';
        return LocalizeNumber(moment.utc(value).format('jYYYY/jM/jD'));
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
            this.props.dispatch(Ajax.startLoading([Translate('getCardDone'), Translate('getCardError')]));
            this.props.dispatch(Auth.getCard(form, (success, response) => {
                if (success) {
                    this.props.dispatch(Ajax.stopLoading(0, () => {
                        this.props.dispatch(Navigation.goTo('myCard'));
                    }));
                } else {

                    this.props.dispatch(Ajax.stopLoading(1, () => {

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
            this.container.wiggle();
        }
    }

    render() {
        const {form, errors} = this.state;


        return (
            <Container>
                <ScrollView ref={ref => this.container = ref}>

                    {CreateForm('code_melli', form, errors, this.onChangeText, {
                        editable: false,
                        selectTextOnFocus: false
                    })}

                    {CreateForm('birth_date', form, errors, this.onChangeText, {
                        format: this.mutateDate,
                        onFocus: this.onBirthDateFocused
                    })}

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 20}}>
                        <Button title={Translate('requestCard')} onPress={this.onSubmit}/>
                    </View>
                </ScrollView>
                <Calendar ref={x => this.calendar = x} onChange={this.onBirthDateChanged}/>
            </Container>
        );
    }
}

export default Dispatcher(GetCard);


// {CreateForm('tel_mobile', form, errors, this.onChangeText, {keyboardType: 'numeric'})}