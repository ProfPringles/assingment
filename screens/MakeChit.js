import React, { Component } from 'react';
import { TextInput, AsyncStorage, Text, View, Image, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Button, Container} from 'native-base'
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
    requestLocationPermission = async() =>{
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'chittr',
                message:
                    'do you want to tag your chit with your location? if you press yes then you cannot untag your location.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'no',
                buttonPositive: 'yes',
                },
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
      

        //find the current loction of the user to be used in the chit
        findCoordinates = async() => {
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                         longitude: position.coords.longitude,
                         latitude: position.coords.longitude,
                         timestamp: position.timestamp

                    });
                console.log("location", this.state.longitude, this.state.latitude, this.state.timestamp);
                this.PostChit(this.state.timestamp, this.state.longitude, this.state.latitude);
                },
             (error) => {
                    console.log(error);
                },
                {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });
        };

        getUserIDToken = async () => {
            const UserID = await AsyncStorage.getItem('LoginUserID');
            const Token = await AsyncStorage.getItem('LoginToken');
            this.setState({
                user_id: UserID,
                token: Token,
            })
            this.getUserDetails()    
            console.log("here from make chit page", this.state, "token: " , Token);
            console.log(this.state.photoData);
        }

        //save the chit content for the drafts page
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
                    {text: 'OK', onPress: () =>{
                     AsyncStorage.setItem('ChitContent', this.state.chit_content)}},
                ],
                {cancelable: false},
            );
        }
        //get the user details to make sure chit can be posted to the right account
        getUserDetails() {
            return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        UserData: responseJson,
                    });
                    console.log("email: ", this.state.UserData.family_name);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        PostChit(timestamp, longitude, latitude) {
            console.log(longitude)
            console.log(this.state.token)
            /*
            the operator is used so that if the user does not allow the 
            app to use their location it sets the longitude and latiude to 0. 

            make sure the chit content is not less than one word so that user cannot post an empty chit
            */
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
                            location:{
                                longitude: longitude !=null ? longitude: 0 , 
                                latitude: latitude !=null ? longitude: 0,
                            },
                        })
                    }).then((response) => response.json())
                    .then((responseJson)=> {
                        console.log("chit ID", responseJson.chit_id);
                        this.savechitID(responseJson.chit_id);
                        this.setState({
                            chit_id: responseJson.chit_id
                        })
                        
                    })
                    .catch((error) => {
                        console.log("error", error);
                    });
                }
        } 
        //save the chit ID of the chit to be used to post an image to the last chit made
        savechitID = async(chitid) =>{
            await AsyncStorage.setItem('chitID', JSON.stringify(chitid))
            console.log(chitid)
        }
        /*
        make sure that when the user types more than 147 chars so that they are alerted and 
        do not keep typing and get confused when the chit is not posetd
        */
        WordCount(str) { 
            const charslength = str.split("").length
            if(charslength === 147){
                return Alert.alert("chit cannot be over 147 characters, that's not what's going on :(.")
            }else{
                return charslength    
            }
          }
        componentDidMount() {
            this.getUserIDToken();
            this.requestLocationPermission();
        }

    render() {

        return (
            <Container style={styles.wrapper}>
                <TextInput
                      accessible={true}
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
                        this.saveChit().then(()=>{
                            this.findCoordinates()
                        })
                    }
                >
                    <Text accessible={true} style={styles.postChitText}>
                        chit
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.Drafts}
                    onPress={() => {this.props.navigation.navigate('drafts')}}
                >
                    <Text accessible={true} style={styles.postChitText}>
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
            </Container>  
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
        borderWidth: 0,
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
        borderWidth: 0,
        left: 0,
        width: "100%",
        height: "100%", 
        top: 0

    },




})



export default MakeChit;