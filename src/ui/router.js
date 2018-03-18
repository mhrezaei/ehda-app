import React from 'react';
import {connect} from 'react-redux';
import * as nav_methods from '../data/nav/methods'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Dimensions,TouchableHighlight} from 'react-native';


class Router extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const {state, routes, current, defaultRoute} = this.props;
        const route = routes[routes.hasOwnProperty(current) ? current : defaultRoute];

        if(route.hasOwnProperty('condition')) {
            if (route.condition(state))
                return React.createElement(route.component, null);
            else
                return React.createElement(routes[defaultRoute], null);
        } else {
            return React.createElement(route.component, null);
        }
    }
}

export default connect((state) => {
    return {
        "defaultRoute": state.getIn(['nav', 'default']),
        "current": state.getIn(['nav', 'current']),
        "state": state,
    }
}, (dispatch) => {
    return {
        actions: bindActionCreators(nav_methods, dispatch)
    }
})(Router)