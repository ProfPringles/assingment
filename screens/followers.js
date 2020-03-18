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

export default class followers extends Component {

    constructor(props){
        super(props)
        this.state={
            followers:[],   
            email:'', 
            family_name:'',
            given_name:'',
            user_id: 0,
            isLoading: true,
            token:''
            }
        }
        getUserID = async () => {
            const response = await AsyncStorage.getItem('UserID');
            const loggedinToken = await AsyncStorage.getItem('LoginToken');
            this.setState({
                user_id: response,
                token: loggedinToken
            })
            this.getfollowers();
            console.log("here from account page", response);
    
        }
        getfollowers(){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/followers")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    followers: responseJson,
                });
                console.log(this.state.followers);
            })
            .catch((error) => {
                console.log(error);
            });
        }

        componentDidMount() {
            this.getUserID();
        }
        render(){
            return(
                <View style={{backgroundColor:"#1b2836", padding: 20}}>
                    <TouchableOpacity accessible={true}
                        style={{ width: 60, height: 30, top: -10, left: -15, borderWidth: 1,borderColor: "white", backgroundColor: '#ce1d1d' }}
                        onPress={() =>{
                                if(this.state.token === null){
                                    this.props.navigation.navigate('accountpage');
                                }else{
                                    this.props.navigation.navigate('LoggedInAccountScreen');
                                }
                                
                            }
                        }>
                        <Text style={{color: "white",  textAlign: "center", top: 3}}>
                             back
                        </Text>
                    </TouchableOpacity>
                    
                    <ScrollView style={{backgroundColor: "#1b2836", height: 800}}>
                        <FlatList
                            data={this.state.followers}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>

                                    <View style={styles.item}> 
                                        <Text accessible={true} style={{color:"white", fontSize: 20}} >{item.family_name}</Text>           
                                    </View>    
                                </TouchableOpacity>}
                            keyExtractor={({ id }, index) => id}
                            />
                    </ScrollView>

                </View>
                
            );

        }
}

const styles = StyleSheet.create({


    NameTittle: {
        color: "white", 
        flex: 1,
        left: -5,
        fontWeight: "bold",
        top: -30, 
        
    },

    container: {
        //flex: 2,
        height: 300,
        width: null,
        marginBottom: 1,
        padding: 16,
        backgroundColor: 'transparent',
        marginTop: 5,
        flex: 1,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        flexDirection: "column",
        backgroundColor: "#1b2836"
    },

    item: {
        //backgroundColor: '#D3D3D3',

        flex: 1, 
        borderColor: "white", 
        borderBottomWidth:1 , 
        padding: 10,
    
    },

    title: {
        fontSize: 5,
    },
    text: {
        paddingLeft: 20,
        fontSize: 42,
    }, 
    content: {
        color: 'white',
        position: 'absolute',
        top: 20,
        paddingLeft: 25,
        
    }
})