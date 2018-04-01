/*
    Filename: src/views/common/formInput.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:51 AM

    Description:
        used to simplify input creation.

 */

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Theme, Translate, LocalizeNumber, NumToEn} from '../../../core/index';


// scaffold a simple form layout
export function CreateForm(name, form, errors, onChangeText, props = {}) {
    const placeholder = Translate('fields.'+name);
    return (
        <View style={styles.containerVertical}>
            <Text style={styles.textLabel}>{placeholder}</Text>
            <View style={styles.container}>
                <TextInput onChangeText={onChangeText && (text => onChangeText(name, NumToEn(text)))} placeholder={placeholder}
                           {...props} value={LocalizeNumber(props.format ? props.format(form[name]) : form[name])}>
                </TextInput>
            </View>
            {errors[name] && <Text style={styles.textError}>{errors[name]}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerVertical: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    textError: {
        textAlign: 'right',
        color: Theme.red,
        padding: 10,
        alignSelf: 'flex-end'
    },
    textLabel: {
        textAlign: 'right',
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingRight: 20,

    },
});