import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Router extends Component {
    static propTypes = {
        routes: PropTypes.object.isRequired,
        current: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            current: 'searchCard'
        };
    }

    render() {
        const {routes, current} = this.props;

        const Comp = routes[current].component;
        return <Comp/>;
    }


}


export default Router;