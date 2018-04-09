import React, {Component} from 'react';

import {View, StyleSheet, Image, Dimensions, Platform, ScrollView} from 'react-native';

import {Text, Translate,Helpers} from '../../core';

import {Container} from "./common/container";


import splash from '../resources/splash';



const window = Dimensions.get('window');
const viewWidth = Helpers.min(window.width, window.height);

import temp from './temp.jpg';


class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            failed: false
        };
    }


    render() {
        return (
            <Container>

                <ScrollView>


                    <View style={styles.imageContainer}>
                        <Image style={styles.myImage} resizeMode={'cover'} source={temp}/>
                    </View>
                    <View style={{padding: 10}}>
                    <Text style={styles.title}>{Translate('tests')}</Text>
                    <Text style={styles.text}>{Translate('aboutText')}</Text>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: viewWidth
    },
    myImage: {
        flex: 1,
        height: 240,
    },


    title: {
        fontSize: 18,
    },
    text:{
        padding: 15,
        fontSize: 16,
        direction: 'rtl',
        textAlign: Platform.OS === 'ios' ? 'justify' : 'right',
        writingDirection:'rtl',
        lineHeight: 30
    }
});


export default News;