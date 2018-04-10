import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Animated
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


import Theme from '../../../core/theme'

import {Translate} from "../../../core/i18";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from '../../../core/ui/text';


class Picker extends Component {
    static propTypes = {
        data: PropTypes.array,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            selected: null,

            translateY: new Animated.Value(-1)
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.onCancelClicked = this.onCancelClicked.bind(this);
    }

    onCancelClicked() {
        this.props.onChange(null);
        this.setState({selected: null});
        this.hide();
    }

    componentDidMount() {
        this.setState({data: this.props.data});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    show(d) {

        Keyboard.dismiss();

        this.state.translateY.setValue(-2);
        Animated.timing(
            this.state.translateY,
            {
                toValue: 0,
                duration: 500,
            }
        ).start();


        this.setState({
            show: true,
            selected: d
        });
    }

    hide() {


        this.state.translateY.setValue(0);
        Animated.timing(
            this.state.translateY,
            {
                toValue: -1,
                duration: 500,
            }
        ).start(() => {

            this.setState({
                show: false
            });
        });
    }


    render() {
        const {onChange, data} = this.props;
        const {selected} = this.state;


        return (this.state.show &&
            <TouchableWithoutFeedback style={{zIndex: 9999}} onPress={() => {
                this.hide();
            }}>
                <Animated.View style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    opacity: this.state.translateY.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [0, 1]
                    })
                }}>
                    <KeyboardAwareScrollView>

                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            <Animated.View style={{
                                padding: 20,
                                backgroundColor: '#fff',
                                transform: [{
                                    translateY: this.state.translateY.interpolate({
                                        inputRange: [-1, 0],
                                        outputRange: [-600, 0]
                                    })
                                }]
                            }}>
                                {
                                    data.map((x, i) =>
                                        <TouchableOpacity key={i} style={styles.menuItem} onPress={() => {
                                            onChange(x.id);
                                            this.setState({selected: x.id});
                                            this.hide();
                                        }}>
                                            <View style={styles.menuItem_direct}>
                                                {x.id === selected &&
                                                <Icon name={'check'} style={styles.menuItem_icon} size={20}/>}
                                                <Text style={styles.menuItem_text}>{x.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                <TouchableOpacity style={{
                                    flex: 1
                                }} onPress={this.onCancelClicked}>
                                    <View style={styles.menuItem_direct}>
                                        <Text style={{color: Theme.gray}}>{Translate('cancel')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>

                        </TouchableWithoutFeedback>
                    </KeyboardAwareScrollView>


                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
};


const styles = StyleSheet.create({
    calendar_row_buttons: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuItem: {
        flex: 1,
        borderBottomColor: Theme.border,
        borderBottomWidth: 1
    },
    menuItem_text: {
        fontSize: 16,
    },
    menuItem_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    menuItem_icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        paddingTop: 2
    }
});


export default Picker;