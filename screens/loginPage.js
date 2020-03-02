import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity, TextInput, Image } from 'react-native';
import React, { Component } from 'react';
import { Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
//import console = require('console');
//import { HeaderBackground } from 'react-navigation-stack';
//import FontAwesome, { Icons, parseIconName, parseIconFromClassName, IconTypes  } from 'react-native-fontawesome';
//import { Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome';

//import { View, Text } from 'react-native';
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


    login() {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
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
            }).then((response) => response.json())
            .then((responseJson) => {
                //console log used to output response from server for debug reasons
                console.log(responseJson)
                this.setState({
                    authorized: true,
                    data :responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.login()     
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

                    <ScrollView style={styles.ScrollView}>


                        <Text style={styles.loginHeader}>
                            Login Into Chitter
                    </Text>

                        <Label style={styles.text}>
                            email
                        </Label>
                        <TextInput
                            style={styles.inputText}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                        />

                        <Label style={styles.text}>
                            password
                        </Label>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.inputText}
                            
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                        />

                    </ScrollView>

                    <TouchableOpacity
                        style={
                            { flex: 1, paddingLeft: 260, paddingBottom: 50, paddingRight: 0, }
                        }
                        onPress={() =>
                            this.login().then(() => this.props.navigation.navigate(''))
                        }>

                        <Text style={{
                            flex: 1,
                            width: 100, height: 100,
                            textAlign: 'center',
                            borderRadius: 100 / 2,
                            backgroundColor: 'grey',
                        }}>
                            <Image
                                style={{
                                    flex: 1,
                                    backgroundColor: '#A9A9A9',
                                    textAlign: 'Center',
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
        backgroundColor:'#A9A9A9'	

    },

    inputText: {
        fontSize: 15,
        paddingLeft: 40,
        paddingRight: 50,
        
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
        color: '#F0FFF0',
        fontWeight: "300",
        marginBottom: 40,
        paddingLeft: 90,
        paddingRight: 50,
        paddingTop: 20,
        flex: 1
    }

});
export default Loginpage