import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    FlatList, 
    Alert,
    TouchableOpacity
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { object } from 'prop-types';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            UserData: [],
            user_id:'',
            given_name:'',
            family_name:'',
            email:'',
            recent_chits: [],
            chit_id: 0,
            timestamp: 0,
            chit_content:'',
            location: {},
            longitude: 0,
            latitude: 0,
            following: [],
            followers:[],
            userPicUri:''
        }
    }
    //get userID is ran when the page loads that is why this method many other methods
    getUserID = async () => {
        const response = await AsyncStorage.getItem('LoginUserID');

        this.setState({
            user_id: response,
            userPicUri: `http://10.0.2.2:3333/api/v0.0.5/user/${response}"/photo`
        });   

        this.getUserDetails();
        this.getfollowing();
        this.getfollowers();
        this.getUserImage();
        console.log("here from account page", response);

    }


    logout(){
        return  fetch("http://10.0.2.2:3333/api/v0.0.5/logout",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) =>{
                Alert.alert("logged out");
                console.log("here", response);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
    
    getUserDetails() {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    UserData: responseJson,
                });
                //console.log((this.state.UserData.recent_chits))
            })
            .catch((error) => {
                console.log(error);
            });
    }

                                          
    getUserImage(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/photo")
        .then((response) =>{
            this.setState({
                userProfilePic: response.url
            })
            console.log("image data", response.url);
        })
        .catch((error) => {
            console.log(error);
        });
    } 

    getfollowing(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/following")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                following: responseJson,
            });
            console.log("following", this.state.listOfFollowing);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getfollowers(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/followers")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                followers: responseJson,
            });
            console.log(this.state.listOfFollowers)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    //get the length of the list of followers to be displayed on the page
    followersLength(){
        console.log(this.state.followers.length)
        return this.state.followers.length
    }
    //do the same with the following length
    followingLength(){
        console.log("following", this.state.following.length);
        return this.state.following.length;
    }

    clearAsync = async() =>{
        AsyncStorage.removeItem('LoginToken');
    }
    //get the user accounts image to be displayed in the page
    getchitImage(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/"+ this.state.user_id+"/photo")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                UserData: responseJson,
            });
            //console.log((this.state.UserData.recent_chits))
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getUserID();
    }

    render() {
        return (

            <View style={styles.container}>
                <Button accessible={true} style={styles.buttonContainer} onPress={() =>{
                        console.log("pressed"),
                        this.logout()
                        this.clearAsync().then(() =>{     
                            this.props.navigation.navigate('Home');    
                        })
                    } 
                }>
                <Text>log out</Text>
                </Button>
                <View style={styles.header}>
                    
                <Image source={{
                    uri: this.state.userPicUri +'?' + Date.now(),
                 }}
                 style={styles.avatar} 
                />                    
                    <Text accessible={true} style={styles.name}>{this.state.UserData.family_name}</Text>
                    <Text accessible={true} style={styles.accountname}>{this.state.UserData.given_name}</Text>

                    <TouchableOpacity accessible={true} onPress={() => this.props.navigation.navigate('FollowersScreen')}  style={{padding:5, left: 5, top: 100 }}>
                        <Text  style={{color:"white"}}>Followers {this.followersLength()}</Text>
                    </TouchableOpacity>

                   <TouchableOpacity accessible={true} onPress={() => this.props.navigation.navigate('FollowingScreen')} style={{padding:5, left: 5, top: 100}} >  
                        <Text style={{color:"white"}} >following {this.followingLength()}</Text>
                    </TouchableOpacity>
                    
                    
                    <TouchableOpacity accessible={true} onPress={()=>{
                        this.props.navigation.navigate('editAccountScreen')
                    }} style={styles.Edit} >
                        <Text style={{textAlign: "center", top:10, color: "white", fontSize:20}}>edit</Text>    
                    </TouchableOpacity>

                </View>
                
                <View style={{top: 0}}>
                  <Image style={styles.backgroundImage} source={require('./cool-banners-25-cute-girly-cool-twitter-header-banners-pictures.jpg')}/>
                </View>
                
                <View>
                  <Text accessible={true} style={{fontFamily:'Freight Sans', fontSize: 25, textAlign:"center"}} >chits</Text>
                </View>
                
                <ScrollView style={{backgroundColor: "#1b2836", height: 500}}>
                    <FlatList
                        data={this.state.UserData.recent_chits}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity accessible={true} style={{
                              padding: 10, flex: 1, 
                              borderBottomColor: "black", 
                              borderBottomWidth: 1,
                              flexDirection:"column",
                              backgroundColor: "#1b2836"
                            }}

                            
                            onPress={() => this.props.navigation.navigate('')}>
                                <Text style={{color: "white",  fontFamily:'Freight Sans'}}>{item.chit_content}</Text>
                            
                            </TouchableOpacity>}
                        keyExtractor={({ id }, index) => id}
                    />
                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1b2836",
        borderBottomColor: "black", 
        borderBottomWidth: 2,
        height: 240,

    },
    ScrollviewCont: {
      flex: 1,
      height: 1000,
      width: 500,
      marginBottom: 1,
      padding: 16,
      backgroundColor: 'transparent',
      marginTop: 5,
      //borderBottomColor: "black",
      //borderBottomWidth: 1,
      flexDirection: "column",
      backgroundColor: "#1b2836"
    },
    
    Edit:{
        left: 325,
        top: 150,
        width: 50,
        position: "absolute",
        backgroundColor:"#1b2836", 
        height: 50,
        borderWidth: 2,
        borderColor: "white"
         
    },
    
    avatar: {
        width: 130,
        height: 130,
        //borderRadius: 63,
        borderWidth: 4,
        borderColor: "black",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 10
    },

    chit_photo:{
        width: 100,
        height: 100,
        borderWidth: 4,
        borderColor: "black",
        marginBottom: 0,
        backgroundColor:"red",
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 0
    },


    backgroundImage:{
      backgroundColor: "transparent",
        width: 500,
        height: 240,
        //borderRadius: 63,
        borderWidth: 0,
        //borderColor: "black",
        marginBottom: 10,
        //alignSelf: 'center',
        position: 'absolute',
        //marginTop: 10
    },

    name: {
        fontSize: 22,
        color: "white",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        top: 140,
        left: 110,
        fontSize: 28,
        color: "white",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    accountname: {
        fontSize: 16,
        color: "white",
        top: 140,
        textAlign: 'center'
    },
    buttonContainer: {
        //marginTop:10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
});