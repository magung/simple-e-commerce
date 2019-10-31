import React, {Component} from 'react';
import {Modal, ScrollView, StyleSheet,KeyboardAvoidingView, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, AsyncStorage, FlatList } from 'react-native';
import Axios from 'axios';
import { NavigationEvents } from 'react-navigation'
import CardCart from '../components/products/CardCart'
import {URL} from '../publics/config';
export default class Products extends Component{
    state = {
      products : {}
    }
   async componentDidMount(){
    const token = await AsyncStorage.getItem('token')
    await Axios.get(`${URL}/cart`, {headers : {Authorization : token}})
    .then(res => {
      this.setState({products : res.data.data})
      })
  }
    deleteCart = async (id) => {
      Alert.alert('Warning', 'do want to delete this product in cart',
        [
          {text: 'NO'},
          {text: 'OK', onPress: () => this.handleDelete(id)},
        ],
        {cancelable: false},)
      
    }

    handleDelete = async (id) => {
      const token = await AsyncStorage.getItem('token')
      await Axios.delete(`${URL}/cart/`+id,{headers : {Authorization : token}})
      this.componentDidMount()  
    } 

  render() {
      return (
          <View>
          <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
          <FlatList
            columnWrapperStyle={{justifyContent:'center', alignItems:'center'}}
            horizontal={false}
            data = {this.state.products}
            numColumns={2}
            keyExtractor={({_id}, index) => _id}
            renderItem = {({item}) =>
            <TouchableOpacity key={item._id} style={styles.card} onPress={() => { this.props.navigation.navigate('BuyProduct', {id : item.product._id})} }>
              <CardCart product={item} delete={() => this.deleteCart(item._id)}/>
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
    width: '45%',
    justifyContent:'center',
    alignItems: 'center',
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
