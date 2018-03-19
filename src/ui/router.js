import React from 'react';
import {connect} from 'react-redux';
import * as nav_methods from '../data/nav/methods'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Dimensions,TouchableHighlight} from 'react-native';


class Router extends React.Component {
    static propTypes = {
        routes: PropTypes.object.isRequired,
        current: PropTypes.string,
        defaultRoute: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
        onChange: PropTypes.func,

    };
    constructor(props){
        super(props);
        this.getCurrentRoute = this.getCurrentRoute.bind(this);
    }
    componentDidMount(){
        const {routes, current} = this.props;
        this.props.onChange(routes[current]);

    }
    componentWillReceiveProps(nextProps) {
        const app_state = this.props.state;
        const routes = this.props.routes;
        const defaultRoute = this.props.defaultRoute;
        const current = this.props.current;

        const next = nextProps.current;
        if(next !== current){

            if(routes.hasOwnProperty(next)){
                const route = routes[next];
                if (route.hasOwnProperty('condition') && !route.condition(app_state)) {
                    const to = route.hasOwnProperty('redirect') ? route.redirect : defaultRoute;
                    this.props.actions.goto(to)
                    this.props.onChange(routes[to]);
                    return;
                }
                this.props.actions.goto(next);
                this.props.onChange(routes[next]);
            }
        }

    }
    shouldComponentUpdate(nextProps) {
        return this.props.current !== nextProps.current;
    }
    getCurrentRoute(){
        const {current, routes} = this.props;
        return routes[current];
    }
    render() {
        const {routes, current, defaultRoute} = this.props;
        const route = routes[current];
        return React.createElement(route.component, null);
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