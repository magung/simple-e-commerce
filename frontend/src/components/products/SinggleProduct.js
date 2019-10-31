import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import { NavigationEvents } from 'react-navigation'
import {Icon} from 'react-native-elements'
import {Modal, BackHandler, ScrollView, StyleSheet, KeyboardAvoidingView, ImageBackground, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, Picker, AsyncStorage } from 'react-native';
import {URL} from '../../publics/config'
class SinggleProduct extends Component {
    state = {
      detailProduct : [],
      category : ''
    }

    async componentDidMount() {
      const itemId = this.props.navigation.getParam('id');
      await Axios.get(`${URL}/products/${itemId}`)
      .then(async res => {
        this.setState({detailProduct : res.data})
        await Axios.get(`${URL}/categories?id=${res.data.categoriesId}`)
        .then(res => {
          this.setState({category : res.data.data.name})
        })
      })
    }

    addToCart = async () => {
      const data = {
        productId : this.state.detailProduct._id
      }
      const token = await AsyncStorage.getItem('token')
      await Axios.post(`${URL}/cart`, data, {headers : {Authorization : token}})
      .then(res => {
         Alert.alert('Success', 'Success add product to cart ',
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('Cart')},
        ],
        {cancelable: false},)  
      }).catch(err => {
        Alert.alert('Fail', 'product has been added to cart')
      })
      
    }
    render() {
      const {name, description, stock , image, price, _id} = this.state.detailProduct
      return(
        <Fragment>
          <ScrollView>
                <View style={{marginBottom: 55}}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <View style={styles.card}>
                  <ImageBackground source={require('../../../assets/images/defaultImage.png')} style={styles.cardImage2}>
                  <Image
                    source={{uri : image}}
                    style={styles.cardImage}
                  />
                  </ImageBackground>
                    <Text style={{fontSize:20, marginHorizontal: 10, fontWeight: 'bold'}}>{name}</Text>
                  </View>
                </View>
                <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff'}}>
                  <View style={{elevation: 4, padding: 10, backgroundColor: '#ffff'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Price : Rp. {price}</Text>
                  </View>
                </View>
                <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff'}}>
                  <View style={{elevation: 4, padding: 10, backgroundColor: '#ffff'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Category</Text>
                    <Text style={{fontSize: 16}}>{this.state.category}</Text>
                  </View>
                </View>
                <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff'}}>
                  <View style={{elevation: 4, padding: 10, backgroundColor: '#ffff'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Stock : {stock}</Text>
                  </View>
                </View>
                <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff'}}>
                  <View style={{elevation: 4, padding: 10, backgroundColor: '#ffff'}}>
                    <Text  style={{fontWeight: 'bold', fontSize: 20}}>Description</Text>
                    <Text>Descripsi : {description}</Text>
                  </View>
                </View>
                
                </View>

          </ScrollView>
                <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff', flexDirection: 'row', justifyContent:'center', alignItems: 'center', position: 'absolute', bottom: 0}}>
                  <TouchableOpacity style={{width:'70%',elevation: 4, padding: 10, backgroundColor: '#007ba4', justifyContent:'center', alignItems: 'center'}} onPress={() => { this.props.navigation.navigate('BuyProduct', {id : _id})}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>BUY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width:'20%',elevation: 4, padding: 10, backgroundColor: '#ffff', justifyContent:'center', alignItems: 'center'}} onPress={() => this.addToCart()}>
                    <Icon name='cart-plus' type='font-awesome' color='#007ba4' size={25}/>
                  </TouchableOpacity>
                </View>
          <View style={{bottom: 0, right: 0, position: 'absolute'}}>

          </View>
        </Fragment>
      )
    }
}
export default SinggleProduct

const styles = StyleSheet.create({

  card: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginBottom: 10,
    marginLeft:'2%',
    marginRight: '2%',
    width: '80%',
    padding: '2%',
    justifyContent:'center',
    alignItems: 'center',
  },
  logoText : {
    marginVertical: 15,
    fontSize:18,
    color:'#51A2DA'
  },
  cardImage : {
    width: 200,
    height: 200,
    resizeMode: 'cover'
  },

  cardImage2 : {
    width: 200,
    height: 200,
    resizeMode: 'cover'
  },
  cardText: {
    padding: '1%',
    fontSize: 10
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
  buttonAdd: {
    width:50,
    height: 50,
    borderRadius: 25,
    marginLeft: '3%',
    marginRight: '3%',
    backgroundColor: '#ffff',
    elevation: 5,
    justifyContent: 'center',
    margin: 10
  },
  button: {
    width:300,
    backgroundColor:'#51A2DA',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
})
