import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Keyboard,
    Animated,
    TextInput,

    TouchableOpacity
} from 'react-native';

import {Theme} from '../../../core'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog from "../../models/dialog";
import {Translate} from "../../../core/i18";


class Search extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        dispatch: PropTypes.func,
    };
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            translateY: new Animated.Value(-1),
            content: null
        };

        this.show = this.show.bind(this);
        this.onCancelClicked = this.onCancelClicked.bind(this);
    }

    onCancelClicked() {
        this.props.onChangeText(null);
        this.hide();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible) {
            if (nextProps.visible) {
                this.show();
            } else {
                this.hide();
            }
        }
    }

    componentDidMount() {
        if (this.props.visible) {
            this.state.translateY.setValue(0);
            this.setState({
                show: true
            });
        }
    }

    show() {

        Keyboard.dismiss();

        this.state.translateY.setValue(-1);
        Animated.timing(
            this.state.translateY,
            {
                toValue: 0,
                duration: 300,
            }
        ).start();


        this.setState({
            show: true
        });
    }

    hide() {
        this.state.translateY.setValue(0);
        Animated.timing(
            this.state.translateY,
            {
                toValue: -1,
                duration: 300,
            }
        ).start(() => {
            this.props.dispatch(Dialog.closeSearch());
            this.setState({
                show: false
            });
        });
    }

    render() {
        return (this.state.show &&
            <Animated.View style={{
                flexDirection: 'row-reverse',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: Theme.white,
                ...Theme.shadow,
                zIndex: 5,
                shadowOpacity: 0.2,
                height: this.state.translateY.interpolate({
                    inputRange: [-1, 0],
                    outputRange: [0, 60]
                })
            }}>
                <TextInput underlineColorAndroid={Theme.transparent} placeholder={Translate('codeMelliOrName')} style={styles.textInput}
                           onChangeText={this.props.onChangeText}/>
                <TouchableOpacity style={styles.icon} onPress={this.onCancelClicked}>
                    <Icon name={'close'} size={25} color={Theme.gray}/>
                </TouchableOpacity>
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    container: {},
    icon: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        right: 0,
        width: 40,
        zIndex: 80,
    },
    textInput: {

        textAlign: 'center',
        borderRadius: 5,
        color: Theme.textInvert,
        fontFamily: Theme.font,
        fontSize: 20,
        paddingTop: 4,
        flex: 1,
        height: 56,
        paddingHorizontal: 20,
    }
});


export default Search;