/*
    Filename: src/views/common/cardItem.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:54 AM

    Description:
        Card Item showed on card list.

 */


import React, {Component} from 'react';
import {View, Image, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Linking} from 'react-native';
import {Theme, File, Helpers, Text} from '../../../core';
import {Navigation, Dialog, Auth, Ajax} from '../../models/index';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {Translate} from "../../../core/i18";


export class CardItem extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null,
            retries: 0,
            loading: false,
            menu: false,
            menuTrigger: false,
            translateY: new Animated.Value(-1)
        };
        this.onPress = this.onPress.bind(this);
        this.loadCard = this.loadCard.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);



        this.onPinButtonClicked = this.onPinButtonClicked.bind(this);
        this.onPrintButtonClicked = this.onPrintButtonClicked.bind(this);
        this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this);
        this.onShareButtonClicked = this.onShareButtonClicked.bind(this);
    }

    // loads image after component added to view
    componentDidMount() {
        this.setState({loading: true});
        this.loadCard();

    }

    // download and display a card
    loadCard() {
        const path = 'ehda/' + this.props.name + '/single';
        // check if file exists
        File.exists(path).then(result => {
            if (result > 0) {
                // load and display image on view
                File.read(path).then(data => {
                    this.setState({
                        image: Helpers.decodeFile(data),
                        loading: false
                    })
                })
            } else {
                // download images and display it.
                this.props.dispatch(Auth.downloadCard(this.props.name, (result) => {
                    if (result) {
                        File.read(path).then(data => {
                            this.setState({
                                image: Helpers.decodeFile(data),
                                loading: false
                            })
                        });
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                }));
            }
        });
    }

    onPress() {

        if (!this.state.image) {
            this.loadCard();
        } else {
            const menuTrigger = this.state.menuTrigger;
            if (!menuTrigger) {
                this.showMenu();
                this.setState({menuTrigger: true});
            } else {
                this.hideMenu();
            }
        }
    }


    showMenu() {
        if (!this.state.menu) {
            Animated.timing(
                this.state.translateY,
                {
                    toValue: 0,
                    duration: 200,
                }
            ).start();


            this.myTimer = setTimeout(()=>{
                if (this.state.menu)
                    this.hideMenu();
            }, 4000);


            this.setState({
                menu: true
            });
        }
    }


    hideMenu() {
        if (this.state.menuTrigger) {
            Animated.timing(
                this.state.translateY,
                {
                    toValue: -1,
                    duration: 500,
                }
            ).start(() => {

                if(this.myTimer)
                clearTimeout(this.myTimer);

                this.setState({
                    menu: false,
                    menuTrigger: false
                });
            });
        }
    }


    onPinButtonClicked(){

        this.props.dispatch(Auth.changePinnedCard(this.props.name));
        this.props.dispatch(Navigation.goTo('myCard'));
    }

    onShareButtonClicked() {
        const pinnedCard = this.props.name;
        const url = 'ehda/' + pinnedCard + '/social';
        File.read(url).then((data) => {
            this.props.dispatch(Dialog.openSharing({
                uri: data,
                title: Translate('shareMyBonesTtile'),
                message: Translate('shareMyBones')
            }));
        }).catch(() => {
        });
    }

    onSaveButtonClicked() {
        const pinnedCard = this.props.name;

        const url = 'ehda/' + pinnedCard + '/social';

        this.props.dispatch(Ajax.startLoading([Translate('saveCardDone'), Translate('saveCardError')]));


        this.props.dispatch(Ajax.stopLoading(0, () => {
            File.saveFileToGallery(url);
        }));

    }

    onPrintButtonClicked() {
        const pinnedCard = this.props.value;

        const url = pinnedCard.info.ehda_card_print;

        this.props.dispatch(Ajax.startLoading([Translate('printCardDone'), Translate('printCardError')]));

        Linking.canOpenURL(url).then(supported => {
            if (supported) {

                this.props.dispatch(Ajax.stopLoading(0, () => {

                    Linking.openURL(url);
                }));
            } else {

                this.props.dispatch(Ajax.stopLoading(1));
            }
        });
    }

    render() {
        return (<TouchableOpacity ref={ref => this.Base = ref} style={styles.container} onPress={this.onPress}>
                {this.state.image ?
                    <Animated.View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        opacity: this.state.translateY.interpolate({
                            inputRange: [-1, 0],
                            outputRange: [1, 0.3]
                        })
                    }}>
                        <Image style={styles.image} resizeMode={'contain'} source={this.state.image}/>
                    </Animated.View> :
                    <View style={styles.loadingContainer}>
                        {this.state.loading ?
                            <ActivityIndicator size="large" color={Theme.accent} animating={true}/> :
                            <Icon name={'error'} size={40} color={Theme.red}/>}
                    </View>
                }
                <Animated.View style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    flexDirection: 'row',
                    alignContent: 'center',
                    borderRadius: 10,
                    margin: 20,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    backgroundColor: Theme.white,
                    ...Theme.shadow,
                    opacity: this.state.translateY.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [0, 1]
                    }),
                    transform: [{
                        translateY: this.state.translateY.interpolate({
                            inputRange: [-1, 0],
                            outputRange: [100, 0]
                        })
                    }]
                }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onPinButtonClicked}>
                        <Icon name={'offline-pin'} color={Theme.white} size={20} style={styles.buttonText}/>
                        <Text style={styles.buttonText}>{Translate('pin')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onSaveButtonClicked}>
                        <Icon name={'file-download'} color={Theme.white} size={20} style={styles.buttonText}/>
                        <Text style={styles.buttonText}>{Translate('saveIt')}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onShareButtonClicked}>
                        <Icon name={'share'} color={Theme.white} size={20} style={styles.buttonText}/>
                        <Text style={styles.buttonText}>{Translate('shareIt')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onPrintButtonClicked}>
                        <Icon name={'print'} color={Theme.white} size={20} style={styles.buttonText}/>
                        <Text style={styles.buttonText}>{Translate('printIt')}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        height: 200
    },
    buttonContainer: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: Theme.accent,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        color: Theme.text, paddingVertical: 2,


    },
    loadingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
    },

});