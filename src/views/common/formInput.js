/*
    Filename: src/views/common/formInput.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:51 AM

    Description:
        used to simplify input creation.

 */

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Text, TextInput, Theme, Translate, LocalizeNumber, NumToEn} from '../../../core/index';
import Icon from 'react-native-vector-icons/MaterialIcons';


// scaffold a simple form layout
export function CreateForm(name, form, errors, onChangeText, props = {}, icon) {

    const placeholder = Translate('fields.' + name);
    return (
        <View style={styles.containerVertical}>
            <View style={styles.container}>
                <TextInput hasError={errors.hasOwnProperty(name)} name={name}
                           onChangeText={onChangeText && (text => onChangeText(name, NumToEn(text)))}
                           placeholder={placeholder}
                           {...props}
                           value={props.format ? props.format(form[name]) : form[name]}/>

            </View>
            {icon && <TouchableOpacity style={styles.extended_icon} onPress={icon.onPress}>
                <Icon name={icon.name} size={20} color={Theme.gray}/>
            </TouchableOpacity>}
            {errors[name] && <Text style={styles.textError}>{errors[name]}</Text>}
        </View>
    )
}


// scaffold a simple form layout
export function CreateFormDate(name, form, errors, onChangeText, props = {}, icon) {

    const placeholder = Translate('fields.' + name);
    return (

        <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.containerVertical}>

            <View style={styles.container}>
                <TextInput pointerEvents="none" hasError={errors.hasOwnProperty(name)} name={name}
                           onChangeText={onChangeText && (text => onChangeText(name, NumToEn(text)))}
                           placeholder={placeholder}
                           value={props.format ? props.format(form[name]) : form[name]}
                           onFocus={props.onFocus} {...props}/>


            </View>
            {icon && <TouchableOpacity style={styles.extended_icon} onPress={icon.onPress}>
                <Icon name={icon.name} size={20} color={Theme.gray}/>
            </TouchableOpacity>}
            {errors[name] && <Text style={styles.textError}>{errors[name]}</Text>}
        </View>

        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    extended_icon: {
        padding: 10,
        position: 'absolute',
        left: 10,
        top: 10,

        alignSelf: 'center',
        zIndex: 3
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