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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
     remove = (i) => {

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
                body: JSON.stringify({
                    id: this.state.id,
                    item_name: this.state.item_name,
                    description: this.state.description,
                    unit_price: this.state.unit_price,
                    quantity: this.state.quantity
                })
            })
            .then((response) => {
                Alert.alert("Item Added!");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        Alert.alert('you added' + event.target.value);
        event.preventDefault();
    }

    //https://codepen.io/gaearon/pen/VmmPgp?editors=0010


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
                        <TouchableOpacity onPress={() => this.remove(index)}>
                            <Text>{item.item_name}</Text>
                        </TouchableOpacity>}
                    keyExtractor={({ id }, index) => id}
                />
                <Form>
                    <Label>
                        name of item
                    </Label>

                
                </Form>
                <Text>
                    ==========================
                </Text>

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