import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            chitData: [],

            chit_id: 0,
            timestamp: 0,
            chit_content: '',
            user: Object,
            longitude: 0,
            latitude: 0,
            user_id: 0,
            given_name: '',
            family_name: '',
            email: ''
            }
        }

    
    
    
    
    getchits() {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits?")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    chitData: responseJson,
                });
            })
            .catch((error1) => {
                console.log(error1);
            });
    }    

    componentDidMount() {
        this.getchits();
    }


    /*
    method: 'GET',

    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: parseInt(this.state.chit_id),
        timestamp: parseInt(this.state.timestamp),
        chit_content: this.state.chit_content,
        "location": {
            longitude: parseInt(this.state.longitude),
            latitude: parseInt(this.state.latitude)
        },
        "user": {
            User_id: parseInt(this.state.user_id),
            given_name: this.state.given_name,
            family_name: this.state.family_name,
            email: this.state.email
        }
    })
        }).then((response) => {
        Alert.alert(
            this.state.family_name
        );

    })
    .catch((error) => {
        Alert.alert(this.state, given_name);
    });

    componentDidMount() {
        this.getchits()
    }*/



    render() {
        if (this.state.isLoading) {
            <view>
                <ActivityIndicator/>
            </view>
        }

        return (
            
            <SafeAreaView style={styles.container}>    
                <FlatList
                    
                    data={this.state.chitData}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('account')}>
                            <Text style={styles.item}>

                                {Object.values(item.user.given_name) }
                                {": "}
                                {" "}
                                {item.chit_content}
                            </Text>
                        </TouchableOpacity>}

                    keyExtractor={({ item }, index) => item}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        alignContent: "center",
        margin: 50,
        width: 50,
        height: 50,
    },

    container: {
        flex: 2,
        marginTop: 5,
    },

    item: {
        backgroundColor: '#D3D3D3',
        padding: 20,
        marginVertical: 3,
        marginHorizontal: 16,
    },

    title: {
        fontSize: 5,
    },

    scrollView: {
        marginHorizontal: 10,
    },
    text: {
        fontSize: 42,
    }
});

export default HomeScreen;