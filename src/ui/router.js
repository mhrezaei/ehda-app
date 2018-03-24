import React from 'react';
import {connect} from 'react-redux';
import * as nav_methods from '../data/nav/methods'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

// import {StyleSheet, View, Text, Dimensions,TouchableHighlight} from 'react-native';


class Router extends React.Component {
    static propTypes = {
        routes: PropTypes.object.isRequired,
        current: PropTypes.string,
        defaultRoute: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
        onChange: PropTypes.func,
        state: PropTypes.object
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
        const {routes, current} = this.props;
        const next = nextProps.current;
        if(next !== current){
            this.props.onChange(routes[next]);
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
        const {routes, current,defaultRoute} = this.props;

        if(routes.hasOwnProperty(current)){
            const route = routes[current];
            if (route.hasOwnProperty('condition') && !route.condition(this.props.state)) {
                const to = route.hasOwnProperty('redirect') ? route.redirect : defaultRoute;
                return React.createElement(routes[to].component, null);
            }
            return React.createElement(route.component, null);
        }

    }
}

export default connect((state) => {
    return {
        "defaultRoute": state.nav.default,
        "current": state.nav.current,
        "state": state,
    }
}, (dispatch) => {
    return {
        actions: bindActionCreators(nav_methods, dispatch)
    }
})(Router)