import React, {Component} from 'react';
import Home from './src/screens/Home';


import History from './src/screens/History';
import Cart from './src/screens/Cart';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import Signup from './src/screens/Signup';
import Loading from './src/screens/LoadingScreen';
import SinggleProduct from './src/components/products/SinggleProduct'
import BuyProduct from './src/components/products/BuyProduct'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Provider } from 'react-redux';
import store from './src/publics/redux/store'
import {Icon} from 'react-native-elements'

const MainNavigator = createBottomTabNavigator(
  {
    Home : {
      screen : Home,
      navigationOptions : {
        title : 'List Products',
        tabBarIcon: ({focused}) => (
            focused ?
            <Icon name='home' type='font-awesome' color='#007ba4' size={35}/> :
            <Icon name='home' type='font-awesome' color='#aaa' size={35}/>
        ),
        tabBarOptions: {
            activeTintColor: '#007ba4',
            keyboardHidesTabBar: true,
        },

      }
    },
    Cart : {
      screen : Cart,
      navigationOptions : {
        title : 'Cart',
        tabBarIcon: ({focused}) => (
            focused ?
            <Icon name='shopping-cart' type='font-awesome' color='#007ba4' size={30}/> :
            <Icon name='shopping-cart' type='font-awesome' color='#aaa' size={30}/>
        ),
        tabBarOptions: {
            activeTintColor: '#007ba4',
            keyboardHidesTabBar: true,
        }
      }
    },
    History : {
      screen : History,
      navigationOptions : {
        title : 'History',
        tabBarIcon: ({focused}) => (
            focused ?
            <Icon name='cart-arrow-down' type='font-awesome' color='#007ba4' size={30}/> :
            <Icon name='cart-arrow-down' type='font-awesome' color='#aaa' size={30}/>
        ),
        tabBarOptions: {
            activeTintColor: '#007ba4',
            keyboardHidesTabBar: true,
        }
      }
    },
    Profile : {
      screen : Profile,
      navigationOptions : {
        title : 'Profile',
        tabBarIcon: ({focused}) => (
            focused ?
            <Icon name='user' type='font-awesome' color='#007ba4' size={30}/> :
            <Icon name='user' type='font-awesome' color='#aaa' size={30}/>
        ),
        tabBarOptions: {
            activeTintColor: '#007ba4',
            keyboardHidesTabBar: true,
        }
      }
    }
  }
)

const Routes = createStackNavigator(
  {
    Main : {
      screen : MainNavigator,
    },

    SinggleProduct : {
      screen : SinggleProduct,
      navigationOptions : {
        title: 'Detail Product'
      }
      
    },
    BuyProduct : {
      screen : BuyProduct,
      navigationOptions : {
        title: 'Buy Product'
      }
      
    },
  }
)

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions:{
        header: null
      }
    },
    Signup : {
      screen: Signup,
      navigationOptions:{
        header: null
      }
    }
  },
)

const Navigation = createAppContainer(createSwitchNavigator(
  { Loading: {
      screen:Loading,
      navigationOptions:{
        header: null
      }
    },
    Routes: Routes,
    Auth: AuthStack
  },
  {
    initialRouteName : 'Loading'
  }
))

export default class App extends Component{

    render() {
        return (
          <React.Fragment>
            <Navigation />
          </React.Fragment>
        )
    }
}
