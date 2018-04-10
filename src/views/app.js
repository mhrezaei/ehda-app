import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import Drawer from 'react-native-drawer';
import {Attach, Theme, Helpers, Text, ActionBar, Translate, Router, Loading, Calendar, Sharing} from "../../core/index";
import {Auth, Navigation, Ajax, Dialog} from '../models/index';
import {Menu} from "./menu/menu";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LocalizeNumber} from "../../core/i18";


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
        this.onBack = this.onBack.bind(this);
        this.onInternetBannerClicked = this.onInternetBannerClicked.bind(this);


    }

    onBack(){


        if (this.props.routeHistory.length > 0) {
            this.props.dispatch(Navigation.goBack());
            return true;
        }
        return false;
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
    onInternetBannerClicked(){

        this.props.dispatch(Ajax.startLoading([Translate('internetConnected'), Translate('internetError')]));


        this.props.dispatch(Auth.getToken((status) => {
            if(status)
                this.props.dispatch(Ajax.stopLoading(0));
            else
                this.props.dispatch(Ajax.stopLoading(1));
        }));
    }
    openDrawer() {
        if(this.drawer)
        this.drawer.open();
    }

    closeDrawer() {
        if(this.drawer)
        this.drawer.close();
    }

    onItemClicked(key) {
        this.props.dispatch(Navigation.goTo(key));

        this.closeDrawer();
    }
    componentDidMount(){

        BackHandler.addEventListener('hardwareBackPress', this.onBack);

    }
    componentWillUnmount(){
        BackHandler.removeEventListener();
    }

    render() {
        const {redux, sharing, routes, calendar, cardsCount, search, ajaxRequests, progress, ajaxInternet, currentRoute, defaultRoute, ownerName, dispatch} = this.props;

        const crt = routes[currentRoute];
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
                content={<Menu current={currentRoute} title={ownerName} onPress={this.onItemClicked} dispatch={dispatch}
                               routes={routes} redux={redux}/>}
            >
                <View style={styles.container}>


                    <ActionBar dispatch={dispatch} actions={crt.hasOwnProperty('actions') ? crt.actions : null} name={Translate('app')} loading={ajaxRequests > 0} title={crt.title}
                               onPress={this.openDrawer}/>

                    {ajaxInternet === false && <TouchableOpacity style={styles.banner} onPress={this.onInternetBannerClicked}>
                        <View style={styles.bannerDirect}>
                            <Text invert>{Translate('noInternet')}</Text>
                        </View>
                    </TouchableOpacity>}

                    <Router routes={routes} defaultRoute={defaultRoute} current={currentRoute} redux={redux}/>

                    {['myCard', 'myCards', 'contact', 'about'].includes(currentRoute) && <View style={styles.floatingButtonContainer}>
                        <TouchableOpacity style={styles.floatingButtonIcon} onPress={this.gotoSearchCard}>
                            <Icon name={'add'} color={Theme.white} size={20}/>
                            {cardsCount && <View style={styles.cardsCountContainer}><Text style={styles.cardsCount}>{LocalizeNumber(cardsCount.toString())}</Text></View>}
                        </TouchableOpacity>
                    </View>}


                    <Calendar hide={()=>{
                        this.props.dispatch(Dialog.closeCalendar());
                    }} visible={calendar.visible} value={calendar.value}  onChange={calendar.action}/>


                    <Sharing hide={()=>{
                        this.props.dispatch(Dialog.closeSharing());
                    }} visible={sharing.visible} value={sharing.value} />


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
    cardsCountContainer:{
        position: 'absolute',
        width: 25,
        height: 25,
        borderRadius: 40,
        backgroundColor: Theme.accentLight,
        alignContent: 'center',
        justifyContent: 'center'
    },
    cardsCount: {
        position: 'relative',
        color: Theme.white,
        alignSelf: 'center',
        fontSize: 14,
        textAlign: 'center',
    },
    floatingButtonIcon: {
        backgroundColor: Theme.accent,
        padding: 18,
        borderRadius: 40,
        borderColor:Theme.accentDark,
        borderWidth:1,
        ...Theme.shadow
    },
    floatingButtonContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingLeft: 20,
        paddingBottom: 20,
        zIndex: 888
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
    'dialog.calendar': (calendar) => {
        return {
            calendar: calendar
        }
    },
    'dialog.sharing': (sharing) => {
        return {
            sharing: sharing
        }
    },
    'auth.pinned': (pinned, redux) => {
        return {
            ownerName: Helpers.leaf(redux, 'auth.cards.'+ pinned + '.info.ehda_card_details.full_name', ''),
            cardsCount: Object.keys(Helpers.leaf(redux, 'auth.cards', {})).length,
        };
    },
    'ajax': (ajax) => {
        return {
            ajaxRequests: ajax.ajax,
            ajaxInternet: ajax.internet,
            progress: ajax.progress
        };
    },
    'navigation.current': (nav, whole) => {
        return {
            currentRoute: nav || Helpers.leaf(whole, 'navigation.routes.default'),
            routeHistory: Helpers.leaf(whole, 'navigation.history', []),
            routes: Helpers.leaf(whole, 'navigation.routes', {})
        };
    },
})(App);