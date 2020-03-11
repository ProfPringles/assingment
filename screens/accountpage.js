import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    FlatList, 
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
            latitude: 0
        }
    }


    getUserID = async () => {
        let response = await AsyncStorage.getItem('UserID');

        this.setState({
            user_id: response
        })

        
        this.getUserDetails()

        console.log("here from account page", response)

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

    /*ArrayofallChits() {

 
        var foo = this.state.UserData
        //var choo = JSON.stringify(this.state.UserData).split(',')


        //var myObject = JSON.parse('[' + JSON.stringify(foo) + ']');

        console.log("dfgdfg ", foo.recent_chits)
        return JSON.stringify(foo)

        //console.log(found)


        //var AllChits = JSON.stringify(result[0])
        //var result = JSON.parse(this.state.UserData) 

        //console.log(result[0])
        //return JSON.stringify(result)
        //console.log(mappedChits);

    }*/


    clearAsync = async() =>{
        AsyncStorage.removeItem('Token');
    }


    componentDidMount() {
        this.getUserID()
        
        //this.getUserDetails()
        //this.ArrayofallChits()
    }


    render() {
        let myData = this.state.UserData || {}
        return (

            <View style={styles.container}>
                <Button style={styles.buttonContainer}  onPress={() =>{
                        console.log("pressed"),
                        this.clearAsync().then(() =>{
                            this.props.navigation.navigate('Home')    
                        })
                    } 
                }>
                    <Text>home</Text>
                </Button>

                <View style={styles.header}>
                    <Image style={styles.avatar} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.UserData.user_id + '/photo' }} />
                    
                    <Text style={styles.name}>{this.state.UserData.family_name}</Text>
                    <Text style={styles.accountname}>{this.state.UserData.given_name}</Text>
                </View>
                
                <View style={{top: 0}}>
                  <Image style={styles.backgroundImage} source={require('./cool-banners-25-cute-girly-cool-twitter-header-banners-pictures.jpg')}/>
                </View>
                
                <View>
                  <Text style={{fontFamily:'Freight Sans', fontSize: 25, textAlign:"center"}} >chits</Text>
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