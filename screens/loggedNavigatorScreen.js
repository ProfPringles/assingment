import React from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/homescreen.js';
import AccountPage from './screens/accountpage.js';
import Serach from './screens/serach.js';
import MakeChit from './screens/MakeChit.js';
import drafts from './screens/drafts.js';

//import LoginPage from './screens/loginPage.js';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'native-base';



const AppStackNav = createBottomTabNavigator({

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Home",
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
    AccountPage: {
        screen: AccountPage,
        tabBarLabel: "your account"

    },

    serach: {
        screen: Serach,
        tabBarLabel: "serach for a user",
    },

    makechit: {
        scren: MakeChit,
        tabBarLabel: "make a chit",

    },
    drafts: {
        screen: drafts,
        tabBarLabel: "drafts"

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


const AppContainer = createAppContainer(AppStackNav);
//const AppSack = ({ signedinHome: signedinHome })
export default AppContainer;