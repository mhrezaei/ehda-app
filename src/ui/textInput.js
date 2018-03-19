import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TextInput,
    Dimensions
} from 'react-native'



import theme from '../theme';

const view_width = Dimensions.get('window').width;

const TextInput_Exp = ({style, placeholder, onChange, defaultValue, children}) => {
    return (
        <TextInput
            style={StyleSheet.flatten([style, styles.textInput])}
            onChange={onChange} defaultValue={defaultValue}
            underlineColorAndroid={theme.accent}
            placeholder={placeholder}>
            {children}
        </TextInput>
    );
};

TextInput_Exp.propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    children: PropTypes.string
};


const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        color: theme.textInvert,
        fontFamily: theme.font,
        marginTop: 10,
        width: view_width * 0.9
    }
});

export default TextInput_Exp;