import React, {Component} from 'react';

import {Container} from "./common/container";
import {ScrollView} from "./common/scrollView";


import MapView from 'react-native-maps';


const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};



class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            failed: false
        };
    }


    render() {
        return (
            <Container>
                <ScrollView ref={ref => this.container = ref}>
                    <MapView
                        liteMode
                        style={{
                            height: 200
                        }}
                        initialRegion={SAMPLE_REGION}
                    />

                </ScrollView>

            </Container>
        );
    }
}

export default About;