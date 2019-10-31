import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import { NavigationEvents } from 'react-navigation'
import {Icon} from 'react-native-elements'
import {Modal, BackHandler, ScrollView, StyleSheet, KeyboardAvoidingView, ImageBackground, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, Picker, AsyncStorage } from 'react-native';
import {URL} from '../../publics/config'
class SinggleProduct extends Component {
    state = {
      detailProduct : [],
      qty : 1,
      price : 0
    }

    async componentDidMount() {
      const itemId = this.props.navigation.getParam('id');
      await Axios.get(`${URL}/products/${itemId}`)
      .then(async res => {
        this.setState({detailProduct : res.data})
      })
      this.setPrice()
    }

    setPrice = () => {
      let p = this.state.qty * this.state.detailProduct.price
      this.setState({price : p})
    }

    addQty = () => {
      if(this.state.qty !== this.state.detailProduct.stock){
        let q = this.state.qty + 1
        this.setState({qty : q})
        let p = q * this.state.detailProduct.price
        this.setState({price : p})
      }
      
    }

    redQty = () => {
      if(this.state.qty !== 1){
        let q = this.state.qty - 1
        this.setState({qty : q})
        let p = q * this.state.detailProduct.price
        this.setState({price : p})
      }
      
    }

    buyProduct = async () => {
      const token = await AsyncStorage.getItem('token')
      const data = {
        productId : this.state.detailProduct._id,
        qty : this.state.qty,
        price : this.state.price
      }
      await Axios.post(`${URL}/history`, data, {headers : {Authorization : token}})
      .then(res => {
        Alert.alert('Success', 'Success buy product ',
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('History')},
        ],
        {cancelable: false},)  
      })
      
    }

    render() {
      const {name , image} = this.state.detailProduct
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
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Price : Rp. {this.state.price}</Text>
                  </View>
                </View>
                <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff',}}>
                  <View style={{elevation: 4, padding: 10, backgroundColor: '#ffff', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Qty : </Text>
                    <TouchableOpacity style={{marginLeft : 10, marginRight: 5}} onPress={() => this.redQty()}><Icon name='minus-square' type='font-awesome' color='#007ba4' size={25}/></TouchableOpacity>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.state.qty}</Text>
                    <TouchableOpacity style={{marginLeft : 5, marginRight: 5}} onPress={() => this.addQty()}><Icon name='plus-square' type='font-awesome' color='#007ba4' size={25} /></TouchableOpacity>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>pcs</Text>
                  </View>
                </View>
                </View>

          </ScrollView>
          <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff', flexDirection: 'row', justifyContent:'center', alignItems: 'center', position: 'absolute', bottom: 0}}>
                  <TouchableOpacity style={{width:'70%',elevation: 4, padding: 10, backgroundColor: '#007ba4', justifyContent:'center', alignItems: 'center'}} onPress={() => this.buyProduct()}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>BUY</Text>
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
