import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, Image, StyleSheet, Alert, TouchableOpacity, Modal, TextBase } from 'react-native';

import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

import ImageViewer from 'react-native-image-zoom-viewer';
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
            given_name:'',
            family_name:'',
            email:'', 
            outside: null,
            photo: []
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
            .catch((error) => {
                console.log(error);
            });
    }  
    
    componentDidMount() {
        this.getchits();
        //this.getuserPics();
    }
    
    render() {
        if (this.state.isLoading) {
            <view>
                <ActivityIndicator/>
            </view>
        }

        return (
            
            <ScrollView style={styles.container}>    
                <FlatList
                    
                    data={this.state.chitData}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity accessible={true} style={
                            { padding: 10, 
                                flex: 1,
                                height: 150, 
                              borderBottomColor: "black", 
                              borderBottomWidth: 1,
                              flexDirection:"column",
                              backgroundColor: "#1b2836"}} 
                              
                              onPress={() => this.props.navigation.navigate('serach')}>
                            
                            <View style={styles.item}> 

                            <Image  style={{
                                //backgroundColor: "red",
                                position:"absolute",
                                top: 0,
                                left: 200,
                                width:150,
                                height: 125,

                            }} source={{uri:`http://10.0.2.2:3333/api/v0.0.5/chits/${item.chit_id}/photo`}}/>
                            <Text accessible={true} style={styles.NameTittle}>
                                {Object.values(item.user.given_name) }
                                {":"}
                            </Text>
                            
                            <Text accessible={true} style={{
                                right: 300,
                                flex: 1,
                                fontSize: 10,
                                position:"absolute",
                                top: -5,
                                width: 50, height: 50,
                                textAlign: 'center',
                                //backgroundColor: 'grey',

                            }}>
                                
                            <Image 
                                style={{
                                    top: -50,
                                    //backgroundColor: '#A9A9A9',
                                    //textAlign: 'Center',
                                    position:"absolute",
                                    left: 10,
                                    width: 40,
                                    height: 40 ,
                                }}
                                source={{uri:  `http://10.0.2.2:3333/api/v0.0.5/user/${item.user.user_id}"/photo`}}
                                name="login"
                            />
                            
                        </Text>
                        <TouchableOpacity style={{ top: 34, left: 240}}>
                                    <Image style={{backgroundColor: 'transparent',
                                            width: 30,
                                            top: 0,
                                            left: 30,
                                            height: 30,}} 
                                            source={require('./iconfinder_JD-07_2246820.png')} />
                            </TouchableOpacity>
                        <Text style={styles.chit_content}>
                                     {item.chit_content}
                                </Text>                      
                        </View>
                    </TouchableOpacity>}

                    keyExtractor={({ item }, indeax) => item}
                />
            </ScrollView>
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

    NameTittle: {
        color: "white", 
        flex: 1,
        left: -5,
        fontWeight: "bold",
        top: -30, 
        
    },

    container: {
        //flex: 2,
        height: 300,
        width: null,
        marginBottom: 1,
        padding: 16,
        backgroundColor: 'transparent',
        marginTop: 5,
        flex: 1,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        flexDirection: "column",
        backgroundColor: "#1b2836"
    },

    item: {
        //backgroundColor: '#D3D3D3',

        flex: 1, 
        borderColor: "blue", 
        borderWidth: 0, 

        padding: 30,
        marginVertical: 3,
        marginHorizontal: 16,
    },

    title: {
        fontSize: 5,
    },
    text: {
        paddingLeft: 20,
        fontSize: 42,
    }, 
    chit_content: {
        color: 'white',
        position: 'absolute',
        top: 20,
        paddingLeft: 25,
        
    }
});

export default HomeScreen;