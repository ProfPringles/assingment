import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity  } from 'react-native';


class netowrking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            shoppingListData: []
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
                    renderItem={({ item }) =>
                    <TouchableOpacity  onPress={() => this.remove(index)}>
                        <Text>{item.item_name}</Text>}
                    </TouchableOpacity>
                    keyExtractor={({ id }, index) => id}
                />
            </View>
        );
    }
}

export default netowrking;