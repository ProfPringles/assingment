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
import { Button, Container } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { object } from 'prop-types';

export default class following extends Component {

    constructor(props){
        super(props)

        this.state={
            following:[],
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
            });
            this.getfollowing()
            console.log("here from account page", response);
    
        }

        getfollowing(){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id+"/following")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    following: responseJson,
                });
                console.log(this.state.following)
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
                <Container style={{backgroundColor:"#1b2836", padding: 20}}>
                <TouchableOpacity
                    accessible={true}
                    style={{ width: 60, height: 30, top: -10, left: -15, borderWidth: 1,borderColor: "white", backgroundColor: '#ce1d1d' }}
                    onPress={() =>{
                        if(this.state.token == null){
                            this.props.navigation.navigate('accountpage')
                        }else{
                            this.props.navigation.navigate('LoggedInAccountScreen')   
                        } 
                    }
                    }>
                    <Text style={{color: "white",  textAlign: "center", top: 3}}>
                         back
                    </Text>
                </TouchableOpacity>
                
                <ScrollView style={{backgroundColor: "#1b2836", height: 800}}>
                    <FlatList
                        data={this.state.following}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity accessible={true} onPress={() => this.props.navigation.navigate('')}>

                                <View style={styles.item}> 
                                    <Text style={{color:"white", fontSize: 20}} >{item.family_name}</Text>           
                                </View>    
                            </TouchableOpacity>}
                        keyExtractor={({ id }, index) => id}
                        />
                </ScrollView>
            </Container>
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