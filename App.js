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
import cameraPageChit from './screens/cameraPageChit.js'
import DraftsScreen from './screens/drafts.js';
import loggedInAcountScreen from './screens/loggedInAcountScreen.js'; 
import editAccountScreen from './screens/editAccountPage.js';
import FollowingScreen from './screens/following.js'
import FollowersScreen from './screens/followers.js'
import cameraPage from './screens/cameraPage.js'
import signUpPage from './screens/signUpPage.js'

import { Icon } from 'native-base';
import accountpage from './screens/accountpage.js';

const AppStackNav = createBottomTabNavigator( {

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel:".",
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
            source={require('./585e4ad1cb11b227491c3391.png')}
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
            tabBarLabel: ".",
            tabBarIcon: () => (
                <Image
                    source={require('./home.png')}
                    style={
                        styles.icon
                    }

                    name="home"
                />
            )
        }
    },
    LoggedInAccountScreen: {
        screen: loggedInAcountScreen,
        tabBarLabel: "account screen",
        navigationOptions: {
            tabBarLabel: ".",
            tabBarIcon: () => (
                <Image
                    source={require('./loginIcon.png')}
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
        tabBarLabel: "serach",
        navigationOptions: {

            tabBarLabel: false,
            tabBarLabel: () => 
            <Image
                source={require('./585e4ad1cb11b227491c3391.png')}
                style={{
                    //backgroundColor: 'white',
                    width: 24,
                    top: -20,
                    left: 27,
                    height: 24,
                }
                   
                }
                name="name"
            />
            }
        
    }, 
    MakeChitScreen: {
        screen: MakeChitScreen,
        tabBarLabel: "make chit",
        navigationOptions: {
            tabBarLabel: false,
            tabBarLabel: () => 
            <Image
                source={require('./Iconsss-01.png')}
                style={{
                    backgroundColor: 'transparent',
                    width: 24,
                    top: -20,
                    left: 40,
                    height: 24,
                }
                   
                }
                name="name"
            />
            }
        
    
    },
    drafts: {
        screen: DraftsScreen, 
        tabBarLabel: "drafts",
        navigationOptions: {
            tabBarLabel: "chit",
            tabBarLabel: () => 
            <Image
                source={require('./Iconsss-02.png')}
                style={{
                    backgroundColor: 'transparent',
                    width: 24,
                    top: -20,
                    left: 30,
                    height: 24,
                }
                   
                }
                name="name"
            />
            }

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
        AccountScreen, accountpage,
        editAccountScreen, FollowingScreen,
        FollowersScreen,cameraPage,cameraPageChit, 
        signUpPage
    },
    {
        initialRouteName: 'App',
    }
);
const AppContainer = createAppContainer(App);
export default AppContainer;