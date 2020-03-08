import React from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/homescreen.js';
import Serach from './screens/serach.js';
import LoginPage from './screens/loginPage.js';

import signedinhome from './screens/loggedHomeScreen.js';
import AccountScreen from './screens/accountpage.js';
import MakeChitScreen from './screens/MakeChit.js';
import DraftsScreen from './screens/drafts.js';


import { Icon } from 'native-base';
import accountpage from './screens/accountpage.js';

const AppStackNav = createBottomTabNavigator( {

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: () => (
                <Image
                    source={require('./home.png')}
                    style={
                        styles.icon
                    }
                />
            )
        }
    },
    serach: {
        screen: Serach,
        navigationOptions: {

        tabBarLabel: "serach",
        tabBarLabel: () => 
        <Image
            source={require('./SeekPng.com_magnifying-glass-png-no_659285.png')}
            style={{
                //backgroundColor: 'white',
                width: 24,
                top: -16,
                left: 50,
                height: 24,
            }
               
            }
            name="name"
        />
        }
    },
    login: {
        screen: LoginPage,
        navigationOptions: {

            tabBarLabel: "serach",
            tabBarLabel: () => 
            <Image
                source={require('./loginIcon.png')}
                style={{
                    //backgroundColor: 'white',
                    width: 24,
                    height: 24,
                    top: -16,
                    left: 50,
                }
                   
                }
                name="name"
            />
            }
    }, 


});


const AppStackNavSignedin = createBottomTabNavigator( {

    signedinhome: {

        screen: signedinhome,
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
    AccountScreen: {
        screen: AccountScreen,
        tabBarLabel: "account screen",
        
        
    },
    serach: {
        screen: Serach,
        tabBarLabel: "serach"
        
    }, 
    MakeChitScreen: {
        screen: MakeChitScreen,
        tabBarLabel: "make chit"
    }, 
    drafts: {
        screen: DraftsScreen, 
        tabBarLabel: "drafts"
    }

});



const styles = StyleSheet.create({
    icon: {
        backgroundColor: 'white',
        width: 24,
        height: 24,
    },
    navbar: {
        //backgroundColor: '#D3D3D3',
    }
});


//const appStackNav = AppStackNav;
//const AppStack = createStackNavigator ({ Home: HomeScreen,serach: Serach, login: LoginPage })
const AuthStack = createStackNavigator ({ signedinHome: signedinhome  })

const App = createSwitchNavigator(
    {
        App: AppStackNav,
        Auth: AppStackNavSignedin,
        AccountScreen, accountpage
    },
    {
        initialRouteName: 'App',
    }
);
const AppContainer = createAppContainer(App);
export default AppContainer;