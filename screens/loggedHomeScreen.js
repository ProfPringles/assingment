import { createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { Component } from 'react';
import { Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

export default class signedinHome extends Component {

    render() {
        return (
            <View>
                <Text>
                    Logged in home
                </Text>
            </View>
            );
    }
}

