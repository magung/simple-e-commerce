import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, ImageBackground, Alert, AsyncStorage } from 'react-native';
import {URL} from '../../publics/config';
import {Icon} from 'react-native-elements'
import Axios from 'axios'
export default class CardCart extends Component {

    render() {
      const { name, stock, price, image} = this.props.product.product
      return(
          <React.Fragment>
            <ImageBackground source={require('../../../assets/images/defaultImage.png')} style={styles.cardImage}>
              <Image style={styles.cardImage} source={{uri : image}}/>
            </ImageBackground>
              <Text style={styles.cardText}>{name.length > 20 ? name.substr(0,30)+'...' : name}</Text>
              <Text style={styles.cardText}> Rp. {price}</Text>
              <View style={{width:'100%', borderRadius:10, marginBottom: 0, backgroundColor: '#ffff', flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
                  <View style={{width:'70%',elevation: 4, padding: 10, backgroundColor: '#007ba4', justifyContent:'center', alignItems: 'center'}} >
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>BUY</Text>
                  </View>
                  <TouchableOpacity style={{width:'30%',elevation: 4, padding: 10, backgroundColor: '#ffff', justifyContent:'center', alignItems: 'center'}} onPress={this.props.delete}>
                    <Icon name='trash' type='font-awesome' color='#007ba4' size={25}/>
                  </TouchableOpacity>
              </View>
          </React.Fragment>

      )
    }

}

const styles = StyleSheet.create({

  cardImage : {
    width: 150,
    height:150,
    resizeMode: 'cover'
  },
  cardText: {
    padding: '1%',
    fontSize: 14,
    fontWeight: 'bold'
  },
  Text: {
    paddingTop: '1%',
    paddingBottom: '3%',
    fontSize: 10,
    color: '#d2d3d5'
  }
})
