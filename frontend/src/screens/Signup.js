import React, { Component } from 'react';
import Toast from 'react-native-root-toast';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert , ActivityIndicator} from 'react-native';
import Axios from 'axios'
import {URL} from '../publics/config';
class Signup extends Component {
  state = {
    name : '',
    email : '',
    username : '',
    password : ''
  }

  handleSubmit = async (name, username, email, password) => {
    if(!name){
      Toast.show('Please enter your name', {
        duration: Toast.durations.LONG,
        position: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,})
    }else if(!username){
      Toast.show('Please enter your username', {
        duration: Toast.durations.LONG,
        position: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,})
    }else if(!email){
      Toast.show('Please enter your email', {
        duration: Toast.durations.LONG,
        position: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,})
    }else if(!password){
      Toast.show('Please enter your password', {
        duration: Toast.durations.LONG,
        position: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,})
    }else {
      const data = {
        name : this.state.name,
        username : this.state.username,
        email : this.state.email,
        password : this.state.password
      }
      await Axios.post(`https://e-commerce-inventory.herokuapp.com/register`, data)
      .then( async res => {
        Alert.alert('Success', 'Success to signup',
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
        ],
        {cancelable: false},)
      })
      .catch(function (error) {
          Toast.show('Failed Register', {
            duration: Toast.durations.LONG,
            position: 0,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,})
      })
    }
  }
  render() {
    return(
      <View style={styles.containerSignup}>
        <View style={styles.container} behavior="padding" enabled>
          <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>CREATE ACCOUNT</Text>
          <View style={{height: 2, backgroundColor: '#ffffff', width: 130, marginVertical: 30}}></View>
              <View style={styles.Box}>
                <View style={{marginLeft: 10,marginVertical: 13}}>

                </View>
                <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Name"
                  placeholderTextColor = "#ffffff"
                  selectionColor="#fff"
                  onChangeText={text => this.setState({name : text})}
                  onSubmitEditing={()=> this.username.focus()}
                />
              </View>
              <View style={styles.Box}>
                <View style={{marginLeft: 10,marginVertical: 13}}>

                </View>
                <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Username"
                  placeholderTextColor = "#ffffff"
                  selectionColor="#fff"
                  onChangeText={text => this.setState({username : text})}
                  onSubmitEditing={()=> this.email.focus()}
                  ref={(input) => this.username = input}
                />
              </View>
              <View style={styles.Box}>
                <View style={{marginLeft: 10,marginVertical: 13}}>

                </View>
              <TextInput style={styles.inputBox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Email"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                onChangeText={text => this.setState({email : text})}
                onSubmitEditing={()=> this.password.focus()}
                ref={(input) => this.email = input}
              />
              </View>
              <View style={styles.Box}>
                <View style={{marginLeft: 10,marginVertical: 13}}>

                  </View>
                <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor = "#ffffff"
                  onChangeText={text => this.setState({password : text})}
                  ref={(input) => this.password = input}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state.name, this.state.username, this.state.email, this.state.password)} >
               <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default Signup


const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  containerSignup : {
    backgroundColor:'rgba(70, 181, 190, 255)',
    alignItems:'center',
    justifyContent :'center',
    flex:1,
    paddingTop: '10%'
  },
  Box : {
    width:300,
    backgroundColor:'rgba(70, 181, 190, 255)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor:'#ffffff',
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10
  },
  inputBox: {
    width:250,
    backgroundColor:'rgba(70, 181, 190, 255)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    paddingVertical: 13,
  },

  button: {
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'rgba(70, 181, 190, 255)',
    textAlign:'center'
  },
  signupTextCont : {
    backgroundColor:'rgba(70, 181, 190, 255)',
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    flexDirection:'row',
  },
  signupText: {
    color:'#ffffff',
    fontSize:16
  },
  signupButton: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  }

});
