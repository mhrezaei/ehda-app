import React, {Component} from 'react';

import {View, StyleSheet, Image, WebView, Platform} from 'react-native';

import {Text, Translate} from '../../core';

import {Container} from "./common/container";
import {ScrollView} from "./common/scrollView";


import splash from '../resources/splash';

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
                <ScrollView ref={ref => this.container = ref}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.myImage} resizeMode={'contain'} source={splash}/>
                    </View>
                    <Text style={styles.text}>{Translate('aboutText')}</Text>
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
        paddingVertical: 20,
    },
    myImage: {
        flex: 1,
        height: 90,
        borderRadius: 5,
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