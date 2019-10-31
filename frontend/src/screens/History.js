import React, {Component} from 'react';
import {Modal, ScrollView, StyleSheet,KeyboardAvoidingView, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, AsyncStorage, FlatList } from 'react-native';
import Axios from 'axios';
import { NavigationEvents } from 'react-navigation'
import CardHistory from '../components/products/CardHistory'
import {URL} from '../publics/config';
export default class Products extends Component{
    state = {
      products : {}
    }
   async componentDidMount(){
    const token = await AsyncStorage.getItem('token')
    await Axios.get(`${URL}/history`, {headers : {Authorization : token}})
    .then(res => {
      this.setState({products : res.data})
      })
  }

  handleDelete= async (id) => {
      Alert.alert('Warning', 'do want to delete this product in history',
        [
          {text: 'NO'},
          {text: 'OK', onPress: () => this.deleteHistory(id)},
        ],
        {cancelable: false},)
      
  }

  deleteHistory = async (id) => {
    const token = await AsyncStorage.getItem('token')
    await Axios.delete(`${URL}/history/`+id, {headers : {Authorization : token}})
    this.componentDidMount()
  }

  

  render() {
      return (
          <View>
          <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
          <FlatList
            horizontal={false}
            data = {this.state.products}
            keyExtractor={({_id}, index) => _id}
            renderItem = {({item}) =>
            <TouchableOpacity key={item._id} style={styles.card} onPress={() => { this.props.navigation.navigate('SinggleProduct', {id : item.product._id})} }>
              <CardHistory product={item} delete={() => this.handleDelete(item._id)}/>
            </TouchableOpacity>
            }
          />
          </View>
      )
  }
}

const styles = StyleSheet.create({

  card: {
    marginTop: '2%',
    backgroundColor: '#fff',
    borderColor:'#fff',
    marginBottom: '2%',
    marginLeft:'2%',
    marginRight: '2%',
    width: '95%',
    flexDirection : 'row',
    elevation: 4,
  },
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  border:{
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#51A2DA',
    paddingHorizontal:16,
    color:'#51A2DA',
    marginVertical: 10,
  },

  inputBox: {
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#51A2DA',
    paddingHorizontal:16,
    fontSize:16,
    color:'#51A2DA',
    marginVertical: 10,
    paddingVertical: 13
  },

  button: {
    width:300,
    backgroundColor:'#51A2DA',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonAdd: {
    width:50,
    borderRadius: 100,
    paddingVertical: 13,
    marginLeft: '3%',
    marginRight: '1%',
    position: 'absolute',
    bottom: '10%',
    right: 0,

  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  buttonTextAdd: {
    fontSize:25,
    fontWeight:'bold',
    color:'#ffffff',
    textAlign:'center'
  },

  logoText : {
    marginVertical: 15,
    fontSize:18,
    color:'#51A2DA'
  },
  cardContainer : {
    marginTop: 10,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  searchContainer : {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

});
