/*
    Filename: src/views/common/cardItem.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:54 AM

    Description:
        Card Item showed on card list.

 */


import React, {Component} from 'react';
import {View, Image, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import {Theme, File, Helpers} from '../../../core';
import {Navigation, Auth, Ajax} from '../../models/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';


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
            loading: false
        };
        this.onPress = this.onPress.bind(this);
        this.loadCard = this.loadCard.bind(this);
    }

    // loads image after component added to view
    componentDidMount() {
        this.setState({loading: true});
        this.loadCard();

    }

    // download and display a card
    loadCard(){
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
        if(!this.state.loading) {
            // check if image is broken
            if (!this.state.image) {
                this.loadCard();

            } else {
                this.props.dispatch(Auth.changePinnedCard(this.props.name));
                this.props.dispatch(Navigation.goTo('myCard'));
            }
        }
    }

    render() {
        return (<TouchableOpacity ref={ref => this.Base = ref} style={styles.container} onPress={this.onPress}>
                {this.state.image ?
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} resizeMode={'contain'} source={this.state.image}/>
                    </View> :
                    <View style={styles.loadingContainer}>
                        {this.state.loading ?
                            <ActivityIndicator size="large" color={Theme.accent} animating={true}/> :
                            <Icon name={'error'} size={40} color={Theme.red}/>}
                    </View>
                }
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    imageContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    image: {
        flex: 1,
        height: 200
    },
    loadingContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
    },

});