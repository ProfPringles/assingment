import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            UserData: [],
            user_id: 0,
            given_name: '',
            family_name: '',
            email: '',
            recent_chits: [], 
            chit_id: 0,
            timestamp: 0,
            chit_content: '',
            location: ''

        }
    }

    getUserDetails = async() => {
        
        this.state.user_id = await AsyncStorage.getItem('UserID')
        console.log(JSON.stringify(this.state.user_id))

        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.user_id)
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

    ArrayofallChits(){
        
        var result = []
        for(var i in this.state.UserData){
            result.push([i, this.state.UserData])
            
            result 

                        
        }
        var foo = JSON.stringify(this.state.UserData).split('[')
        var bar = JSON.stringify(foo).split(']')
        //var choo = JSON.stringify(this.state.UserData).split(',')


        var myObject = JSON.parse('[' + JSON.stringify(bar) + ']');
        
        console.log("here "+myObject[0])
        return bar

        //console.log(found)
         
        
        //var AllChits = JSON.stringify(result[0])
         //var result = JSON.parse(this.state.UserData) 

         //console.log(result[0])
         //return JSON.stringify(result)
        //console.log(mappedChits);

    }





    componentDidMount() {
        this.getUserDetails()
        //this.ArrayofallChits()
    }

    
  render() {
      let myData = this.state.UserData || {}
    return (
      
      <View style={styles.container}>
        <Button style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Home')}  >
            <Text>home</Text>  
        </Button>

          <View style={styles.header}>
                <Image style={styles.avatar} source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.UserData.user_id+'/photo'}}/>   
                
                <Text style={styles.name}>{this.state.UserData.family_name}</Text>
                <Text style={styles.accountname}>{this.state.UserData.given_name}</Text>   
          </View>
        <View>
            <Text>{ this.ArrayofallChits()}</Text>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#1b2836",
    height:240,
  },
  avatar: {
    width: 130,
    height: 130,
    //borderRadius: 63,
    borderWidth: 4,
    borderColor: "black",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:10
  },
  name:{
    fontSize:22,
    color:"white",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    top: 140,
    left: 110,
    fontSize:28,
    color: "white",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  accountname:{
    fontSize:16,
    color: "white",
    top: 140,
    textAlign: 'center'
  },
  buttonContainer: {
    //marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
});
 
