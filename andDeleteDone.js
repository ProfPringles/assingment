import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Container, Form, Label } from 'native-base';

class netowrking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            shoppingListData: [],
            id: '',
            item_name: '',
            description: '',
            unit_price: '',
            quantity: ''
        }
    }

    getData() {
        return fetch('http://10.0.2.2:3333/list')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    shoppingListData: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });   
    }
    componentDidMount() {
        this.getData();
    }
    remove = (id) => {



      return fetch('http://10.0.2.2:3333/list/' + id, {
      method: 'delete'
      })
      .then((response) => {
      this.getData();
      })
      .then((response) => {
      Alert.alert("Item deleted")
      })
      .catch((error) =>{
      console.log(error);
      });

       this.setState(
          prevState => {
            let shoppingListData = prevState.shoppingListData.slice();

            shoppingListData.splice(i, 1);

            return { list_items };
          }
        );
    }




    add = () => {
        return fetch("http://10.0.2.2:3333/list",
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: parseInt(this.state.id),
                    item_name: this.state.item_name,
                    description: this.state.description,
                    unit_price: parseInt(this.state.unit_price),
                    quantity: parseInt(this.state.quantity)
                })
            })
            .then((response) => {
                Alert.alert(
                    this.state.item_name
                );
                
            })
            .catch((error) => {
                Alert.alert(this.state.item_name);
            });
    }
    render() {
        if (this.state.isLoading) {
            <view>
                <ActivityIndicator/>
            </view>
        }

        return (
            <View>
                    <FlatList
                    data={this.state.shoppingListData}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>
                            <Text>{item.item_name}</Text>
                        </TouchableOpacity>}
                    keyExtractor={({ id }, index) => id}
                />
                <Form>
                    <Label>
                        number of item
                    </Label>
                    <TextInput
                        value={this.state.id}
                        onChangeText={(id) => this.setState({ id })}
                    />
                    <Label>
                        name of item
                    </Label>
                    <TextInput
                        value={this.state.item_name}
                        onChangeText={(item_name) => this.setState({ item_name })}

                       />                    
                    <Label>
                        description of item
                    </Label>
                    <TextInput
                        value={this.state.description}
                        onChangeText={(description) => this.setState({ description })}

                    />
                    <Label>
                        unit_price
                    </Label>
                    <TextInput
                        value={this.state.unit_price}
                        onChangeText={(unit_price) => this.setState({ unit_price })}
                    />
                    <Label>
                        quantity 
                    </Label>
                    <TextInput
                        value={this.state.quantity}
                        onChangeText={(quantity) => this.setState({ quantity })}
                    />
                </Form>
                <TouchableOpacity onPress={() => this.add()}>
                    <Text>
                        ADD
                    </Text>
                </TouchableOpacity>


            </View>
        );
    }
}

export default netowrking;