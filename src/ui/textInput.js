import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TextInput,
    Dimensions
} from 'react-native'



import theme from '../theme';


const TextInput_Exp = ({style, children, ...props}) => {


    return (
        <TextInput
            style={StyleSheet.flatten([styles.textInput, style])}
            underlineColorAndroid={theme.transparent}
            {...props}>
            {children}
        </TextInput>
    );
};

TextInput_Exp.propTypes = {
    style: PropTypes.any,
    children: PropTypes.string
};


const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#fff',
        textAlign: 'center',
        borderRadius: 5,
        color: theme.textInvert,
        fontFamily: theme.font,
        fontSize: 14,
        margin: 5
    }
});

export default TextInput_Exp;