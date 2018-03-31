import React, {Component} from 'react';

import {View, Animated, StyleSheet, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Stretch} from '../../../core';


export class ScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resonance: new Animated.Value(1),
        };
        this.wiggle = this.wiggle.bind(this);

    }

    wiggle(){
        this.state.resonance.setValue(0.8);
        Animated.spring(
            this.state.resonance,
            {
                toValue: 1,
                friction: 5,
            }
        ).start();
    }

    render() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}>
                <Animated.View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingHorizontal: 13,
                    paddingTop: 16,
                    transform: [{
                        scale: this.state.resonance
                    }]
                }}>
                    <Stretch/>

                    {this.props.children}
                </Animated.View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
   container: {
       justifyContent: 'center',
       paddingBottom: 120
   },
});