import React, {Component} from 'react';

// react native
import {StyleSheet, Text, View, Button} from 'react-native';
import {NativeRouter, Route, Link, withRouter} from 'react-router-native';


// temp

import {trans} from './src/i18'


type Props = {};
class Home_Temp extends Component<Props>
{
    constructor(props){
        super(props);

        this.onReqPressed = this.onReqPressed.bind(this);
        this.onLoginPress = this.onLoginPress.bind(this);
        this.changeLang = this.changeLang.bind(this);
    }


    onReqPressed(){
        this.props.server_methods.request_utc_async();
    }
    changeLang(){
        this.props.app_methods.switch_language();
        this.props.history.push('about');
    }
    onLoginPress(){
        this.props.auth_methods.signin_user_async({email: 'aryan@gmail.com'});
    }
    render(){
        const {rcat, rcdat, tkn, lnga} = this.props;
        return (
            <View style={styles.parent}>
                <Text style={styles.header}>
                    Request : { rcat }
                </Text>
                <Text style={styles.header}>
                    Done : { rcdat }
                </Text>

                <Text style={styles.header}>
                    Token : { tkn }
                </Text>

                <Text style={styles.header}>
                    Lang : { lnga }
                </Text>
                <Text style={styles.header}>
                    {trans('hello')}
                </Text>

                <Button primary title={"Request time"} onPress={this.onReqPressed}>

                </Button>
                <Button title={"Switch Lang"} onPress={this.changeLang}>

                </Button>
                <Button title={"Login"} onPress={this.onLoginPress}>
                </Button>
            </View>
        );
    }
}
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as server_methods from './src/data/server/methods';
import * as auth_methods from './src/data/auth/methods';
import * as app_methods from './src/data/app/methods';
const Home = connect((state)=>{
    return {
        rcat: state.getIn(['server','request_utc_at']),
        rcdat: state.getIn(['server','request_utc_done_at']),
        tkn: state.getIn(['auth','token']),
        lnga: state.getIn(['app','lang'])
    };
}, (dispatch)=>{
    return {
        server_methods: bindActionCreators(server_methods, dispatch),
        auth_methods: bindActionCreators(auth_methods, dispatch),
        app_methods: bindActionCreators(app_methods, dispatch)
    };
})( withRouter(Home_Temp) );



const About = () => (
    <Text style={styles.header}>
        About
    </Text>
);


const Topic = ({match}) => (
    <Text style={styles.topic}>
        {match.params.topicId}
    </Text>
);


const Topics = ({match}) => (
    <View>
        <Text style={styles.header}>Topics</Text>
        <View>
            <Link
                to={`${match.url}/rendering`}
                style={styles.subNavItem}
                underlayColor='#f0f4f7'>
                <Text>Rendering with React</Text>
            </Link>
            <Link
                to={`${match.url}/components`}
                style={styles.subNavItem}
                underlayColor='#f0f4f7'>
                <Text>Components</Text>
            </Link>
            <Link
                to={`${match.url}/props-v-state`}
                style={styles.subNavItem}
                underlayColor='#f0f4f7'>
                <Text>Props v. State</Text>
            </Link>
        </View>

        <Route path={`${match.url}/:topicId`} component={Topic}/>


        <Route exact path={match.url} render={() => (
            <Text style={styles.topic}>Please select a topic.</Text>
        )}/>
    </View>
);

type Props = {};
class App extends Component<Props> {
    render() {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <View style={styles.nav}>
                        <Link
                            to="/"
                            underlayColor='#f0f4f7'
                            style={styles.navItem}>
                            <Text>Home</Text>
                        </Link>
                        <Link
                            to="/about"
                            underlayColor='#f0f4f7'
                            style={styles.navItem}>
                            <Text>About</Text>
                        </Link>
                        <Link
                            to="/topics"
                            underlayColor='#f0f4f7'
                            style={styles.navItem}>
                            <Text>Topics</Text>
                        </Link>
                    </View>

                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                </View>
            </NativeRouter>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10,
    },
    parent: {
        direction: 'ltr'
    },
    header: {
        fontSize: 20,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: 'center',
        fontSize: 15,
    }
});

export default App;