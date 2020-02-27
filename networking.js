import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, Alert, TextInput, PermissionsAndroid } from 'react-native';
import { Container, Form, Label } from 'native-base';
import Geolocation from 'react-native-geolocation-service';


class netowrking extends Component {

    constructor(props) {
        super(props);

        state = {}
        setStateAsync(state) {
            return new Promise((resolve) => {
                this.setState(state, resolve)
            });
        }
    }


    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const location = JSON.stringify(position);
                this.setState({ location });
            },
            (error) => {
                Alert.alert(error.message)
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    };


    async  requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Lab04 Location Permission',
                    message:
                        'This app requires access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }   ,
            );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can access location');
            return true;
        } else {
            console.log('Location permission denied');
            return false;
            }
        } catch (err) {
            console.warn(err);
        }
    }




    render() {
        return (
            <View>
                <Text> hello world</Text>
            </View>
            );
    }
}

export default netowrking;