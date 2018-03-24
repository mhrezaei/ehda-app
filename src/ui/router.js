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
        this.check = this.check.bind(this);

    }
    componentDidMount(){
        const {routes, current} = this.props;
        this.props.onChange(routes[current]);

    }
    componentWillMount(){
        this.check(this.props.current);
    }

    check(next){
        const defaultRoute = this.props.defaultRoute;
        const routes = this.props.routes;
        if(routes.hasOwnProperty(next)){
            const route = routes[next];
            if (route.hasOwnProperty('condition') && !route.condition(this.props.state)) {
                const to = route.hasOwnProperty('redirect') ? route.redirect : defaultRoute;
                this.props.actions.goto(to);
                this.props.onChange(routes[to]);
                return;
            }
            this.props.actions.goto(next);
            this.props.onChange(routes[next]);
        }
    }
    componentWillReceiveProps(nextProps) {

        const current = this.props.current;
        const next = nextProps.current;
        if(next !== current){
            this.check(next);
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
        const {routes, current} = this.props;
        const route = routes[current];
        return React.createElement(route.component, null);
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