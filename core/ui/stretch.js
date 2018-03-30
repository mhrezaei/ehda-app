import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native'


const viewWidth = Dimensions.get('window').width;

const Stretch = () => {
    return (
        <View style={styles.stretch}/>
    );
};

const styles = StyleSheet.create({
    stretch: {
        width: viewWidth,
    }
});

export default Stretch;