import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
class accountpage extends Component {
    render() {
        return (
            <View>
                <Button
                    title="home screen"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}
export default accountpage;