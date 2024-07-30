import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import React from 'react'

const Loadingspinner = ({text}) => {
  return (
    <View style={styles.container}> 
       <ActivityIndicator size="large" color="#0000ff" />
       <Text>{text}</Text>
    </View>
  )
}

export default Loadingspinner

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
})