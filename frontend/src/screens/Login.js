import React, { Component } from 'react';
import Toast from 'react-native-root-toast';
import Axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import {URL} from '../publics/config';
// import {login} from '../publics/redux/actions/Users';
// import { connect } from 'react-redux';
class Login extends Component {
  state = {
    email : '',
    password : '',
    loggedIn : false
  }
  handleSubmit = async (email, password) => {
    if(!email){
      Toast.show('Please enter your email or username', {
            duration: Toast.durations.LONG,
            position: 0,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,})
    } else if(!password){
      Toast.show('Please enter your password', {
            duration: Toast.durations.LONG,
            position: 0,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,})
    } else {
      const data = {
        username : email,
        password : password
      }
      await Axios.post(`${URL}/login`, data)
      // await this.props.dispatch(login(data))
          .then(async res => {
                console.log('work')
                this.setState({loggedIn : true})
                await AsyncStorage.setItem('token', res.data.token);
                Alert.alert('Success', 'Success to login',
                [
                  {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                ],
                {cancelable: false},)

          })
          .catch(function (error) {
              console.log('fail')
              Alert.alert('Failed Login', 'Email or Password is wrong!',
              [
                {text: 'OK'},
              ],
              {cancelable: false},)
          })
    }
  }
  render() {
    return(
      <View style={styles.containerLogin}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>LOGIN</Text>
          <View style={{height: 2, backgroundColor: '#ffffff', width: 130, marginVertical: 30}}></View>
          <View style={styles.Box}>
          <View style={{marginLeft: 10,marginVertical: 13}}>

          </View>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email or username"
            placeholderTextColor = "#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({email})}
            onSubmitEditing={()=> this.password.focus()}
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
          onChangeText={(password) => this.setState({password})}
          ref={(input) => this.password = input}
          />
          </View>
          <TouchableOpacity type='submit'  onPress={() => this.handleSubmit(this.state.email, this.state.password)} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Dont have an account yet?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

}
// const mapStateToProps = state => {
//     return {
//         user: state.user
//     };
// };
//
// export default connect(mapStateToProps)(Login)
export default Login


const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  containerLogin : {
    backgroundColor:'rgba(70, 181, 190, 255)',
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
    height:700
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
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
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
