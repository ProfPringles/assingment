import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity, TextInput, Image, AsyncStorage, YellowBox, Alert } from 'react-native';
import React, { Component } from 'react';
import { Label, Form,  StyleProvider,Button  } from 'native-base';
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
            email:'',
            password:'',
            id:'',
            token:'',
        }
    }

    ExpireDate() {
        const now = new Date();
        const expireTime = new Date(now);
        expireTime.setMinutes(now.getMinutes() + 0.10);
        
        if(now > expireTime){
            AsyncStorage.removeItem('Token');
        }
        return expireTime;
    }


    login(){
        console.log("has run")
           return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => response.json())
            .then((responseJson)  => {
                this.setState({
                    data :responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            });
            
    }

    componentDidMount() {
        this.login();
    }
        

    checkAuth  = async() =>{
        try{
            AsyncStorage.setItem('LoginToken', this.state.data.token);
            AsyncStorage.setItem('LoginUserID', JSON.stringify(this.state.data.id));
            console.log(JSON.stringify(JSON.stringify(this.state.data.id)));     
        }catch(error){
            console.log(error)
        }
        
        const token = await AsyncStorage.getItem('LoginToken');
        const id = await AsyncStorage.getItem('LoginUserID');
        //if the token is not null then allow the suer to logg in if it is null then alert the user.
        if(token !==null){
                this.props.navigation.navigate('signedinhome')
        }else{
            Alert.alert("you have enterted your email or password wrong please try again");
        }
        console.log("token: " +token);
        console.log("id: " +id);
    }
    
 

    render() {
        if (this.state.authorized) {
            <View>
                <ActivityIndicator/>
            </View>
        }
        return (
            
            <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
                <View style={styles.scrollViewWrapper}>
                    <Text style={styles.loginHeader}>chittr</Text>
                    <ScrollView style={styles.ScrollView}>                        
                        <Image
                                style={{
                                    left: 130,
                                    flex: 1,
                                    top:5,
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
                    <Button primary
                    accessible={true}
                        style={
                            { flex: 1, left: 100, flex: 1,
                                left: 97,
                                top:450,
                                width: 215, height: 30,
                                textAlign: 'center',
                                position: "absolute",
                                borderRadius: 100 / 2,
                                backgroundColor: 'white',}
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
                            left: 70,
                            textAlign: 'center',
                            fontSize: 20,
                            fontFamily: 'Freight Sans'
                        }}>
                            sign in

                        </Text>
                    </Button>
                    <Button
                    accessible={true}
                    onPress={()=>{ this.props.navigation.navigate('signUpPage')}} 
                     style={
                            { flex: 1, left: 100, flex: 1,
                                left: 97,
                                top:500,
                                width: 215, height: 30,
                                textAlign: 'center',
                                position: "absolute",
                                borderRadius: 100 / 2,
                                backgroundColor: 'white' }
                        }>
                    <Text  style={{
                            left: 70,
                            textAlign: 'center',
                            fontSize: 20,
                            fontFamily: 'Freight Sans'
                        }}>
                        sign up
                    </Text>   
                    </Button>    
                    
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
        marginTop: 0,
        flex: 1
    },
    avoidView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        flex: 1
    },
    loginHeader: {
        top: 20,
        fontFamily: 'Freight Sans',
        fontSize: 28,
        color: 'white',
        alignSelf: 'center',
        flex: 1,
        padding: 0
    }

});
export default Loginpage
