import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {isEqual} from 'lodash';


// expose ConfigStore
import {ConfigStore} from "./setup";

export {ConfigStore}
// end exposing ConfigStore


// expose Helpers
import * as Helpers from "./helpers";

export {Helpers};
// end exposing Helpers


// expose Components
import ActionBar from './ui/actionBar';
import Button from './ui/button';
import Text from './ui/text';
import TextInput from './ui/textInput';
import Calendar from './ui/calendar';
import Picker from './ui/picker';
import Router from './ui/router';
import Stretch from './ui/stretch';
import Loading from './ui/loading';
import Sharing from './ui/sharing';

export {Text, TextInput, Button, ActionBar, Calendar, Picker, Router, Stretch, Loading, Sharing};
// end exposing Components


// expose I18
import {IsRtl, Translate, NumToEn, NumToFa, LocalizeNumber} from './i18';

export {IsRtl, Translate, NumToEn, NumToFa, LocalizeNumber};
// end exposing I18


// expose Theme
import Theme from './theme';

export {Theme};
// end exposing Theme


// expose native module
import {NativeModules} from 'react-native';

const SecurityChamber = NativeModules.SecurityChamber;
const File = NativeModules.File;
export {SecurityChamber, File};


// expose attach: replacement for redux connect


// expose attach: replacement for redux connect
export function Dispatcher(WrappedComponent) {
    const Component = ({...props}, context) => {
        return <WrappedComponent redux={context.store.getState()} dispatch={context.store.dispatch} {...props}/>
    };
    Component.contextTypes = {
        store: PropTypes.object
    };

    return Component;
}

export function Attach(map) {
    return (WrappedComponent) => {
        return class extends Component {
            static contextTypes = {
                store: PropTypes.object
            };

            constructor(props) {
                super(props);

                this.Unsubscribe = null;
                this.redux = {};
                this.newProps = {};

                this.Subscribe = this.Subscribe.bind(this);
            }

            Subscribe() {
                this.lastRedux = this.redux || {};
                this.redux = this.context.store.getState();

                let shouldUpdate = false;


                Object.keys(map).map((key) => {
                    if (key.startsWith('^')) {
                        shouldUpdate = true;
                        return;
                    }
                    const value = map[key];

                    const Leaf1 = Helpers.leaf(this.redux, key, {});
                    const Leaf2 = Helpers.leaf(this.lastRedux, key, {});

                    if (!isEqual(Leaf1, Leaf2)) {

                        shouldUpdate = true;


                        if (value) {
                            this.newProps = Object.assign({}, this.newProps, value(Leaf1, this.redux, this.context.store.dispatch));
                        }
                    }

                });

                if (shouldUpdate) {
                    this.forceUpdate();
                }
            }

            componentWillMount() {
                if (map instanceof Object) {
                    this.Unsubscribe = this.context.store.subscribe(this.Subscribe);
                    this.Subscribe();

                } else {
                    console.error('Type error: "directories" provided to attach must be an object.');
                }
            }

            componentWillUnmount() {
                if (this.Unsubscribe)
                    this.Unsubscribe();
            }

            render() {
                return <WrappedComponent redux={this.redux}
                                         dispatch={this.context.store.dispatch}  {...this.props} {...this.newProps}/>;
            }
        };

    };
}