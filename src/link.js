import React from 'react';
import {connect} from 'react-redux';
import * as nav_methods from './data/nav/methods'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Dimensions,TouchableHighlight} from 'react-native';
import theme from './theme';
import menu_icon from './icons/menu.svg';

import Icon from 'react-native-vector-icons/FontAwesome';

class Router extends React.Component {
    constructor(props){
        super(props);
        this.goto = this.goto.bind(this);
    }

    goto(){
        const {to} = this.props;
        this.props.actions.goto(to);
    }
    render() {
        const {title} = this.props;

        return (<View style={styles.container}>
            <Button style={styles.button} onPress={this.goto} title={name}>haha</Button>
        </View>);
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'relative',
    }
});

export default connect((state) => {
    return {
        where: state.getIn(['nav', 'location']),
        menuOpen: state.getIn(['nav', 'menuOpen']),
    }
}, (dispatch) => {
    return {
        actions: bindActionCreators(nav_methods, dispatch)
    }
})(Router)
