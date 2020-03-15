import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    FlatList, 
    TouchableOpacity,
    Alert
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
            user_id: '',
            given_name: '',
            family_name: '',
            email: '',
            recent_chits: [],
            chit_id: 0,
            timestamp: 0,
            chit_content: '',
            location: {},
            longitude: 0,
            latitude: 0,
            token: '',
            listOfFollowing:[],
            listOfFollowers:[], 
            loggedInUSerID: '', 
            followButtonText: 'follow', 
            userPicUri: ''
        }
    }
    getUserID = async () => {
        const response = await AsyncStorage.getItem('UserID');
        const Token = await AsyncStorage.getItem('LoginToken')
        const loggedUSERID = await AsyncStorage.getItem('LoginUserID')

        this.setState({
            user_id: response,
            token: Token, 
            loggedInUSerID: loggedUSERID,
            userPicUri: `http://10.0.2.2:3333/api/v0.0.5/user/${response}"/photo`
        })

        this.getUserDetails();
        this.getfollowing();
        this.getfollowers().then(()=>{
            if(this.isfollowing(this.state.listOfFollowers)){
                this.setState({
                    followButtonText: 'unfollow'
                })
            }
        })

        
        console.log("here from account page", response);

    }

    getUserDetails() {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    UserData: responseJson,
                });
                /*
                this can be use to debug and thus has been left here for future use
                console.log((this.state.UserData.recent_chits))
                */
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
                listOfFollowing: responseJson,
            });
            console.log("following", this.state.listOfFollowing)
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
                listOfFollowers: responseJson,
            });
            console.log(this.state.listOfFollowers)
        })
        .catch((error) => {
                     
            console.log(error);
        });
    }

    followersLength(){
        console.log(this.state.listOfFollowers.length);
        
        
        return this.state.listOfFollowers.length;
    }

    followingLength(){
        console.log("following", this.state.listOfFollowing.length) ;

        return this.state.listOfFollowing.length; 

    }

    isfollowing(followers){
        const loggedInUSerID =this.state.loggedInUSerID
        const following = false;

        followers.map((item, index) =>{
            if(loggedInUSerID === item.user_id) {
                console.log("already following");
                following = true;
            }  
        });
        return following
    }
    
    follow(){
        if(this.state.token !=null){
            console.log("has run")
           return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/follow",
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token,
                },
                body: JSON.stringify({
                    user_id: this.state.user_id
                })
            })
            .then((response) => {
                if(response.ok){
                    Alert.alert("followed")
                }else{
                    Alert.alert("something went wrong you may already be following this person?")
                }
            })
            .catch((error) => {
                console.log(error);
            });
            
        }else{
            Alert.alert("you must be logged in to follow someone")
        }
    }

    unfollow(){
        console.log("un follow start")
           return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/follow",
            {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token,
                },
                body: JSON.stringify({
                    user_id: this.state.user_id
                })
            })
            .then((response) => {
                if(response.ok){
                    Alert.alert("unfollowed");
                }else{
                    Alert.alert("oh dear you cannnot unfollow this person D: maybe you are not logged in?");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    clearAsync = async() =>{
        AsyncStorage.removeItem('Token');
    }
    componentDidMount() {
        this.getUserID()
    }
    render() {
        return (

            <View style={styles.container}>
                <Button accessible={true} style={styles.buttonContainer}  onPress={() =>{
                        console.log("pressed"),
                        this.clearAsync().then(() =>{
                            if(this.state.token === null){
                                this.props.navigation.navigate('Home');
                            }else{
                                this.props.navigation.navigate('signedinhome');
                            }
                                
                        })
                    }
                     
                }>
                    <Text>home</Text>
                </Button>
                <View style={styles.header}>
                <Image source={{
                    uri: this.state.userPicUri +'?' + Date.now(),
                 }}
                 style={styles.avatar} 
                /> 
                    
                    <Text style={styles.name}>{this.state.UserData.family_name}</Text>
                    <Text style={styles.accountname}>{this.state.UserData.given_name}</Text>

                    <TouchableOpacity accessible={true} onPress={() => this.props.navigation.navigate('FollowersScreen')}  style={{padding:5, left: 5, top: 100 }}>
                        <Text style={{color:"white"}}>Followers {this.followersLength()}</Text>
                    </TouchableOpacity>

                   <TouchableOpacity accessible={true} onPress={() => this.props.navigation.navigate('FollowingScreen')} style={{padding:5, left: 5, top: 100}} >  
                    <Text style={{color:"white"}} >following {this.followingLength()}</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{top: 0}}>
                  <Image style={styles.backgroundImage} source={require('./cool-banners-25-cute-girly-cool-twitter-header-banners-pictures.jpg')}/>
                </View>
                
                <TouchableOpacity accessible={true} onPress={()=>{
                    if(this.isfollowing(this.state.listOfFollowers)){
                        this.unfollow()
                    }else{
                        this.follow()
                    }}} style={styles.follow}>
                        <Text style={{textAlign: "center", top:10, color: "white", fontSize:18}}>{this.state.followButtonText}</Text>    
                </TouchableOpacity>

                <View>
                  <Text style={{fontFamily:'Freight Sans', fontSize: 25, textAlign:"center", top:-25}} >chits</Text>
                </View>
                
                <ScrollView style={{backgroundColor: "#1b2836", height: 500}}>
                    <FlatList
                        data={this.state.UserData.recent_chits}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity style={{
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
  follow:{
    left: 320,
    top: -90,
    width: 80,
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