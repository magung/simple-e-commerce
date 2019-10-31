import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, FlatList,Button, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Axios from 'axios';
import {URL} from '../publics/config';

export default class Profile extends Component {
  state = {
    user: {}
  }

  removeItem = async () => {
     await AsyncStorage.removeItem('token')
     this.props.navigation.navigate('Login')
  }

  componentDidMount = async() => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'authorization': token
    }
    await Axios.get(`${URL}/users`, {headers : headers})
    .then(res => {
      this.setState({
      user : res.data.data
      })
    }).catch(err => {
      console.log(err)
    })
    console.log(this.state.user)

  }

  render() {
    const { name } = this.state.user
    return (
      <View>
      <View style={styles.container}>
        <Image  style={{width:250, height: 250}}
        source={{uri : 'https://pngimage.net/wp-content/uploads/2018/05/button-profile-png-8.png'}}/>
        <Text style={styles.logoText}>Hello {name}</Text>

      <TouchableOpacity onPress={this.removeItem} style={styles.button} >
      <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity></View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },

  logoText : {
    marginVertical: 15,
    fontSize:20,
    color:'#51A2DA'
  },
  button: {
    width:160,
    backgroundColor:'#ec5064',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }

});
