import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';


class MakeChit extends Component {
    render() {
        return (
            <View>
                <Button

                    title="home screen"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Text>
                    Chit page
                </Text>
            </View>
        );
    }
}
export default MakeChit;