import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';


class AccountPage extends Component {
    render() {
        return (
            <Text>
               Drafts
            </Text>
            <View>
                <Button
                    title="home screen"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}
export default AccountPage;