import 'react-native';
import React from 'react';
import Button from './button';

import renderer from 'react-test-renderer';


describe('Button', () => {
    it('should renders correctly', () => {
        const tree = renderer.create(
            <Button title={"Awesome Action Bar"} onPress={() => {
                console.log('I am Clickable!')
            }}/>
        );
    })
});
