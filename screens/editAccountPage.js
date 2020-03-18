import React, { Component } from 'react';
import { TextInput, ActivityIndicator, AsyncStorage, Text, View, Button, Image, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import { ScrollView } from 'react-native-gesture-handler';
import { object } from 'prop-types';
import { Label } from 'native-base';
import { RNCamera } from 'react-native-camera';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            given_name:'',
            family_name:'',
            email:'',
            password:'',
            user_id:'',
            token:'',
        }
    }


    getUserIDToken = async () => {
        const UserID = await AsyncStorage.getItem('LoginUserID');
        const Token = await AsyncStorage.getItem('LoginToken')
        this.setState({
            user_id: UserID,
            token: Token 
        });
        this.postChange()
        console.log("here from make edit page", JSON.stringify(UserID), "token: " , Token)
    }

    postChange(){
        return  fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
                body: JSON.stringify({
                    given_name:  this.state.given_name,
                    family_name: this.state.family_name ,
                    email: this.state.email,
                    password: this.state.password
                })
            }).then((response) => response.json())
            .then((responseJson)=> {
                console.log("here", responseJson);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    componentDidMount() {
        this.getUserIDToken();
    }


    render() {
        return (

            <View style={styles.container} >                    
                    

                <TouchableOpacity accessible={true} style={styles.back}
                    onPress={() => 
                        this.props.navigation.navigate('LoggedInAccountScreen')
                    }>
                    <Text style={{textAlign: "center", color: "white",   fontSize: 20}}>
                         back
                    </Text>
                </TouchableOpacity> 
                <Label accessible={true} style={styles.PPtittle}>change picture </Label>
                    <TouchableOpacity style={styles.PP}
                    onPress={()=>{
                        this.props.navigation.navigate('cameraPage')
                    }}>
                        <Text style={{ top: -20,textAlign: "center", color: "white",   fontSize: 80}}>
                         <Image
                         style={{
                         flex: 1,
                         //backgroundColor: '#A9A9A9',
                         textAlign: 'Center',
                         width: 100,
                         height: 100,
                         }}
                         source={require('./blank_portrait.png')}/> 
                        </Text>
                    </TouchableOpacity>


                    <Label accessible={true} style={styles.emailTittle} >email</Label>
                    <TextInput style={{top:70, left:2, fontSize:20, color:"white", position:"absolute" , borderBottomColor: "white",borderBottomWidth: 1,width: "99%",  }}
                         placeholder="|"
                         value={this.state.email}
                         onChangeText={(email) => this.setState({ email })}
                    ></TextInput>
                    
                    <Label accessible={true} style={styles.password} >change password</Label>
                    <TextInput style={{top:160, left:2, fontSize:20, color:"white", position:"absolute" , borderBottomColor: "white",borderBottomWidth: 1,width: "99%",  }}
                         placeholder="|"
                         value={this.state.password}
                         onChangeText={(password) => this.setState({ password })}
                    ></TextInput>

                    <Label accessible={true} style={styles.name} > change first name </Label>
                    <TextInput style={{top:250, left:2, fontSize:20, color:"white", position:"absolute" , borderBottomColor: "white",borderBottomWidth: 1,width: "99%",  }}
                         placeholder="|"
                         value={this.state.given_name}
                         onChangeText={(given_name) => this.setState({ given_name })}
                    ></TextInput>

                    <Label accessible={true} style={styles.givenname} >change second name</Label>
                    <TextInput style={{top:350, left:2, fontSize:20, color:"white", position:"absolute" , borderBottomColor: "white",borderBottomWidth: 1,width: "99%",  }}
                         placeholder="|"
                         value={this.state.family_name}
                         onChangeText={(family_name) => this.setState({ family_name })}
                    ></TextInput>
                   
                   <TouchableOpacity
                   accessible={true}
                   style={styles.submit}
                    onPress={() => 
                        this.postChange().then(()=>{
                            this.props.navigation.navigate('LoggedInAccountScreen')
                        })
                    }>
                    <Text style={{textAlign: "center", color: "white", fontSize: 20, top: -1}}>
                         save
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    submit:{
        width: 70,
        top: -110,
        textAlign: "center",
        color:"white",
        fontSize: 20,
        left: 329,
        borderWidth: 1,
        borderColor: "white"
    },

    back:{
        width: 70,
        top: 10,
        textAlign: "center",
        backgroundColor:"#ce1d1d",
        color:"white",
        fontSize: 20,
        left: 10,
        borderWidth: 1,
        borderColor: "white"
    },
    PP:{
        width: 100,
        height: 90,
        top: 420,
        textAlign: "center",
        backgroundColor: 'transparent',
        color:"white",
        fontSize: 20,
        left: 10,
        borderBottomWidth: 1,
        borderColor: "white"
    },
    container: {
       height: 300,
       width: null,
       margin: 3,
       backgroundColor: 'transparent',
       marginTop: 5,
       flex: 1,
       borderBottomColor: "black",
       borderBottomWidth: 1,
       flexDirection: "column",
       backgroundColor: "#1b2836"
    },

    PPtittle: {
        color: "#aaaaaa", 
        flex: 1,
        left: 5, 
        fontSize: 20,
        top: 410, 
        position: "absolute"
        
    },
    emailTittle: {
        color: "#aaaaaa", 
        flex: 1,
        left: 5, 
        fontSize: 20,
        top: 50, 
        position: "absolute"
        
    },
    givenname: {
        color: "#aaaaaa", 
        flex: 1,
        left: 5, 
        fontSize: 20,
        top: 320, 
        position: "absolute"
    },
    name: {
        color: "#aaaaaa", 
        flex: 1,
        left: -1, 
        fontSize: 20,
        top: 230, 
        position: "absolute"
    },
    password: {
        color: "#aaaaaa", 
        flex: 1,
        left: 5, 
        fontSize: 20,
        top: 140, 
        position: "absolute"
    },


    
});