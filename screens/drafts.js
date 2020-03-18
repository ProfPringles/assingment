import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity, TextInput, Image, AsyncStorage, Button, Alert } from 'react-native';
import { Label, Container, Header, Body, Title } from 'native-base';
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
      AsyncStorage.setItem('ChitContent', edited);
    }
    componentDidMount() {
        this.getChits();
    }
    render() {
        return (

            <Container style={styles.container}> 
                <View style={styles.button}>
                <Label accessible={true} style={styles.label} >latest chit:</Label>
                    <Text accessible={true} style={styles.text} >{this.state.savedChit}</Text>
                    <TouchableOpacity accessible={true} style={styles.buttonDelete} onPress={()=>
                        AsyncStorage.removeItem('ChitContent')} ><Text style={styles.textDelete} >delete</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete} onPress={() => this.props.navigation.navigate('editpage')}  ><Text style={styles.edit} >edit</Text></TouchableOpacity>    
                </View>

            </Container>
        );
    }
}
export default DraftsPage;
const styles = StyleSheet.create({
    header:{
        backgroundColor: '#1b2836',
        borderBottomColor: 'black',
        borderBottomWidth: 0,
        height: 30
    },

    container:{
        flex: 1,
        backgroundColor: '#1b2836',
    },

    button:{
        borderBottomWidth: 1,
        top: 5,
        height: 120,
        padding: 10,
    },
    buttonDelete: {
        left: 330,
        top: -30
    },
    text:{
        top: 10,
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
        padding: 3,
        color: 'white',
        fontSize: 20
    }

})