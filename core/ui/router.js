import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Router extends Component {
    static propTypes = {
        routes: PropTypes.object.isRequired,
        current: PropTypes.string,
        defaultRoute: PropTypes.string.isRequired,
        redux: PropTypes.object
    };
    constructor(props){
        super(props);
        this.getCurrentRoute = this.getCurrentRoute.bind(this);
    }

    getCurrentRoute(){
        const {current, routes} = this.props;
        return routes[current];
    }
    render() {
        const {routes, current, defaultRoute} = this.props;

        if (routes.hasOwnProperty(current)) {
            const route = routes[current];
            if (route.hasOwnProperty('redirect')) {
                const to = route.redirect(this.props.redux);
                if (to) {
                    const Comp = routes[to].component;
                    return <Comp/>;
                }
            }
            const Comp = route.component;
            return <Comp/>;
        } else{
            const Comp = routes[defaultRoute].component;
            return <Comp/>;
        }
    }


}

export default Router;