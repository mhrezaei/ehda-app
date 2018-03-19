import React, {Component} from 'react';

import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';


import i18 from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app_methods from '../../data/app/methods';

class Home extends Component {
    constructor(props){
        super(props);
        this.changeLang = this.changeLang.bind(this);
    }


    changeLang(){
        this.props.app_methods.switch_language();
    }

    render(){
        return (
            <View>
                <TouchableOpacity style={styles.button} onPress={this.changeLang}>
                    <Text style={styles.button_text}>
                        Change Language { this.props.language }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3b59f7',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    button_text: {
        color: '#fff'
    }
});

export default connect((state)=>{
    return {
        lang: state.getIn(['app','lang'])
    };
}, (dispatch)=>{
    return {
        app_methods: bindActionCreators(app_methods, dispatch)
    };
})( Home );
