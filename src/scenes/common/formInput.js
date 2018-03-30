import React, {Component} from 'react';

import {View, StyleSheet} from 'react-native';

import {Text, TextInput, Theme, Translate, LocalizeNumber} from '../../../core/index';

import moment from 'momentj';

export function CreateForm(name, form, errors, onChangeText, props = {}) {
    const placeholder = Translate('fields.'+name);
    return (
        <View style={styles.containerVertical}>
            <Text style={styles.textLabel}>{placeholder}</Text>
            <View style={styles.container}>
                <TextInput onChangeText={onChangeText && (text => onChangeText(name, text))} placeholder={placeholder}
                           {...props}>
                    {props.format ? props.format(form[name]) : form[name]}
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