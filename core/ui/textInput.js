import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TextInput as TextInputParent,
} from 'react-native'


import Theme from '../theme';


class TextInput extends Component {
    static propTypes = {
        style: PropTypes.any,
        children: PropTypes.string,
        onFocus: PropTypes.func,
        hasError: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };

        this.didFocused = this.didFocused.bind(this);
        this.focusLost = this.focusLost.bind(this);
    }

    didFocused() {
        this.setState({
            focused: true
        });
    }

    focusLost() {
        this.setState({
            focused: false
        });
    }


    render() {
        const {style, children, onFocus,hasError, ...props} = this.props;
        return (
            <TextInputParent
                style={{
                    textAlign: 'right',
                    borderRadius: 5,
                    color: Theme.textInvert,
                    fontFamily: Theme.font,
                    fontSize: 16,
                    margin: 10,
                    flex: 1,
                    borderBottomColor: hasError ? Theme.red : (this.state.focused ? Theme.accent : Theme.border),
                    borderBottomWidth: 2,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    ...style
                }}
                placeholderTextColor={Theme.gray}
                onFocus={() => {
                    this.didFocused();
                    if(onFocus) onFocus();
                }}
                onBlur={this.focusLost}
                underlineColorAndroid={Theme.transparent}
                {...props}>
                {children}
            </TextInputParent>
        )
    }
}

export default TextInput;