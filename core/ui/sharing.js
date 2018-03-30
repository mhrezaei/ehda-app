import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Keyboard,
    Animated,
    Image
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


import theme from '../theme'
import {Translate} from "../i18";
import Text from './text';


const icons = {
    telegram: {
        uri: 'data:image/png;base64,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'
    },
    whatsapp: {
        uri: 'data:image/png;base64,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'
    },
    twitter: {
        uri: 'data:image/png;base64,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'
    },
    instagram: {
        uri: 'data:image/png;base64,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'
    },
    facebook: {
        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA/KAAAPygGWFyNmAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAWtQTFRF////O1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYO1mYPlyaP1yaQF6bQV6bRGGdR2OeSmagTWihTmmiUWujUWykU22lVG6lVW+mVnCmV3CnV3GnWHKnWXKoWnOoW3SpYHirYXqsZX2uZ36vb4WzdYq3eY65f5K8hJe+iZvBjZ/DkaLFmqrKnazMoK/NorDOpLLPpbPQsb3WtMDYtcHYtsHZucTavMbcxM3gxc7hyNHizNPkzdXl1Nvo2uDs2+Ds3uPu3+Tu5enx5+vy7vH28fP48vT49/j7+vv9/f7+/v7/////jHi0RgAAADd0Uk5TAAEDBAYLDA4VHB4fNDg8PUJDR0pbc3yCg4SGiImVlqWnq661uLq/wsPFy9DT2d7m6+zt8/n6/uYUS2MAAAQQSURBVHja1ZvnXxNBEIYHSAglQIAUScA0Eo6EFAK5ERUrIChFLKiIDRUUxa7cn+8HEOESkpvdWfd8P19+8+TK7szsOwAi8vmDkXjayBfL09PlYt5IxyNBvw/+ibwDw9kS1lUpOzzgVRrcExgar2JDVcfPBTyKwveMVNCRKiM9/NG7wwUkqBDuZg3vT5lIlJnys4XvG0UhjfaxhO8fQ2GN9UuH70yilJKdUuHbQlMoqalQm3j83glk0ESvYPjWqIksMqOtQk/fQDYZAm/C4CQyanKQGL4lZiKrzFgLaddJILsShD2qPYMKlGl3Gr8jh0qU63AWv6uAilTocvT/lcVHLDi4B+05VKhc0/fAk0GlyjT5FloSqFiJxutBDJUr1nD9FVr/Lt68vbS0uHhrYWF+bm7uSrM1scGq3Ele/1e33n36bp3SdtN94cydqZW4/1199tmqVVMANM7anaO0+A+/WZYQAEbPyH9IL8DsrmWJAph1c6Q2Uv51ec8SB8CJenliiBL/0ntLBgBDdb4AUv773JIDmKr9Ekj5/9JPSQBM1tQ/pA9gx5IFQHvNRKq/5i15gDFb/Um6AU8YAPB05Uqrf/cbAbxyWjufqv9J8Wd+cdwBPNk/SJEAFiwWgNSJ/gttF16vCXrwen35zpGuOa5V/nZxwrRdaKMG4KlQahI+BiDmwVv2+D8uiOXIx/034g9f2gH2BLOzP928EeLvtu0AbwQBzh9l4hVdAJXDHD2AugAwAAAAQ/oAhgAAYFwfwDgAgLeqD6DqBYAB1AeAAwAwrBNgGACyjq9eXjnUWzvA7soJXacAZAGg5PjqL5YTbVEASgA+ZAZ4RHoGPkou4gzgPgnAD0FugDUSQBAi3AA3SAARiDMDHMyQAOKQZgb4SlsI0mAwA3wgNvIhzwywQwPIQ5EZ4AUNoAhlZoBNGkAZppkBNmgA0+wA96gA3I9glfoICC/h481DfbQH3d/8q1nqS5hHshgTEsyDoRfAoCzFKgDSlM1IBUCcsh2rAIhQEhIVAEFie4gdwE9JSlUA+ChpuQKAEqkwUQCQdUNppr041V6ea29Q6G/RaG9SaW/TaW9Uklu1bAA9gs1qLoCCaLueCyAsemDBBHDiwIJ4ZMMEkBI+tGIC8Asf2/EAjIofXPIA9Ikf3bIAjEkcXrMA9Esc33MAJGUMDAwAdQwMBAsHA0BIysQiD1DXxOLcxiMNYPbKGZmkAaKSVi5ZgDOtXE7NbJIAk52ydj45AHNQ2tAoBxCTt3RKATSxdDoytcoAZDwMtl4JgFw7h7F57YFNdx3nwR3/g7Vbv7ldv71f/4CD/hEP/UMuLhjz0T/opH/UywXDbvrH/Vww8OiCkU8XDL26YOzXBYPPbhj9dsHwu4rx/9+gi6dJQUBdnwAAAABJRU5ErkJggg=='
    },
    share: {
        uri: 'data:image/png;base64,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'
    }
};

class Sharing extends Component {
    static propTypes = {
        data: PropTypes.array
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
        this.onShare = this.onShare.bind(this);
    }

    onShare(to){

    }
    onCancelClicked(){
        this.hide();
    }
    componentDidMount() {
        this.setState({data: this.props.data});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    show(content) {

        Keyboard.dismiss();

        this.state.translateY.setValue(-1);
        Animated.timing(
            this.state.translateY,
            {
                toValue: 0,
                duration: 500,
            }
        ).start();


        this.setState({
            show: true,
            content: content
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

        return (this.state.show &&
            <Animated.View style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999,
                opacity: this.state.translateY.interpolate({
                    inputRange: [-1, 0],
                    outputRange: [0, 1]
                })
            }}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        flexGrow: 1, flexDirection: 'column-reverse', justifyContent: 'space-between'
                    }}>
                    <Animated.View style={{
                        padding: 20,
                        backgroundColor: '#fff',
                        transform: [{
                            translateY: this.state.translateY.interpolate({
                                inputRange: [-1, 0],
                                outputRange: [300, 0]
                            })
                        }]
                    }}>


                        <View style={{
                            flex: 1,
                            flexDirection: 'row-reverse',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                        }}>

                            <Image source={icons.share} style={{width: 20, height: 20, marginHorizontal: 10}}
                                   resizeMode={'contain'}/>

                            <Text>{Translate('shareWith')}</Text>
                        </View>


                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 20,
                            paddingHorizontal: 5,
                        }}>
                            <TouchableOpacity style={{flex: 1}} onPress={x=>this.onShare('facebook')}>
                                <Image source={icons.facebook} style={{height: 45}} resizeMode={'contain'}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1}} onPress={x=>this.onShare('twitter')}>
                                <Image source={icons.twitter} style={{height: 45}} resizeMode={'contain'}/>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{flex: 1}} onPress={this.onCancelClicked}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row-reverse',
                                justifyContent:'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 20,
                                paddingVertical: 5
                            }}>
                                <Text style={{
                                    fontFamily: theme.font,
                                    textAlign: 'center',
                                    fontSize: 16
                                }}>{Translate('cancel')}</Text>
                            </View>
                        </TouchableOpacity>


                    </Animated.View>
                </KeyboardAwareScrollView>


            </Animated.View>
        );
    }
};

Sharing.Icons = icons;

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
        borderBottomColor: theme.border,
        borderBottomWidth: 1
    },
    menuItem_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    menuItem_text: {
        fontFamily: theme.font
    },
    menuItem_icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        paddingTop: 2
    }
});


export default Sharing;