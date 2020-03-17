import React, { Component } from 'react';
import { TextInput, ActivityIndicator, AsyncStorage, Text, View, Button, Image, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
const options = {
    title: 'open images',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


class MakeChit extends Component {

        constructor(props) {
            super(props);
    
            this.state = {
                UserData: [],
                dataReceived: [],
                email:'',
                isLoading: true,
                user_id: 0,
                given_name:'',
                family_name:'',
                chit_id: 0,
                timestamp: 0,
                chit_content:'',
                location:{},
                longitude: 0,
                latitude: 0, 
                token:'', 
                photo:'', 
                photoData: null,      
                filename:''      
    
            }
        }


        findCoordinates = async() => {
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                         longitude: position.coords.longitude,
                         latitude: position.coords.longitude,
                         timestamp: position.timestamp

                    });
                console.log("here", this.state.longitude, this.state.latitude, this.state.timestamp)
                this.PostChit(this.state.timestamp, this.state.longitude, this.state.latitude)
                },
             (error) => {
                    console.log(error)
                },
                {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });
        };

        /*imagePicker = () =>{
            ImagePicker.showImagePicker(options, (response) => {
                //console.log('Response = ', response);
              
                if (response.didCancel) {
                  console.log('cancelled');
                } else if (response.error) {
                  console.log('Error: ');
                } else if (response.customButton) {
                  console.log('custom button: ');
                } else {
                    console.log(response.uri)
                    console.log("content type:", response.uri)
                  this.setState({
                    photoData: response.data,
                    photo: response.uri, 
                    filename: response.fileName,
                    latitude: response.latitude,
                    longitude:response.longitude,
                    timestamp:response.timestamp
                  });
                  console.log(JSON.stringify(this.state.photo))
                }
              });
        }*/


        getUserIDToken = async () => {
            const UserID = await AsyncStorage.getItem('LoginUserID');
            const Token = await AsyncStorage.getItem('LoginToken');
            this.setState({
                user_id: UserID,
                token: Token,
                
            })
            this.getUserDetails()
            
            console.log("here from make chit page", this.state, "token: " , Token)
            console.log(this.state.photoData)
        }


        saveChit = async()=>{
            Alert.alert(
                'do you want to save that chit?',
                '',
                [     
                    {onPress: () => console.log('Ask me later pressed')},
                    {
                        text: 'cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => AsyncStorage.setItem('ChitContent', JSON.stringify(this.state.chit_content))},
                ],
                {cancelable: false},
            );
        }

        getUserDetails() {
            return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        UserData: responseJson,
                    });
                    console.log("email: ", this.state.UserData.family_name)
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        PostChit(timestamp, longitude, latitude) {
            console.log(longitude)
            console.log(this.state.token)
                if(this.state.chit_content === '' || this.state.chit_content === ""){
                    Alert.alert("chit must contain atleast one letter :)")
                }else {
                    return  fetch("http://10.0.2.2:3333/api/v0.0.5/chits",{
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': this.state.token
                        },
                        body: JSON.stringify({
                            chit_id: this.state.chit_id, 
                            timestamp: timestamp, 
                            chit_content: this.state.chit_content,
                            user_id: this.state.UserData.user_id,
                            given_name: this.state.UserData.given_name, 
                            family_name: this.state.UserData.family_name,
                            email: this.state.UserData.email,
                            longitude: longitude , 
                            latitude: latitude,
                        })
                    }).then((response) => response.json())
                    .then((responseJson)=> {
                        console.log("here", responseJson.chit_id)
                        this.savechitID(responseJson.chit_id)
                        this.setState({
                            chit_id: responseJson.chit_id
                        })
                        
                    })
                    .catch((error) => {
                        console.log("error", error)
                    });
                }
        } 

        savechitID = async(chitid) =>{
            await AsyncStorage.setItem('chitID', JSON.stringify(chitid))
            console.log(chitid)
        }
        WordCount(str) { 
            const charslength = str.split("").length
            if(charslength === 147){
                return Alert.alert("chit cannot be over 147 characters, that's not what's going on :(.")
            }else{
                return charslength    
            }
          }
        componentDidMount() {
            this.getUserIDToken()
        }

    render() {

        return (
            <View style={styles.wrapper}>
                <TextInput
                      placeholder="What's going on?"
                      style={styles.inputText}
                      value={this.state.chit_content}
                      onChangeText={(chit_content) => this.setState({ chit_content })}
                      maxLength = {147}  
                >   
                
                </TextInput>

                <Text style={{fontSize: 20,  flex: 1, color: "white", padding: 10, top: 550, position: "absolute"}} >
                    letters: {this.WordCount(this.state.chit_content)}
                </Text>
                <TouchableOpacity style={styles.postChit}
                    onPress={() =>
                        this.findCoordinates().then(() => {
                            this.saveChit()
                        })
                    }
                >
                    <Text style={styles.postChitText}>
                        chit
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.Drafts}
                    onPress={() => {this.props.navigation.navigate('drafts')}}
                >
                    <Text style={styles.postChitText}>
                         drafts
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.Images}
                    onPress={() =>{this.props.navigation.navigate('cameraPageChit')}}
                    >
                    <Text style={styles.postChitText}>
                        upload image
                    </Text>
                </TouchableOpacity>
                    
                <Image source={{uri: this.state.photo}}/>
                
                <View style={{left: 50}}>
                    <Image source={{uri: this.state.photo}}
                     style={{width: 300, height: 300}}
                    />
                </View>
            </View>  
        );
    }
}

const styles = StyleSheet.create({
    inputText: {
        color: "white",
        fontSize: 20,
        top: 30
        
    },

    postChit:{
        width: 60,
        top: -40,
        left: 338,
        borderWidth: 1,
        borderColor: "white"
    },

    Drafts:{
        width: 60,
        top: -69,
        left: 270,
        borderWidth: 1,
        borderColor: "white"
    },
    Images:{
        width: 100,
        top: 430,
        left: 290,
        borderWidth: 1,
        borderColor: "white"
    },

    postChitText: {
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },  
    wrapper: {
        display: "flex", 
        flex: 1,
        backgroundColor:'#1b2836',	
        borderColor: 'white',
        borderWidth: 3,
        left: 0,
        width: "100%",
        height: "100%", 
        top: 3

    },




})



export default MakeChit;