import React from 'react';
import {connect} from 'react-redux';
import * as nav_methods from './data/nav/methods'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Dimensions,TouchableHighlight} from 'react-native';
import theme from './theme';
import menu_icon from './icons/menu.svg';

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    components: PropTypes.object.isRequired,
    defaultRoute: PropTypes.string.isRequired
};


const { width, height } = Dimensions.get('window');

class Router extends React.Component {
    constructor(props){
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(){
        this.props.actions.toggleMenu();
    }

    render() {
        const {components, where, defaultRoute, menuOpen} = this.props;
        const comp = components[components.hasOwnProperty(where) ? where : defaultRoute];

        return (<View style={styles.container}>
            <View style={styles.navbar}>
                <View>
                    <Text style={styles.text}>Navbar</Text>
                    <Icon name="bars" onPress={this.toggleMenu} style={styles.icon} size={16} color="#fff"/>
                </View>
            </View>
            <View style={styles.view}>
                {React.createElement(comp.layout, null)}
            </View>

            {menuOpen &&
            <View style={styles.menuFader}>
                <TouchableHighlight style={styles.menuCloseArea} onPress={this.toggleMenu}>
                    <Text></Text>
                </TouchableHighlight>
                <View style={styles.menu}>
                    <View style={styles.menuHeader}>
                        <View style={styles.menuProfile}/>
                        <Text style={styles.menuText}>Somebody</Text>
                    </View>
                    <View>
                        
                    </View>
                </View>
            </View>}
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    navbar:{
        backgroundColor: theme.primaryColor,
        width: width,
        padding: 16
    },
    text: {
        fontSize: 16,
        color: theme.textColorLight,
        textAlign:'center'
    },
    icon: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 4
    },
    view: {
        padding: 10,
        zIndex: 1,
    },

    menuFader: {
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 9997,
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    menu: {
        position: 'absolute',
        width: width-80,
        height: height,
        zIndex: 9999,
        backgroundColor: "#eee",
        top: 0,
        right: 0
    },
    menuHeader: {
        backgroundColor: theme.primaryColor,
        height: 120,
    },
    menuProfile: {
        backgroundColor: theme.gray100,
        borderRadius: 60,
        width: 60,
        height: 60,
        position: 'absolute',
        right: 35,
        top: 20,

    },
    menuCloseArea:{
        position: 'absolute',
        width: 80,
        height: height,
        zIndex: 9998,
        top: 0,
        left: 0
    },
    menuText: {
        textAlign: 'right',
        position: 'absolute',
        right: 30,
        top: 90,
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
