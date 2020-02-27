import React from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import HomeScreen from './screens/homescreen.js';
import AboutScreen from './screens/aboutscreen.js';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'native-base';

const AppStackNav = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Home Page",
            tabBarIcon: () => (
                <Image
                    source={require('./home.jpg')}
                    style={
                        styles.icon
                    }

                    name="home"
                />
            )
        }
    },
    About: {
        screen: AboutScreen
    }
},
    {
        initialRouteName: 'About',
        tabBarOptions: {
            showIcon: true
        }
    });

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


const AppContainer = createAppContainer(AppStackNav);

export default AppContainer;