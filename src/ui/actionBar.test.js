import 'react-native';
import React from 'react';
import ActionBar from './actionBar';

import renderer from 'react-test-renderer';

describe('Action Bar', () => {
    it('should renders correctly', () => {
        const tree = renderer.create(
            <ActionBar title={"Awesome Action Bar"} name={"Title"} icon={"menu"} onPress={() => {
                console.log('I am Clickable!')
            }}/>
        );
    })
});
