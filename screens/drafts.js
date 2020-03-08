import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';


class AccountPage extends Component {
    render() {
        return (
            <View>
            <Text>
               Drafts
            </Text>
            
                <Button
                    title="home screen"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}
export default AccountPage;