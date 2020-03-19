import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator,TouchableOpacity, TextInput, Image, AsyncStorage, Button, Alert, FlatList } from 'react-native';
import { Label, Container, Header, Body, Title, Item } from 'native-base';
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';


class DraftsPage extends Component {
    
    constructor(props){
        super(props)
        this.state={
            savedChit:'', 
            edited:'',
            allchits: []  

        } 
    }

    getAllChits = async()=>{
        var ReturnVal =[]; 
        try{
            const keyvalues = await AsyncStorage.getAllKeys()
            ReturnVal = keyvalues;
        }catch(error){
            console.log(error)
        }
        
        this.setState({
            allchits: ReturnVal.splice(4, 5)
        })
        console.log("here", this.state.allchits)
        return ReturnVal.splice(0, 4)
    }

    delte(item){
        console.log(item);
        AsyncStorage.removeItem(item);
        
    }
   
    editCHit(item){
        this.props.navigation.navigate('editpage')
        
        AsyncStorage.setItem("toBedited", item)  
    }
    componentDidMount() {
        AsyncStorage.removeItem("toBedited");
        AsyncStorage.removeItem("chitID");
        this.getAllChits() 

      
    }
    render() {
        return (

            <ScrollView style={styles.container}> 
                <Label accessible={true} style={styles.label} >latest chit:</Label>
                <FlatList style={{}}  
                    data={this.state.allchits}
                    renderItem={({ item, index }) =>
                    <View style={styles.item}>
                        <Text accessible={true} style={styles.text} >{item}</Text>

                        <TouchableOpacity accessible={true} style={styles.buttonDelete} onPress={()=>{this.delte(item)}}
                        ><Text style={styles.textDelete} >delete</Text></TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDelete} onPress={() => this.editCHit(item)}><Text style={styles.edit}>edit</Text></TouchableOpacity>    
                    </View>

                    }                        
                    keyExtractor={({ item }, index) => item}
                />
                </ScrollView>
            
        );
    }
}
export default DraftsPage;
const styles = StyleSheet.create({

    container:{
        flex: 1,
        padding: 10,
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
        left: 3,
        top: 10,
        fontSize: 15,
        width: 280,
        color: 'white'
    },
    edit:{
        fontSize: 18,
        left: 5,
        color: 'white'
    },
    textDelete: {
        padding: 2,
        fontSize: 18,
        color: '#d33f49'
    },
    label: {
        padding: 3,
        color: 'white',
        fontSize: 20
    }

})