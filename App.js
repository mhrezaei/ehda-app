import React, {Component} from 'react';

// react native
import {StyleSheet, Text, View, Button} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';




// temp

type Props = {};
class Home_Temp extends Component<Props>
{
    constructor(props){
        super(props);

        this.onClickPressed = this.onClickPressed.bind(this);
    }


    onClickPressed(){
        this.props.actions.request_utc_async();
    }
    render(){
        const {temp} = this.props;
        return (
            <View>
                <Text style={styles.header}>
                    Home { temp }
                </Text>
                <Button title={"Update Me"} onPress={this.onClickPressed}>

                </Button>
            </View>
        );
    }
}
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as server_methods from './src/data/server/methods';
const Home = connect((state)=>{
    return {
        temp: state.getIn(['server','request_utc_at'])
    };
}, (dispatch)=>{
    return {
        actions: bindActionCreators(server_methods, dispatch)
    };
})( Home_Temp );



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