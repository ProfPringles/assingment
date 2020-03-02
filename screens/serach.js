import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';


class SerchPage extends Component {
    render() {
        return (
            
            <View>
                <Button
                    title="home screen"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
             <Text>
                get a user
            </Text>

            </View>
        );
    }
}
export default SerchPage;