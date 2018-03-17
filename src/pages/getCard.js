import React from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';

import trans from '../app/lang';


type Props = {};

class GetCard extends React.Component<Props> {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View>
               <Text>Card Is Here</Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10,
    }
});


export default GetCard;