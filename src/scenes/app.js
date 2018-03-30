import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Drawer from 'react-native-drawer';
import {Attach, Theme, Helpers, Text, ActionBar, Translate, Router, Loading} from "../../core/index";
import {Auth, Navigation} from '../redux/index';
import {Routes} from '../routes';
import {Menu} from "./menu";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: Theme.background,
    }
});

class App extends Component {
    static propTypes = {
        ajaxRequests: PropTypes.number,
        ajaxInternet: PropTypes.bool,
        ajaxStatus: PropTypes.number,
        currentRoute: PropTypes.string,
        defaultRoute: PropTypes.string,
        redux: PropTypes.object,
        pinnedCardOwnerName: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onItemClicked = this.onItemClicked.bind(this);

    }
    componentWillReceiveProps(nextProps){
        const current = nextProps.currentRoute;
        const old = this.props.currentRoute;
        if(current !== old)
            this.closeDrawer();

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
        const {redux, ajaxRequests, progress, ajaxInternet, ajaxStatus, currentRoute, defaultRoute, pinnedCardOwnerName, dispatch} = this.props;

        return (
            <Drawer
                ref={(ref) => this.drawer = ref}
                type="displace"
                tapToClose={true}
                styles={{
                    drawer:{
                        shadowColor: Theme.black,
                        shadowOffset: {
                            width: 6,
                            height: 0
                        },

                        shadowRadius: 10,
                        shadowOpacity: 0.6,
                        elevation: 2
                    }
                }}
                openDrawerOffset={0.15}
                panCloseMask={0.6}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({main: {opacity: (1.4 - ratio) / 1.4}})}
                side={"right"}
                content={<Menu title={pinnedCardOwnerName} onPress={this.onItemClicked} dispatch={dispatch} routes={Routes} redux={redux}/>}
            >
                <View style={styles.container}>
                    <ActionBar name={Translate('app')} loading={ajaxRequests > 0}  title={Routes[currentRoute].title} onPress={this.openDrawer}/>

                    {ajaxInternet === false && <TouchableOpacity style={{
                        backgroundColor: Theme.accent,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row-reverse',
                            alignContent: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 10
                        }}>
                            <Text invert>{Translate('noInternet')}</Text>
                        </View>
                    </TouchableOpacity>}

                    <Router routes={Routes} defaultRoute={defaultRoute} current={currentRoute} redux={redux}/>

                    <Loading progress={progress}/>
                </View>

            </Drawer>
        );
    }
}


export default Attach({
    'auth.pinned': (pinned, whole) => {
        return {
            pinnedCardOwnerName: Helpers.leaf(whole, `auth.cards.${pinned}.info.ehda_card_details.full_name`)
        }
    },
    'ajax': (ajax) => {
        return {
            ajaxRequests: ajax.ajax,
            ajaxInternet: ajax.internet,
            ajaxStatus: ajax.status,
            progress: ajax.progress
        }
    },
    'navigation': (nav) => {
        return {
            currentRoute: nav.current,
            defaultRoute: nav.default,
        };
    }
})(App);