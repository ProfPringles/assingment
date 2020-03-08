import React from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/homescreen.js';
import Serach from './screens/serach.js';
import LoginPage from './screens/loginPage.js';
import signedinhome from './screens/loggedHomeScreen.js';
import { Icon } from 'native-base';

const AppStackNav = createBottomTabNavigator( {

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
    serach: {
        screen: Serach,
        tabBarLabel: "account page",
        
        
    },
    login: {
        screen: LoginPage,
        tabBarLabel: "login page"
        
    }

});

const styles = StyleSheet.create({
    icon: {
        backgroundColor: '#D3D3D3',
        width: 24,
        height: 24,
    },
    navbar: {
        backgroundColor: '#D3D3D3',
    }
});


//const AppContainer = createAppContainer(AppStackNav);
const AppStack = createStackNavigator ({ Home: HomeScreen,serach: Serach, login: LoginPage })
const AuthStack = createStackNavigator ({ signedinHome: signedinhome})

const App = createSwitchNavigator(
    {
        //AppContainer: AppContainer,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AppContainer',
    }
);
const AppContainer = createAppContainer(App);
export default AppContainer;