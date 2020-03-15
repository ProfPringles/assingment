import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity, TextInput, Image, AsyncStorage, Button, YellowBox } from 'react-native';


class DraftsPage extends Component {
    
    constructor(props){
        super(props)
        
        this.state={
            savedChit:'', 
            allchits: []  
        } 
    }


    getChits = async()=>{
        const allchits = []
        AsyncStorage.getItem('ChitContent', (error, result) => {
            this.setState({ 
                savedChit: result 
            }, function () {
            });
        });
    }
    componentDidMount() {
        this.getChits()
    }
    render() {
        return (
            <View>
            <Text>
               {this.state.savedChit}
            </Text>


            </View>
        );
    }
}
export default DraftsPage;