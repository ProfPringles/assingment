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
            chit_id: '',
            token:'', 
            imageData: '',

        }
    }
    getUserIDToken = async () => {
        const UserID = await AsyncStorage.getItem('LoginUserID');
        const Token = await AsyncStorage.getItem('LoginToken')
        const chitid = await AsyncStorage.getItem('chitID')
        this.setState({
            user_id: UserID,
            token: Token, 
            chit_id: chitid
        })

        console.log("here from make edit page", JSON.stringify(chitid), "token: " , Token)
    }

    takePicture = async function(camera) {
        
            if (this.camera) {
                    const options = { quality: 0.5, base64: true };
                    const data = await this.camera.takePictureAsync(options);
                    console.log(data.uri);                     
                    console.log(this.state.chit_id)
                    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/"+this.state.chit_id+"/photo",
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

    postChange(){
        console.log("here", this.state.chit_id)
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/"+this.state.chit_id+"/photo", {
            method: 'POST',
            headers: {
                'Content-Type': 'image/jpeg',
                'X-Authorization': this.state.token
            },
            body: this.state.photoData
            }).then((response) =>{
                console.log("image uploaded " + response)
            }).catch((error) =>{
                console.log(error)
            })
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
        borderWidth: 0,
        borderColor: "white"
    },

});