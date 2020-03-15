import { RNCamera } from 'react-native-camera';
import { Label } from 'native-base';
import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage, Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView,Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
export default class cameraPageChit extends Component {
    constructor(props){
        super(props)

        this.state={
            user_id:'',
            token:'', 
            imageData: '',

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
                    await AsyncStorage.setItem('ImageData', JSON.stringify(data))     
                    console.log("sdfsdf image saved")       
                    const imgData = await AsyncStorage.getItem('ImageData')
                    console.log(imgData.uri)
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
                    <TouchableOpacity accessible={true} style={styles.back}
                    onPress={() => 
                        this.props.navigation.navigate('MakeChitScreen')
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
                    <Text
                        style={{
                        }}
                    ></Text>
                </TouchableOpacity>
                <Label style={{left: 177,
                            top: 570}}>
                    post chit
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
        backgroundColor:"red",
        color:"white",
        fontSize: 20,
        left: 10,
        borderWidth: 1,
        borderColor: "white"
    },

});