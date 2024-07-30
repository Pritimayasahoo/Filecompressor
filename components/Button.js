import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'

const Button = ({onPress,text,color}) => {
  return (
    <View style={styles.container}>
    <Pressable onPress={onPress} style={[styles.button,{backgroundColor:color}]}>
       <Text style={styles.buttontext}>{text}</Text>
    </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
   container:{
      alignItems:"center",
      padding:7
   },
    button:{
        borderRadius:3,
        paddingVertical:10,
        elevation:5,
        width:250,
        alignItems:"center"
      },
      buttontext:{
        fontSize:15,
        fontWeight:'bold',
        color:"white",
      }
})