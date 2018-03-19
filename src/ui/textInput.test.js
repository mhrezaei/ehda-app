import 'react-native';
import React from 'react';
import TextInput from './textInput';

import renderer from 'react-test-renderer';


describe('TextInput', () => {
    it('should renders correctly', () => {
        const tree = renderer.create(
            <TextInput>Im a TEXT</TextInput>
        );
    });
});
