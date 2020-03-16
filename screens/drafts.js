import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity, TextInput, Image, AsyncStorage, Button, Alert } from 'react-native';
import { Label } from 'native-base';
import { color } from 'react-native-reanimated';


class DraftsPage extends Component {
    
    constructor(props){
        super(props)
        
        this.state={
            savedChit:'', 
            edited:'',
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

    edit(edited){
      AsyncStorage.setItem('ChitContent', edited)
    }
    componentDidMount() {
        this.getChits()
    }
    render() {
        return (

            <View style={styles.container}>
                <Label style={styles.label}>latest chit:</Label>

                <View style={styles.button}>
                    <Text style={styles.text} >{this.state.savedChit}</Text>
                    <TouchableOpacity style={styles.buttonDelete} onPress={()=>
                        AsyncStorage.removeItem('ChitContent')} ><Text style={styles.textDelete} >delete</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete} onPress={() => this.props.navigation.navigate('editpage')}  ><Text style={styles.edit} >edit</Text></TouchableOpacity>    
                </View>

            </View>
        );
    }
}
export default DraftsPage;
const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#1b2836',
    },

    button:{
        borderBottomWidth: 1,
        padding: 10,
    },
    buttonDelete: {
        left: 330,
        top: -30
    },
    text:{
        fontSize: 28,
        color: 'white'
    },
    edit:{
        fontSize: 20,
        color: 'white'
    },
    textDelete: {
        fontSize: 20,
        color: '#d33f49'
    },
    label: {
        color: 'white',
        padding: 10,
        fontSize: 20
    }

})