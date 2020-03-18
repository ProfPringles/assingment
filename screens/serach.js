import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity, TextInput, Image, AsyncStorage, Button, YellowBox, TextComponent } from 'react-native';
import { SearchBar } from 'react-native-elements';

class SerchPage extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            UserData: [],
            user_id: 0,
            given_name:'',
            family_name:'',
            email:'',
            serach:''
        }
    }
    //get the user details of the serach query
    getuser= () =>
    {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.serach)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                UserData: responseJson,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    componentDidMount(){
        this.getuser();
    }

    saveId = async(userID) =>{
        try{
            await AsyncStorage.setItem('UserID', JSON.stringify(userID));
            console.log(JSON.stringify(userID));      
        }catch(error){
            console.log(error);
        }
    }

    render() {
        if (this.state.isLoading) {
            <view>
                <ActivityIndicator/>
            </view>
        }
        return (
            <View style={styles.wrapper} behavior="padding">
            <SearchBar 
                round
                searchIcon={() =>{
                        false;
                    }                    
                }
                placeholder="type a persons name"
                value={this.state.serach}
                onChangeText={(serach) => this.setState({ serach })}

            />
                <Button
                    title="Search"
                    onPress={() =>{
                        this.getuser()
                        console.log("pressed")
                    }}
                />
                <FlatList
                   data={this.state.UserData}
                   renderItem={({ item, index }) =>
                       <TouchableOpacity style={{ 
                          padding: 10, 
                          flex: 1, 
                          borderTopColor: "black",
                          borderBottomColor: "black", 
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          flexDirection:"column",
                          backgroundColor: "#1b2836" }} 

                       onPress={() => {
                            this.props.navigation.navigate('AccountScreen'),
                            this.saveId(item.user_id);
                            }
                        }>
                        <Text style={{ color: "white", fontSize: 15, left: 50, position: "relative" }} >{ "user : " }{item.given_name} </Text>
                        <Text style={{ color: "white", fontSize: 15,  left: 50, position: "relative" }}>{ "family name: "}{ item.family_name}
                        </Text>
                        <Image 
                                style={{
                                    top: 15,
                                    position:"absolute",
                                    left: 10,
                                    width: 40,
                                    height: 40 ,
                                }}
                                source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+item.user_id+'/photo'}}
                                name="login"
                            />
                       </TouchableOpacity>}
                   keyExtractor={({ id }, index) => id}
                />
            </View>
        );
    }
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
        marginTop: -1,
        flex: 1,
        top: 0,
        fontSize: 20,
        left: 98,
        marginBottom: 1,
        width: "50%", 
        top:1
        
    },

    loginButton: {
        width: 10,
        
    },
    user_content: {
        color: 'white',
        position: 'absolute',
        top: 20,
        paddingLeft: 25,
        
    },

    text: {
        color: '#F0FFF0',
        fontSize:20,
        color: "white",
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

    image: {
        alignContent: "center",
        margin: 50,
        width: 50,
        height: 50,
    },

});


export default SerchPage;