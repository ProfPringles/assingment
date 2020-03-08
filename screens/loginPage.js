import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity, TextInput, Image, AsyncStorage, Button, YellowBox } from 'react-native';
import React, { Component } from 'react';
import { Label, Form } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { multiply } from 'react-native-reanimated';
//import console = require('console');
//import { HeaderBackground } from 'react-navigation-stack';
//import FontAwesome, { Icons, parseIconName, parseIconFromClassName, IconTypes  } from 'react-native-fontawesome';
//import { Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome';

//import { View, Text } from 'react-native';
console.disableYellowBox = true; 
class Loginpage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            authorized: false,
            email: '',
            password: '',
            id: '',
            token: '',

        }
    }

    ExpireDate() {
        const now = new Date();
        let expireTime = new Date(now);
        expireTime.setMinutes(now.getMinutes() + 0.10);
        
        if(now > expireTime){
            AsyncStorage.removeItem('Token');
        }
        
        return expireTime;
    }


    login  = async () =>{
        console.log("has run")
            fetch("http://10.0.2.2:3333/api/v0.0.5/login",
            {
                method: 'POST',
                headers: {
                    //Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) = async(response) => response.json())
            .then((responseJson) = async (responseJson) => {
                this.setState({
                    data :responseJson
                })
                try{
                    await AsyncStorage.setItem('Token', JSON.stringify(this.state.data.token))
                    console.log(JSON.stringify(this.state.data.token))
                            
                }catch(error){
                    console.log(error)
                }
                //console.log(this.state.data.token)
            })
            .catch((error) => {
                console.log(error);
            });
            
    }

    componentDidMount() {
        this.login
    }
        

    checkAuth  = async() =>{
       
       var token = await AsyncStorage.getItem('Token')
       console.log("token: " +token)
       if(token !=null || token ==""){
            this.props.navigation.navigate('signedinhome')
       }
       AsyncStorage.removeItem('Token');
    }
    
 

    render() {
        if (this.state.authorized) {
            <View>
                <ActivityIndicator/>
            </View>
        }
        //this.ExpireDate()
        return (
            
            <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
                <View style={styles.scrollViewWrapper}>
                    <Text style={styles.loginHeader}>chittr</Text>
                    <ScrollView style={styles.ScrollView}>


                        
                        <Image
                                style={{
                                    left: 130,
                                    flex: 2,
                                    //backgroundColor: '#A9A9A9',
                                    textAlign: 'Center',
                                    width: 150,
                                    height: 150,
                                }}
                                source={require('./blank_portrait.png')}
                                name="login"  
                            />
                        <TextInput
                             placeholder="email"
                            style={styles.inputText1}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                        />

                        <TextInput
                            secureTextEntry={true}
                            style={styles.inputText2}
                            placeholder="password"
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                        />

                    </ScrollView>
                    <TouchableOpacity
                        style={
                            { flex: 1, left: 300, bottom: 80, height: 100, width:100}
                        }
                        onPress={() =>{
                                console.log("pressed"),
                                this.login().then(() =>{
                                    this.checkAuth()
                                })
                            } 
                         }
                        >

                        <Text style={{
                            flex: 1,
                            //left: 270,
                            top: 30,
                            width: 100, height: 50,
                            textAlign: 'center',
                            //position: "absolute",
                            borderRadius: 100 / 2,
                            backgroundColor: 'white',
                        }}>
                            <Image
                                style={{
                                    flex: 1,
                                    right: 10,
                                    top: 0, 
                                    backgroundColor: 'white',
                                    //textAlign: 'Center',
                                    width: 50,
                                    height: 50,
                                }}
                                source={require('./login.jpg')}
                                name="login"
                            />

                        </Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        );
    };
}
const styles = StyleSheet.create({

    wrapper: {
        display: "flex", 
        flex: 1,
        backgroundColor:'#1b2836'	

    },

    inputText1: {
        borderColor: 'white', 
        borderWidth: 2, 
        backgroundColor: 'transparent',
        marginTop: 5,
        flex: 1,
        top: 10,
        fontSize: 20,
        left: 100,
        marginBottom: 1,
        width: "50%", 
        top: 3
        
    },
    
    inputText2: {
        borderColor: 'white', 
        borderWidth: 2, 
        backgroundColor: 'transparent',
        marginTop: 5,
        flex: 1,
        top: -10,
        fontSize: 20,
        left: 100,
        marginBottom: 1,
        //position: "absolute",
        width: "50%", 
        top: 1
        
    },

    loginButton: {
        width: 10,
        
    },

    text: {
        color: '#F0FFF0',
        fontSize:20,
        fontWeight: "300",
        //marginBottom: 40,
        paddingLeft: 40,
        paddingRight: 50,
        paddingTop: 20,
        flex: 1
    },
    scrollViewWrapper: {
        marginTop: 70,
        flex: 1
    },
    avoidView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        flex: 1
    },
    loginHeader: {
        fontFamily: 'Freight Sans',
        fontSize: 28,
        color: 'white',
        //fontWeight: "1",
        //marginBottom: 0,
        paddingLeft: 170,
        paddingRight: 50,
        paddingTop: -100,
        flex: 1
    }

});
export default Loginpage