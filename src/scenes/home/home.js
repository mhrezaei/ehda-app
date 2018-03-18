import React, {Component} from 'react';

import {View, Text, Button } from 'react-native';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app_methods from '../../data/app/methods';
import * as auth_methods from "../../data/auth/methods";
import * as server_methods from "../../data/server/methods";


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
                <Button title={"change language"} onPress={this.changeLang}/>
                <Text>{this.props.lang}</Text>
            </View>
        );
    }
}
export default connect((state)=>{
    return {
        lang: state.getIn(['app','lang'])
    };
}, (dispatch)=>{
    return {
        app_methods: bindActionCreators(app_methods, dispatch)
    };
})( Home );
