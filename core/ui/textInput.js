import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TextInput as TextInputParent,
} from 'react-native'



import Theme from '../theme';


const TextInput = ({style, children, ...props}) => {
    return (
        <TextInputParent
            style={StyleSheet.flatten([styles.textInput, style])}
            underlineColorAndroid={Theme.transparent}
            {...props}>
            {children}
        </TextInputParent>
    );
};

TextInput.propTypes = {
    style: PropTypes.any,
    children: PropTypes.string
};


const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        borderRadius: 5,
        color: Theme.textInvert,
        fontFamily: Theme.font,
        fontSize: 14,
        margin: 10,
        flex: 1,
        borderBottomColor: Theme.accentLight,
        borderBottomWidth: 2,
        paddingVertical: 10
    }
});

export default TextInput;