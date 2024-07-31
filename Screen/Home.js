import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
    const Videocompress=()=>{
        navigation.navigate('Video')
    }

    const Imagecompress=()=>{
        navigation.navigate('Image')
    }

  return (
    <View style={styles.container}>
   <Pressable onPress={Videocompress} style={[styles.button,{backgroundColor:"green"}]} android_ripple={{ color: 'darkgreen' }}>
    <Text style={styles.buttontext}>Compress Video</Text>
   </Pressable>
   <Pressable onPress={Imagecompress} style={[styles.button,{backgroundColor:"blue"}]} android_ripple={{ color: 'darkblue' }}>
    <Text style={styles.buttontext}>Compress Image</Text>
   </Pressable>
   </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
      flex:1,  
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-around",
      backgroundColor:"violet"
    },
    button:{
        borderRadius:5,
        paddingVertical:10,
        elevation:5,
        width:150,
        height:70,
        alignItems:"center",
        justifyContent:"center",
        elevation:5
      },
      buttontext:{
        fontSize:15,
        fontWeight:'bold',
        color:"white",
      }
})