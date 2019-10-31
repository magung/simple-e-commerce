import React, {useEffect} from 'react'
import { ActivityIndicator, Text, View, StatusBar , TouchableOpacity, Image , AsyncStorage} from 'react-native';
const LoadingScreen = props => {
  useEffect(()=>{
    AsyncStorage.getItem('token')
    .then(value => {
      if(value.length > 0){
        props.navigation.navigate('Routes')
      }
    })
    .catch(() => props.navigation.navigate('Auth'))
  }, [])

  return(
    <View style={{justifyContent:'center', alignItems: 'center', margin: '30%'}}>
    <ActivityIndicator size="large" color="#51A2DA" />
    </View>
  )
}
export default LoadingScreen
