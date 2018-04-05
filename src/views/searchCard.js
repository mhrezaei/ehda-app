import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Translate, Helpers, Attach, Loading, Text, Dispatcher} from '../../core/index';

import {Navigation, Auth, Ajax} from '../models/index';

import {CreateForm} from "./common/formInput";
import {Container} from "./common/container";
import {ScrollView} from "./common/scrollView";

class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                code_melli: null,
                birth_date: null,
                tel_mobile: null,
            },
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        //this.goToRegister = this.goToRegister.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
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
            }

        });
        this.setState({errors});

        return errors;
    }
    /*

    goToRegister() {
        this.props.dispatch(Navigation.goTo('register'));
    }
    */

    onSubmit() {
        const errors = this.checkErrors();
        const {form} = this.state;

        if (Object.keys(errors).length === 0) {
            this.props.dispatch(Ajax.startLoading([Translate('searchCardDone'), Translate('searchCardError')]));
            this.props.dispatch(Auth.searchCard(form.code_melli, (success, response) => {
                if (success) {
                    this.props.dispatch(Ajax.stopLoading(0, ()=>{
                        this.props.dispatch(Navigation.goTo('getCard', {codeMelli: response}));
                    }));
                } else {
                    this.props.dispatch(Ajax.stopLoading(1, ()=>{


                        /*
                        const err = Translate('errors.' + response);
                        const errors = {
                            code_melli: err
                        };
                        this.setState({errors});

                        this.container.wiggle();

                        */

                        this.props.dispatch(Navigation.goTo('registerCard', {codeMelli: form.code_melli}));
                    }));
                }


            }))

        } else {
            this.container.wiggle();
        }
    }

    render() {
        const {form, errors} = this.state;

        return (
            <Container>
                <ScrollView ref={ref => this.container = ref}>

                    <Text style={{textAlign: 'right', padding: 14}}>{Translate('requestWithSsn')}</Text>

                        {CreateForm('code_melli', form, errors, this.onChangeText)}

                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 20}}>
                            <Button title={Translate('searchCard')} onPress={this.onSubmit}/>
                        </View>
                </ScrollView>

            </Container>
        );
    }
}
export default Dispatcher(SearchCard);



// <Button title={Translate('registerCard')} onPress={this.goToRegister}/>