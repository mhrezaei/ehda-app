import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Drawer from 'react-native-drawer';
import {Attach, Theme, Helpers, Text, ActionBar, Translate, Router, Loading} from "../../core/index";
import {Auth, Navigation} from '../models/index';
import {Routes} from '../routes';
import {Menu} from "./menu/menu";
import Icon from 'react-native-vector-icons/MaterialIcons';


class App extends Component {
    static propTypes = {
        ajaxRequests: PropTypes.number,
        ajaxInternet: PropTypes.bool,
        currentRoute: PropTypes.string,
        defaultRoute: PropTypes.string,
        redux: PropTypes.object,
        progress: PropTypes.object,
        ownerName: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onItemClicked = this.onItemClicked.bind(this);
        this.gotoSearchCard = this.gotoSearchCard.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        const current = nextProps.currentRoute;
        const old = this.props.currentRoute;
        if (current !== old)
            this.closeDrawer();

    }

    gotoSearchCard(){
        this.props.dispatch(Navigation.goTo('searchCard'));
    }
    openDrawer() {
        this.drawer.open();
    }

    closeDrawer() {
        this.drawer.close();
    }

    onItemClicked(key) {
        this.props.dispatch(Navigation.goTo(key));

        this.drawer.close();
    }

    render() {
        const {redux, ajaxRequests, progress, ajaxInternet, currentRoute, defaultRoute, ownerName, dispatch} = this.props;
        return (
            <Drawer
                ref={(ref) => this.drawer = ref}
                type="displace"
                tapToClose={true}
                styles={drawerStyles}
                openDrawerOffset={0.15}
                panCloseMask={0.6}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({main: {opacity: (1.4 - ratio) / 1.4}})}
                side={"right"}
                content={<Menu title={ownerName} onPress={this.onItemClicked} dispatch={dispatch}
                               routes={Routes} redux={redux}/>}
            >
                <View style={styles.container}>
                    <ActionBar name={Translate('app')} loading={ajaxRequests > 0} title={Routes[currentRoute].title}
                               onPress={this.openDrawer}/>

                    {ajaxInternet === false && <TouchableOpacity style={styles.banner}>
                        <View style={styles.bannerDirect}>
                            <Text invert>{Translate('noInternet')}</Text>
                        </View>
                    </TouchableOpacity>}

                    <Router routes={Routes} defaultRoute={defaultRoute} current={currentRoute} redux={redux}/>

                    {['myCard', 'myCards', 'contact', 'about'].includes(currentRoute) && <View style={styles.floatingButtonContainer}>
                        <TouchableOpacity style={styles.floatingButtonIcon} onPress={this.gotoSearchCard}>
                            <Icon name={'add'} color={Theme.white} size={20}/>
                        </TouchableOpacity>
                    </View>}
                    <Loading progress={progress}/>
                </View>

            </Drawer>
        );
    }
}

const drawerStyles = {
    drawer: {
        shadowColor: Theme.black,
        shadowOffset: {
            width: 6,
            height: 0
        },

        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 2
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: Theme.background,
    },
    floatingButtonIcon: {
        backgroundColor: Theme.accent,
        padding: 18,
        borderRadius: 100,
        ...Theme.shadow
    },
    floatingButtonContainer:{
        position: 'absolute',
        left: 20,
        bottom: 20,
        zIndex: 898
    },
    banner:{
        backgroundColor: Theme.accent,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerDirect: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
});

export default Attach({
    'auth.pinned': (pinned, redux) => {
        return {
            ownerName: Helpers.leaf(redux, 'auth.cards.'+ pinned + '.info.ehda_card_details.full_name', '')
        };
    },
    'ajax': (ajax) => {
        return {
            ajaxRequests: ajax.ajax,
            ajaxInternet: ajax.internet,
            progress: ajax.progress
        };
    },
    'navigation': (nav) => {
        return {
            currentRoute: nav.current,
            defaultRoute: nav.default,
        };
    }
})(App);