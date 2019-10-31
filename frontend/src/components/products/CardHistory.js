import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, ImageBackground } from 'react-native';
import {URL} from '../../publics/config';
import {Icon} from 'react-native-elements'
export default class CardProducts extends Component {

    render() {
      const {qty, price} = this.props.product
      const {image, name} = this.props.product.product
      return(
          <React.Fragment>
            <View style={{width : 100, marginLeft: '2%', marginRight : '2%'}}>
            <ImageBackground source={require('../../../assets/images/defaultImage.png')} style={styles.cardImage}>
              <Image style={styles.cardImage} source={{uri : image}}/>
            </ImageBackground>
            </View>
            <View style={{width : '70%', marginLeft : 3}}>
              <Text style={styles.cardText}>Name product : {name.length > 20 ? name.substr(0,30)+'...' : name}</Text>
              <Text style={styles.cardText}> Rp. {price}</Text>
              <Text style={styles.cardText}> Qty : {qty}</Text>
               <TouchableOpacity style={{width:50, padding: 10, backgroundColor: '#ffff', justifyContent:'center', alignItems: 'center', bottom: '10%', position: 'absolute', right: '10%'}} onPress={this.props.delete}>
                <Icon name='trash' type='font-awesome' color='#007ba4' size={25}/>
              </TouchableOpacity>
            </View>
          </React.Fragment>

      )
    }

}

const styles = StyleSheet.create({

  cardImage : {
    width: 100,
    height:100,
    resizeMode: 'cover'
  },
  cardText: {
    padding: '1%',
    fontSize: 12,
    fontWeight: 'bold'
  },
  Text: {
    paddingTop: '1%',
    paddingBottom: '3%',
    fontSize: 10,
    color: '#d2d3d5'
  }
})
