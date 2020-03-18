import { RNCamera } from 'react-native-camera';
import { Label } from 'native-base';
import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage, Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView,Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
export default class cameraPage extends Component {
    constructor(props){
        super(props)

        this.state={
            user_id:'',
            token:''
        }
    }
    getUserIDToken = async () => {
        const UserID = await AsyncStorage.getItem('LoginUserID');
        const Token = await AsyncStorage.getItem('LoginToken')
        this.setState({
            user_id: UserID,
            token: Token 
        })
    
        this.postChange()
        console.log("here from make edit page", JSON.stringify(UserID), "token: " , Token)
    }

    takePicture = async function(camera) {
            if (this.camera) {
                    const options = { quality: 0.5, base64: true };
                    const data = await this.camera.takePictureAsync(options);
                    console.log(data.uri);
                    
                    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/photo",
                    {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'image/jpeg',
                        'X-Authorization': this.state.token
                    },
                    body: data
                    }).then((response) => {
                        console.log("image uploaded")
                    }).catch((error) => {
                        console.log(error);
                });
            }
        }

    componentDidMount(){
        this.getUserIDToken()
    }

    render() {
        return (
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex:1,
                        width: '100%'
                    }}
                    >
                    <TouchableOpacity style={styles.back} accessible={true}
                        onPress={() => 
                            this.props.navigation.navigate('LoggedInAccountScreen')
                        }>
                    <Text style={{textAlign: "center", color: "white",   fontSize: 20}}>
                         back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{ this.takePicture(this)}}
                    style={{            
                            left: 160,
                            top: 550,
                            width: 100, height: 50,
                            textAlign: 'center',
                            position: "absolute",
                            borderRadius: 100 / 2,
                            borderWidth: 4,
                            borderColor: "#1b2836",}}>
                    <Text></Text>
                    </TouchableOpacity>
                    <Label style={{left: 180,
                            top: 570}}>
                        capture
                </Label>
            </RNCamera>
        );
    }
}

const styles = StyleSheet.create({


    back:{
        width: 70,
        top: 10,
        textAlign: "center",
        backgroundColor:"#ce1d1d",
        color:"white",
        fontSize: 20,
        left: 10,
        borderWidth: 0,
        borderColor: "white"
    },

});